import classes from '@/styles/components/buttons/redirectButton.module.scss';

interface Props {
  text: string;
  center?: boolean;
}

const RedirectButton = ({ text, center }: Props) => {
  return (
    <button type="submit" className={`${classes.button} ${center ? classes.buttonCenter : ''}`}>{text}</button>
  );
};

export default RedirectButton;