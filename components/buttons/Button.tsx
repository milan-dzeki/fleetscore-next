import classes from '@/styles/components/buttons/button.module.scss';

interface Props {
  type: 'button' | 'submit';
  text: string;
  disabled?: boolean;
}

const Button = ({ type, text, disabled = false }: Props) => {
  return (
    <button type={type} disabled={disabled} className={classes.button}>
      {text}
    </button>
  );
};

export default Button;