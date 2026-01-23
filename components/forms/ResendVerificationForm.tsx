'use client';

import { useFormState } from 'react-dom';
import { resendVerification } from '@/serverActions/auth';
import Button from '@/components/buttons/Button';
import FormActionMessage from './FormActionMessage';

interface Props {
  btnText: string;
}

const ResendVerificationForm = ({ btnText }: Props) => {
  const [state, formAction] = useFormState(resendVerification, {
    success: false,
    message: ''
  });
  return (
    <form action={formAction}>
      {state.message && (
        <FormActionMessage isError={!state.success} message={state.message} />
      )}
      <Button type="submit" text={btnText} />
    </form>
  );
};

export default ResendVerificationForm;