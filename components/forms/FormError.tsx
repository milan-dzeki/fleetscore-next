import classes from '@/styles/components/forms/formError.module.scss';
import ExclamationCircleEmptyIcon from '../icons/ExclamationCircleEmptyIcon';

interface Props {
  errorMsg: string;
}

const FormError = ({ errorMsg }: Props) => {
  return (
    <div className={classes.error}>
      <ExclamationCircleEmptyIcon color="errorRed" />
      <span className={classes.errorText}>{errorMsg}</span>
    </div>
  );
};

export default FormError;