'use client';

import Spinner from '@/components/loaders/Spinner';
import FormActionMessage from '../forms/FormActionMessage';

interface Props {
  loading: boolean;
  errorMsg: string | null;
  text: string;
}

const ModalConfirmContent = ({ loading, errorMsg, text }: Props) => {
  if (loading) {
    return <Spinner withContainer />
  }

  if (errorMsg) {
    return <FormActionMessage isError message={errorMsg} />;
  }

  return <p>{text}</p>;
};

export default ModalConfirmContent;