'use client';

import type { ReactNode } from 'react';
import type { FormType } from '@/types/forms';
import { useForm } from '@/hooks/useForm/useForm';
import TextInput from '../inputs/TextInput';
import classes from '@/styles/components/forms/form.module.scss';
import Button from '../buttons/Button';

interface Props {
  generatedForm: FormType;
  submitText: string;
  children?: ReactNode;
}

const Form = ({ generatedForm, submitText, children }: Props) => {
  const {
    form,
    onInputFocus,
    onInputUnfocus,
    onInputChange,
    onClearInput,
    onPasswordVisibilityToggle
  } = useForm(generatedForm);

  return (
    <div className={classes.form}>
      <form className={classes.formEl} autoComplete="new-password">
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