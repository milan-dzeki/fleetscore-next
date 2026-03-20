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

      if (targetInput.inputType === INPUT_TYPES.SELECT) {
        return {
        ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              value: inputValue,
              valid: validateInput(inputValue, targetInput.validation, targetInput.options),
              searchedOptions: targetInput.options.filter((opt) =>
                opt.value.toLowerCase().startsWith(inputValue.toLowerCase())
              )
            }
          }
        };
      }

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
        ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              value: inputValue,
              valid: validateInput(inputValue, targetInput.validation, targetInput.options),
              searchedOptions: targetInput.options.filter((opt) =>
                opt.value.toLowerCase().startsWith(inputValue.toLowerCase())
              )
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
            valid: validateInput(inputValue, targetInput.validation)
          }
        }
      };
    }
    case UseFormActionTypes.ON_CLEAR_INPUT: {
      const { inputName } = action;
      const targetInput = state.inputs[inputName];

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              valid: !targetInput.validation.required,
              value: '',
              options: targetInput.options.map((opt) => ({ ...opt, checked: false })),
              searchedOptions: targetInput.searchedOptions.map((opt) => ({ ...opt, checked: false }))
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
            valid: true,
            searchTerm: '',
            searchedOptions: [...targetInput.options]
          }
        }
      };
    }
    case UseFormActionTypes.ON_SELECT_DROPDOWN_CHECK: {
      const { inputName, checkedItemId } = action;
      const targetInput = state.inputs[inputName];

      if (targetInput.inputType !== INPUT_TYPES.SELECT_CHECKBOXES) {
        return state;
      }

      const checkedItem = targetInput.options.find((opt) => opt.id.toString() === checkedItemId.toString());

      if (!checkedItem) {
        return state;
      }

      const checkedUpdated = targetInput.options.map((opt) => {
        if (opt.id.toString() !== checkedItemId.toString()) {
          return opt;
        }

        return {
          ...opt,
          checked: !opt.checked
        };
      });

      const searchedCheckedUpdated = targetInput.searchedOptions.map((opt) => {
        if (opt.id.toString() !== checkedItemId.toString()) {
          return opt;
        }

        return {
          ...opt,
          checked: !opt.checked
        };
      });

      const checkedItems = checkedUpdated.filter((opt) => opt.checked);
      let updatedValue = '';

      if (checkedItems.length > 1) {
        updatedValue = `${checkedItems[0].value} + ${checkedItems.length - 1}`
      } else if (checkedItems.length === 0) {
        updatedValue = '';
      } else if (checkedItems.length === 1) {
        updatedValue = checkedItems[0].value;
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputName]: {
            ...targetInput,
            value: updatedValue,
            options: checkedUpdated,
            searchedOptions: searchedCheckedUpdated
          }
        }
      };
    }
    case UseFormActionTypes.ON_SEARCH_DROPDOWN: {
      const { inputName, searchTerm } = action;
      const targetInput = state.inputs[inputName];

      if (targetInput.inputType === INPUT_TYPES.SELECT) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              searchTerm,
              searchedOptions: targetInput.options.filter((opt) => opt.value.toLowerCase().startsWith(searchTerm.toLowerCase()))
            }
          }
        };
      }

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              searchTerm,
              searchedOptions: targetInput.options.filter((opt) => opt.value.toLowerCase().startsWith(searchTerm.toLowerCase()))
            }
          }
        };
      }

      return state;
    }
    case UseFormActionTypes.ON_CLEAR_SEARCH_DROPDOWN: {
      const { inputName } = action;
      const targetInput = state.inputs[inputName];

      if (targetInput.inputType === INPUT_TYPES.SELECT) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              searchTerm: '',
              searchedOptions: [...targetInput.options]
            }
          }
        };
      }

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [inputName]: {
              ...targetInput,
              searchTerm: '',
              searchedOptions: [...targetInput.options]
            }
          }
        };
      }

      return state;
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