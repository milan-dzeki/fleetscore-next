'use client';

import { type ReactNode } from 'react';
import { useFormState } from 'react-dom';
import type { BaseApiResponseType } from '@/types/serverActions/common';
import type { FormType } from '@/types/forms';
import { useForm } from '@/hooks/useForm/useForm';
import TextInput from '../inputs/TextInput';
import classes from '@/styles/components/forms/form.module.scss';
import Button from '../buttons/Button';
import FormError from './FormError';

interface Props<S extends BaseApiResponseType> {
  generatedForm: FormType;
  submitText: string;
  action: (prevState: S, formData: FormData) => Promise<S>;
  children?: ReactNode;
}

const Form = <S extends BaseApiResponseType>({ generatedForm, submitText, action, children }: Props<S>) => {
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

  return (
    <div className={classes.form}>
      {!state.success && state.message && (
        <FormError errorMsg={state.message} />
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