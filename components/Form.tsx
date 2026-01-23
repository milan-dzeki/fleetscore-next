'use client';

import type { FormType } from '@/types/forms';
import { useForm } from '@/hooks/useForm/useForm';
import TextInput from './inputs/TextInput';
import classes from '@/styles/components/form.module.scss';

interface Props {
  generatedForm: FormType;
}

function Form({ generatedForm }: Props) {
  const {
    form,
    onInputFocus,
    onInputUnfocus,
    onInputChange
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
              />
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default Form;