import CheckCircleIcon from '../icons/CheckCircleIcon';
import ExclamationCircleEmptyIcon from '../icons/ExclamationCircleEmptyIcon';
import classes from '@/styles/components/forms/formActionMessage.module.scss';

interface Props {
  isError: boolean;
  message: string;
  className?: string;
}

const FormActionMessage = ({ isError, message, className = '' }: Props) => {
  return (
    <div className={`${classes.formActionMessage} ${className} ${isError ? classes.formActionMessageError : ''}`}>
      {
        isError
        ? <ExclamationCircleEmptyIcon color="errorRed" />
        : <CheckCircleIcon color="successGreen" />
      }
      <span className={classes.formActionMessageText}>{message}</span>
    </div>
  );
};

export default FormActionMessage;