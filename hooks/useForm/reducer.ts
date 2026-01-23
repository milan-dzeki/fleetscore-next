import type { FormType } from '@/types/forms';
import { type UserFormAction, UseFormActionTypes } from '@/types/hooks/useForm';
import { validateInput } from '@/utils/inputValidators';

const reducer = (state: FormType, action: UserFormAction): FormType => {
  switch (action.type) {
    case UseFormActionTypes.ON_INPUT_FOCUS: {
      const { inputName } = action;

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...state.inputs[inputName],
            focused: true,
            touched: true
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
            focused: false,
            valid: validateInput(targetInput.value, targetInput.validation)
          }
        }
      };
    }
    case UseFormActionTypes.ON_INPUT_CHANGE: {
      const { inputName, inputValue } = action;
      const targetInput = state.inputs[inputName];

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            value: inputValue,
            valid: validateInput(targetInput.value, targetInput.validation)
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
    default:
      return state;
  }
};

export default reducer;