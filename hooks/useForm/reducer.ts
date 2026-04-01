import { type UserFormAction, FormStateType, UseFormActionTypes } from '@/types/hooks/useForm';
import { INPUT_TYPES } from '@/types/inputs';
import { validateInput } from '@/utils/inputValidators';

const reducer = (state: FormStateType, action: UserFormAction): FormStateType => {
  switch (action.type) {
    case UseFormActionTypes.ON_SET_FORM_START: {
      return {
        ...state,
        prepopulateInfo: {
          ...state.prepopulateInfo,
          loading: true,
          error: null
        }
      };
    }
    case UseFormActionTypes.ON_SET_FORM_FAILED: {
      return {
        ...state,
        prepopulateInfo: {
          loading: false,
          error: action.error,
          isPrepopulated: true
        }
      };
    }
    case UseFormActionTypes.ON_SET_FORM_SUCCESS: {
      return {
        ...state,
        prepopulateInfo: {
          loading: false,
          error: null,
          isPrepopulated: true
        },
        form: action.form
      };
    }
    case UseFormActionTypes.ON_INPUT_FOCUS: {
      const { inputName } = action;
      const targetInput = state.form.inputs[inputName];

      if (targetInput.inputType === INPUT_TYPES.SELECT || targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
          ...state,
          form: {
            ...state.form,
            inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                focused: true,
                touched: true,
                dropdownOpen: true
              }
            }
          }
        };
      }

      return {
        ...state,
        form: {
          ...state.form,
          inputs: {
            ...state.form.inputs,
            [inputName]: {
              ...targetInput,
              focused: true,
              touched: true
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_INPUT_UNFOCUS: {
      const { inputName } = action;
      const targetInput = state.form.inputs[inputName];

      return {
        ...state,
        form: {
          ...state.form,
          inputs: {
          ...state.form.inputs,
          [inputName]: {
            ...targetInput,
            focused: false
          }
        }
        }
      };
    }
    case UseFormActionTypes.ON_INPUT_CHANGE: {
      const { inputName, inputValue } = action;
      const targetInput = state.form.inputs[inputName];

      if (inputName === 'password' && Object.keys(state.form.inputs).includes('passwordConfirm')) {
        const isPasswordValid = validateInput(inputValue, targetInput.validation);

        return {
          ...state,
          form: {
            ...state.form,
              inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                value: inputValue,
                valid: isPasswordValid
              },
              passwordConfirm: {
                ...state.form.inputs.passwordConfirm,
                valid: isPasswordValid && state.form.inputs.passwordConfirm.value === inputValue
              }
            }
          }
        };
      }

      if (inputName === 'passwordConfirm' && Object.keys(state.form.inputs).includes('password')) {
        return {
          ...state,
          form: {
            ...state.form,
            inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                value: inputValue,
                valid: validateInput(state.form.inputs.password.value, state.form.inputs.password.validation)
                  && inputValue === state.form.inputs.password.value
              }
            }
          }
        };
      }

      if (targetInput.inputType === INPUT_TYPES.SELECT) {
        return {
        ...state,
          form: {
            ...state.form,
            inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                value: inputValue,
                valid: validateInput(inputValue, targetInput.validation, targetInput.options),
                searchedOptions: targetInput.options.filter((opt) =>
                  opt.value.toLowerCase().startsWith(inputValue.toLowerCase())
                )
              }
            }
          }
        };
      }

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
        ...state,
          form: {
            ...state.form,
            inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                value: inputValue,
                valid: validateInput(inputValue, targetInput.validation, targetInput.options),
                searchedOptions: targetInput.options.filter((opt) =>
                  opt.value.toLowerCase().startsWith(inputValue.toLowerCase())
                )
              }
            }
          }
        };
      }

      return {
        ...state,
        form: {
          ...state.form,
          inputs: {
            ...state.form.inputs,
            [inputName]: {
              ...targetInput,
              value: inputValue,
              valid: validateInput(inputValue, targetInput.validation)
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_CLEAR_INPUT: {
      const { inputName } = action;
      const targetInput = state.form.inputs[inputName];

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
          ...state,
          form: {
            ...state.form,
            inputs: {
            ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                valid: !targetInput.validation.required,
                value: '',
                options: targetInput.options.map((opt) => ({ ...opt, checked: false })),
                searchedOptions: targetInput.searchedOptions.map((opt) => ({ ...opt, checked: false }))
              }
            }
          }
        };
      }

      return {
        ...state,
        form: {
          ...state.form,
          inputs: {
            ...state.form.inputs,
            [inputName]: {
              ...targetInput,
              valid: !targetInput.validation.required,
              value: ''
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_PASSWORD_VISIBILITY_TOGGLE: {
      const { inputName } = action;
      const targetInput = state.form.inputs[inputName];

      if (targetInput.inputType !== INPUT_TYPES.TEXT) {
        return state;
      }

      return {
        ...state,
        form: {
          ...state.form,
            inputs: {
            ...state.form.inputs,
            [inputName]: {
              ...targetInput,
              attributes: {
                ...targetInput.attributes,
                type: targetInput.attributes.type === 'password' ? 'text' : 'password'
              }
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_SELECT: {
      const { inputName, inputValue } = action;
      const targetInput = state.form.inputs[inputName];

      if (targetInput.inputType !== INPUT_TYPES.SELECT) {
        return state;
      }

      return {
        ...state,
        form: {
          ...state.form,
          inputs: {
            ...state.form.inputs,
            [inputName]: {
              ...targetInput,
              focused: false,
              value: inputValue,
              valid: true,
              searchTerm: '',
              searchedOptions: [...targetInput.options],
              dropdownOpen: false
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_SELECT_DROPDOWN_CHECK: {
      const { inputName, checkedItemId } = action;
      const targetInput = state.form.inputs[inputName];

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
        form: {
          ...state.form,
          inputs: {
            ...state.form.inputs,
            [inputName]: {
              ...targetInput,
              value: updatedValue,
              valid: true,
              options: checkedUpdated,
              searchedOptions: searchedCheckedUpdated
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_SEARCH_DROPDOWN: {
      const { inputName, searchTerm } = action;
      const targetInput = state.form.inputs[inputName];

      if (targetInput.inputType === INPUT_TYPES.SELECT) {
        return {
          ...state,
          form: {
            ...state.form,
              inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                searchTerm,
                searchedOptions: targetInput.options.filter((opt) => opt.value.toLowerCase().startsWith(searchTerm.toLowerCase()))
              }
            }
          }
        };
      }

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
          ...state,
          form: {
            ...state.form,
            inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                searchTerm,
                searchedOptions: targetInput.options.filter((opt) => opt.value.toLowerCase().startsWith(searchTerm.toLowerCase()))
              }
            }
          }
        };
      }

      return state;
    }
    case UseFormActionTypes.ON_CLEAR_SEARCH_DROPDOWN: {
      const { inputName } = action;
      const targetInput = state.form.inputs[inputName];

      if (targetInput.inputType === INPUT_TYPES.SELECT) {
        return {
          ...state,
          form: {
            ...state.form,
            inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                searchTerm: '',
                searchedOptions: [...targetInput.options]
              }
            }
          }
        };
      }

      if (targetInput.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
        return {
          ...state,
          form: {
            ...state.form,
            inputs: {
              ...state.form.inputs,
              [inputName]: {
                ...targetInput,
                searchTerm: '',
                searchedOptions: [...targetInput.options]
              }
            }
          }
        };
      }

      return state;
    }
    case UseFormActionTypes.ON_CLOSE_DROPDOWN: {
      const { inputName } = action;
      const targetInput = state.form.inputs[inputName];

      if (targetInput.inputType !== INPUT_TYPES.SELECT && targetInput.inputType !== INPUT_TYPES.SELECT_CHECKBOXES) {
        return state;
      }

      return {
        ...state,
        form: {
          ...state.form,
          inputs: {
            ...state.form.inputs,
            [inputName]: {
              ...targetInput,
              dropdownOpen: false,
              focused: false
            }
          }
        }
      };
    }
    case UseFormActionTypes.ON_CHECK_FORM_VALIDITY: {
      return {
        ...state,
        form: {
          ...state.form,
          isValid: action.isValid
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;