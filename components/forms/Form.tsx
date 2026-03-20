'use client';

import { useRouter } from 'next/navigation';
import {
  type ComponentType,
  type ReactNode,
  type FormEventHandler,
  useState
} from 'react';
import { useAppDispatch } from '@/hooks/store';
import type { FormType } from '@/types/forms';
import type { ServerResponseStateType } from '@/types/components/forms/form';
import SERVER_METHODS from '@/configs/server/methods';
import { INPUT_TYPES } from '@/types/inputs';
import { useForm } from '@/hooks/useForm/useForm';
import { setNotifications } from '@/store/slices/notificationsSlice';
import TextInput from '../inputs/elements/TextInput';
import Button from '@/components/buttons/Button';
import FormActionMessage from './FormActionMessage';
import SelectInput from '../inputs/elements/SelectInput';
import classes from '@/styles/components/forms/form.module.scss';
import SelectCheckboxesInput from '../inputs/elements/SelectCheckboxesInput';

interface Props<D> {
  generatedForm: FormType;
  submitText: string;
  apiConfig: {
    endpoint: string;
    method: typeof SERVER_METHODS[keyof typeof SERVER_METHODS];
    credentials?: RequestCredentials;
  };
  extraReqBodyFields?: { [fieldName: string]: string };
  children?: ReactNode;
  HandlerComp?: ComponentType<{ data: D | null; }>;
  createNotificationOnSuccess?: boolean;
}

const Form = <D extends object>({
  generatedForm,
  submitText,
  apiConfig,
  extraReqBodyFields,
  children,
  HandlerComp,
  createNotificationOnSuccess
}: Props<D>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    form,
    onInputFocus,
    onInputUnfocus,
    onInputChange,
    onClearInput,
    onPasswordVisibilityToggle,
    onSelect,
    onSearchDropdown,
    onClearSearchDropdown,
    onSelectDropdownCheck
  } = useForm(generatedForm);

  const [serverResponse, setServerResponse] = useState<ServerResponseStateType<D>>({
    loading: false,
    error: null,
    success: null,
    data: null,
    message: null
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setServerResponse((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      let requestBody: {[inputName: string]: string | string[]} = {};
      for (const input in form.inputs) {
        if (form.inputs[input].inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
          requestBody[input] = form.inputs[input].options
            .filter((opt) => opt.checked)
            .map((opt) => opt.id.toString())
        } else if (form.inputs[input].inputType === INPUT_TYPES.SELECT) {
          const targetOption = form.inputs[input].options
            .find((opt) => opt.value.toLowerCase() === form.inputs[input].value.toLowerCase());
          
          if (targetOption) {
            requestBody[input] = targetOption.id.toString();
          }
        } else {
          requestBody[input] = form.inputs[input].value;
        }
      }

      if (extraReqBodyFields) {
        requestBody = {
          ...requestBody,
          ...extraReqBodyFields
        };
      }

      const response = await fetch(apiConfig.endpoint, {
        method: apiConfig.method,
        body: JSON.stringify(requestBody),
        ...(apiConfig.credentials ? {
          credentials: apiConfig.credentials
        } : {})
      });

      const resData = await response.json();

      if (!response.ok) {
        return setServerResponse((prev) => ({
          ...prev,
          success: false,
          loading: false,
          error: resData.message
        }));
      }

      if (createNotificationOnSuccess) {
        dispatch(setNotifications({
          notifications: [
            { id: `${resData.data.message}`, type: 'success', text: resData.message, isDisappearing: true }
          ]
        }));
      }

      if (resData.redirectUrl) {
        router.refresh();
        router.replace(resData.redirectUrl);
        return;
      }

      setServerResponse((prev) => ({
        ...prev,
        loading: false,
        success: resData.success,
        message: resData.message,
        data: resData.data || null
      }));
    } catch (e: unknown) {
      setServerResponse((prev) => ({
        ...prev,
        loading: false,
        success: false,
        error: e instanceof Error ? e.message : 'Network error'
      }));
    }
  };
  
  return (
    <div className={classes.form}>
      {serverResponse.error && (
        <FormActionMessage isError={true} message={serverResponse.error} />
      )}
      <form className={classes.formEl} autoComplete="new-password" onSubmit={onSubmit}>
        <div className={classes.inputs}>
          {Object.keys(form.inputs).map((input) => {
            const inputData = form.inputs[input];

            if (inputData.inputType === INPUT_TYPES.SELECT) {
              return (
                <SelectInput
                  key={input}
                  data={inputData}
                  onFocus={onInputFocus}
                  onUnfocus={onInputUnfocus}
                  onChange={onInputChange}
                  onSelect={onSelect}
                  onClear={onClearInput}
                  onSearchDropdown={onSearchDropdown}
                  onClearSearchDropdown={onClearSearchDropdown}
                />
              );
            }

            if (inputData.inputType === INPUT_TYPES.SELECT_CHECKBOXES) {
              return (
                <SelectCheckboxesInput
                  key={input}
                  data={inputData}
                  onFocus={onInputFocus}
                  onChange={onInputChange}
                  onUnfocus={onInputUnfocus}
                  onClear={onClearInput}
                  onSearchDropdown={onSearchDropdown}
                  onClearSearchDropdown={onClearSearchDropdown}
                  onCheck={onSelectDropdownCheck}
                />
              );
            }
            return (
              <TextInput
                key={input}
                data={inputData}
                onFocus={onInputFocus}
                onUnfocus={onInputUnfocus}
                onChange={onInputChange}
                onClear={onClearInput}
                onPasswordVisibilityToggle={onPasswordVisibilityToggle}
              />
            );
          })}
        </div>
        {children || null}
        {HandlerComp && serverResponse.data ? <HandlerComp data={serverResponse.data} /> : null}
        <Button type="submit" text={submitText} disabled={!form.isValid || serverResponse.loading} />
      </form>
    </div>
  );
}

export default Form;