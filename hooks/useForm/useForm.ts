import {
  type ChangeEventHandler,
  type FocusEventHandler,
  useReducer,
  useCallback,
  useEffect
} from 'react'
import type { FormType } from '@/types/forms';
import reducer from './reducer';
import { UseFormActionTypes } from '@/types/hooks/useForm';

export const useForm = (providedForm: FormType) => {
  const [state, dispatch] = useReducer(reducer, providedForm);

  useEffect(() => {
    dispatch({
      type: UseFormActionTypes.ON_CHECK_FORM_VALIDITY,
      isValid: Object.keys(state.inputs).every((input) => state.inputs[input].valid)
    });
  }, [state.inputs]);

  const onInputFocus: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    dispatch({
      type: UseFormActionTypes.ON_INPUT_FOCUS,
      inputName: event.target.name
    });
  }, []);

  const onInputUnfocus: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    dispatch({
      type: UseFormActionTypes.ON_INPUT_UNFOCUS,
      inputName: event.target.name
    });
  }, []);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const { name, value } = event.target;
    dispatch({
      type: UseFormActionTypes.ON_INPUT_CHANGE,
      inputName: name,
      inputValue: value
    });
  }, []);

  const onClearInput = useCallback((inputName: string) => {
    dispatch({
      type: UseFormActionTypes.ON_CLEAR_INPUT,
      inputName
    });
  }, []);

  const onPasswordVisibilityToggle = useCallback((inputName: string) => {
    dispatch({
      type: UseFormActionTypes.ON_PASSWORD_VISIBILITY_TOGGLE,
      inputName
    });
  }, []);

  const onSelect = useCallback((inputName: string, inputValue: string): void => {
    dispatch({
      type: UseFormActionTypes.ON_SELECT,
      inputName,
      inputValue
    });
  }, []);

  return {
    form: state,
    onInputFocus,
    onInputUnfocus,
    onInputChange,
    onClearInput,
    onPasswordVisibilityToggle,
    onSelect
  };
};