import type { FormType } from '@/types/forms';
import { type UserFormAction, UseFormActionTypes } from '@/types/hooks/useForm';
import { INPUT_TYPES } from '@/types/inputs';
import { validateInput } from '@/utils/inputValidators';

const reducer = (state: FormType, action: UserFormAction): FormType => {
  switch (action.type) {
    case UseFormActionTypes.ON_INPUT_FOCUS: {
      const { inputName } = action;
      const targetInput = state.inputs[inputName];

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            focused: true,
            touched: true,
            ...(targetInput.inputType === INPUT_TYPES.SELECT ? {
              searchedOptions: [...targetInput.options]
            } : {})
          }
        }
      };
    }
    case UseFormActionTypes.ON_INPUT_UNFOCUS: {
      const { inputName } = action;
      const targetInput = state.inputs[inputName];

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            focused: false
          }
        }
      };
    }
    case UseFormActionTypes.ON_INPUT_CHANGE: {
      const { inputName, inputValue } = action;
      const targetInput = state.inputs[inputName];

      if (inputName === 'password' && Object.keys(state.inputs).includes('passwordConfirm')) {
        const isPasswordValid = validateInput(inputValue, targetInput.validation);

        return {
          ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              value: inputValue,
              valid: isPasswordValid
            },
            passwordConfirm: {
              ...state.inputs.passwordConfirm,
              valid: isPasswordValid && state.inputs.passwordConfirm.value === inputValue
            }
          }
        };
      }

      if (inputName === 'passwordConfirm' && Object.keys(state.inputs).includes('password')) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              value: inputValue,
              valid: validateInput(state.inputs.password.value, state.inputs.password.validation)
                && inputValue === state.inputs.password.value
            }
          }
        };
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            value: inputValue,
            valid: validateInput(inputValue, targetInput.validation) && (
              targetInput.inputType === INPUT_TYPES.SELECT
                ? targetInput.options.map((opt) => opt.value).includes(inputValue)
                : true
            ),
            ...(targetInput.inputType === INPUT_TYPES.SELECT ? {
              searchedOptions: targetInput.options.filter((opt) => opt.value.toLowerCase().startsWith(inputValue.toLowerCase()))
            } : {})
          }
        }
      };
    }
    case UseFormActionTypes.ON_CLEAR_INPUT: {
      const { inputName } = action;
      const targetInput = state.inputs[inputName];

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            valid: !targetInput.validation.required,
            value: ''
          }
        }
      };
    }
    case UseFormActionTypes.ON_PASSWORD_VISIBILITY_TOGGLE: {
      const { inputName } = action;
      const targetInput = state.inputs[inputName];

      if (targetInput.inputType !== INPUT_TYPES.TEXT) {
        return state;
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            attributes: {
              ...targetInput.attributes,
              type: targetInput.attributes.type === 'password' ? 'text' : 'password'
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_SELECT: {
      const { inputName, inputValue } = action;
      const targetInput = state.inputs[inputName];

      if (targetInput.inputType !== INPUT_TYPES.SELECT) {
        return state;
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            focused: false,
            value: inputValue,
            valid: true
          }
        }
      };
    }
    case UseFormActionTypes.ON_CHECK_FORM_VALIDITY: {
      return {
        ...state,
        isValid: action.isValid
      };
    }
    default:
      return state;
  }
};

export default reducer;