'use client';

import { useRouter } from 'next/navigation';
import {
  type ComponentType,
  type ReactNode,
  type FormEventHandler,
  useState,
  useEffect
} from 'react';
import type { FormType } from '@/types/forms';
import type { ServerResponseStateType } from '@/types/components/forms/form';
import SERVER_METHODS from '@/configs/server/methods';
import { useForm } from '@/hooks/useForm/useForm';
import TextInput from '../inputs/TextInput';
import Button from '@/components/buttons/Button';
import FormActionMessage from './FormActionMessage';
import classes from '@/styles/components/forms/form.module.scss';

interface Props<D> {
  generatedForm: FormType;
  submitText: string;
  apiConfig: {
    endpoint: string;
    method: typeof SERVER_METHODS[keyof typeof SERVER_METHODS];
    credentials?: RequestCredentials;
  };
  children?: ReactNode;
  HandlerComp?: ComponentType<{ data: D | null; }>;
  redirectUrl?: string;
}

const Form = <D extends object>({
  generatedForm,
  submitText,
  apiConfig,
  children,
  HandlerComp,
  redirectUrl
}: Props<D>) => {
  const router = useRouter();

  const {
    form,
    onInputFocus,
    onInputUnfocus,
    onInputChange,
    onClearInput,
    onPasswordVisibilityToggle
  } = useForm(generatedForm);

  const [serverResponse, setServerResponse] = useState<ServerResponseStateType<D>>({
    loading: false,
    error: null,
    success: null,
    data: null,
    message: null
  });

  useEffect(() => {
    if (!HandlerComp && redirectUrl && serverResponse.success) {
      router.refresh();
      router.replace(redirectUrl);
    }
  }, [HandlerComp, redirectUrl, router, serverResponse.success]);

  const fetchUser: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setServerResponse((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      const inputFields: {[inputName: string]: string} = {};
      for (const input in form.inputs) {
        inputFields[input] = form.inputs[input].value;
      }
      const response = await fetch(`${window.location.origin}${apiConfig.endpoint}`, {
        method: apiConfig.method,
        body: JSON.stringify(inputFields),
        ...(apiConfig.credentials ? {
          credentials: apiConfig.credentials
        } : {})
      });

      const resData = await response.json();

      if (!response.ok) {
        return setServerResponse((prev) => ({
          ...prev,
          success: false,
          error: resData.message
        }));
      }

      if (!!HandlerComp) {
        setServerResponse((prev) => ({ ...prev, loading: false, data: resData.data, message: resData.message }));
      } else {
        setServerResponse((prev) => ({ ...prev, loading: false, success: resData.success, message: resData.message }));
      }
    } catch (e: unknown) {
      setServerResponse((prev) => ({
        ...prev,
        loading: false,
        success: false,
        error: e instanceof Error ? e.message : 'Network error'
      }));
    }
  };

  const message = serverResponse.error || serverResponse.message;
  
  return (
    <div className={classes.form}>
      {message && (
        <FormActionMessage isError={serverResponse.error !== null || serverResponse.success === false} message={message} />
      )}
      <form className={classes.formEl} autoComplete="new-password" onSubmit={fetchUser}>
        <div className={classes.inputs}>
          {Object.keys(form.inputs).map((input) => {
            const inputData = form.inputs[input];
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