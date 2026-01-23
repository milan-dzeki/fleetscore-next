import Link from 'next/link';
import classes from '@/styles/components/forms/authFormSwitch.module.scss';

interface Props {
  switchText: string;
  linkPath: string;
  linkText: string;
}

const AuthFormSwitch = ({
  switchText,
  linkPath,
  linkText
}: Props) => {
  return (
    <div className={classes.switch}>
      <p>{switchText}</p>
      <Link href={linkPath} className={classes.switchLink}>
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFormSwitch;