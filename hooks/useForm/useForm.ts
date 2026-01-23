import {
  type ChangeEventHandler,
  type FocusEventHandler,
  useReducer
} from 'react'
import type { FormType } from '@/types/forms';
import reducer from './reducer';
import { UseFormActionTypes } from '@/types/hooks/useForm';

export const useForm = (providedForm: FormType) => {
  const [state, dispatch] = useReducer(reducer, providedForm);

  const onInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: UseFormActionTypes.ON_INPUT_FOCUS,
      inputName: event.target.name
    });
  };

  const onInputUnfocus: FocusEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: UseFormActionTypes.ON_INPUT_UNFOCUS,
      inputName: event.target.name
    });
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: UseFormActionTypes.ON_INPUT_CHANGE,
      inputName: name,
      inputValue: value
    });
  };

  const onClearInput = (inputName: string) => {
    dispatch({
      type: UseFormActionTypes.ON_CLEAR_INPUT,
      inputName
    });
  };

  const onPasswordVisibilityToggle = (inputName: string) => {
    dispatch({
      type: UseFormActionTypes.ON_PASSWORD_VISIBILITY_TOGGLE,
      inputName
    });
  };

  return {
    form: state,
    onInputFocus,
    onInputUnfocus,
    onInputChange,
    onClearInput,
    onPasswordVisibilityToggle
  };
};