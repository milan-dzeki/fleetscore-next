import type { FormType } from '@/types/forms';
import { type UserFormAction, UseFormActionTypes } from '@/types/hooks/useForm';
import { validateInput } from '@/utils/inputValidators';

const reducer = (state: FormType, action: UserFormAction): FormType => {
  switch (action.type) {
    case UseFormActionTypes.ON_INPUT_FOCUS: {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputName]: {
            ...state.inputs[action.inputName],
            focused: true,
            touched: true
          }
        }
      };
    }
    case UseFormActionTypes.ON_INPUT_UNFOCUS: {
      const targetInput = state.inputs[action.inputName];

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputName]: {
            ...targetInput,
            focused: false,
            valid: validateInput(targetInput.value, targetInput.validation)
          }
        }
      };
    }
    case UseFormActionTypes.ON_INPUT_CHANGE: {
      const targetInput = state.inputs[action.inputName];

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputName]: {
            ...targetInput,
            value: action.inputValue,
            valid: validateInput(targetInput.value, targetInput.validation)
          }
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;