import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type ChangeEvent,
  useReducer,
  useCallback,
  useEffect,
} from 'react'
import reducer from './reducer';
import { UseFormActionTypes, type UseFormParamsType } from '@/types/hooks/useForm';
import { SelectInputType } from '@/types/inputs';

export const useForm = ({
  providedForm,
  prepopulateForm,
  customSelectHandlers = null
}: UseFormParamsType) => {
  const [state, dispatch] = useReducer(reducer, {
    form: providedForm,
    prepopulateInfo: {
      loading: false,
      isPrepopulated: false,
      error: null
    }
  });

  useEffect(() => {
    dispatch({
      type: UseFormActionTypes.ON_CHECK_FORM_VALIDITY,
      isValid: Object.keys(state.form.inputs).every((input) => state.form.inputs[input].valid)
    });
  }, [state.form.inputs]);

  const onPrepopulateForm = useCallback(async () => {
    if (prepopulateForm && !state.prepopulateInfo.isPrepopulated) {
      dispatch({ type: UseFormActionTypes.ON_SET_FORM_START });
      
      const formData = await prepopulateForm();
      if ('error' in formData) {
        return dispatch({
          type: UseFormActionTypes.ON_SET_FORM_FAILED,
          error: formData.error
        });
      }

      dispatch({
        type: UseFormActionTypes.ON_SET_FORM_SUCCESS,
        form: formData
      });
    }
  }, [prepopulateForm, state.prepopulateInfo.isPrepopulated]);

  useEffect(() => {
    onPrepopulateForm();
  }, [onPrepopulateForm]);

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

  const onSelect = useCallback(async (inputName: string, inputValue: string): Promise<void> => {
    dispatch({
      type: UseFormActionTypes.ON_SELECT,
      inputName,
      inputValue
    });

    if (customSelectHandlers && inputName in customSelectHandlers) {
      await customSelectHandlers[inputName]({
        dispatch,
        input: state.form.inputs[inputName] as SelectInputType,
        value: inputValue
      });
    }
  }, [customSelectHandlers, state.form.inputs]);

  const onSelectDropdownCheck = useCallback((event: ChangeEvent<HTMLInputElement>, inputName: string) => {
    const { id } = event.target;

    if (!id) {
      return;
    }

    dispatch({
      type: UseFormActionTypes.ON_SELECT_DROPDOWN_CHECK,
      inputName,
      checkedItemId: id
    });
  }, []);

  const onSearchDropdown = useCallback((
    event: ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const { value } = event.target;
    dispatch({
      type: UseFormActionTypes.ON_SEARCH_DROPDOWN,
      inputName,
      searchTerm: value
    });
  }, []);

  const onClearSearchDropdown = useCallback((inputName: string) => {
    dispatch({
      type: UseFormActionTypes.ON_CLEAR_SEARCH_DROPDOWN,
      inputName
    });
  }, []);

  const onCloseDropdown = useCallback((inputName: string): void => {
    dispatch({
      type: UseFormActionTypes.ON_CLOSE_DROPDOWN,
      inputName
    });
  }, []);

  return {
    form: state.form,
    prepopulateInfo: state.prepopulateInfo,
    onInputFocus,
    onInputUnfocus,
    onInputChange,
    onClearInput,
    onPasswordVisibilityToggle,
    onSelect,
    onSearchDropdown,
    onClearSearchDropdown,
    onSelectDropdownCheck,
    onCloseDropdown
  };
};