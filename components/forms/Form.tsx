'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';
import { useFormState } from 'react-dom';
import type { BaseApiRawResponseType, BaseApiResponseType } from '@/types/customApi/baseApi';
import type { FormType } from '@/types/forms';
import { useForm } from '@/hooks/useForm/useForm';
import TextInput from '../inputs/TextInput';
import classes from '@/styles/components/forms/form.module.scss';
import Button from '../buttons/Button';
import FormActionMessage from './FormActionMessage';

interface Props<D, S extends BaseApiResponseType<D> | BaseApiRawResponseType> {
  generatedForm: FormType;
  submitText: string;
  action: (prevState: S, formData: FormData) => Promise<S>;
  redirectUrl?: string;
  children?: ReactNode;
}

const Form = <D, S extends BaseApiResponseType<D> | BaseApiRawResponseType>({
  generatedForm,
  submitText,
  action,
  redirectUrl,
  children
}: Props<D, S>) => {
  const router = useRouter();

  const {
    form,
    onInputFocus,
    onInputUnfocus,
    onInputChange,
    onClearInput,
    onPasswordVisibilityToggle
  } = useForm(generatedForm);

  const [state, formAction] = useFormState<S, FormData>(action, {
    success: false,
    message: ''
  } as Awaited<S>);

  useEffect(() => {
    if ((redirectUrl || state.redirectUrl) && state.success) {
      router.push(redirectUrl || state.redirectUrl || '/');
    }
  }, [redirectUrl, state, router]);

  return (
    <div className={classes.form}>
      {state.message && (
        <FormActionMessage isError={!state.success} message={state.message} />
      )}
      <form className={classes.formEl} autoComplete="new-password" action={formAction}>
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
        <Button type="submit" text={submitText} disabled={!form.isValid} />
      </form>
    </div>
  );
}

export default Form;