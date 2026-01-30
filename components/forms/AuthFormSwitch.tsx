import Link from 'next/link';
import classes from '@/styles/components/forms/authFormSwitch.module.scss';

interface Props {
  switchText: string;
  linkPath: string;
  linkText: string;
  forgotPasswordTexts?: {
    text: string;
    linkPath: string;
    linkText: string;
  };
}

const AuthFormSwitch = ({
  switchText,
  linkPath,
  linkText,
  forgotPasswordTexts
}: Props) => {
  return (
    <div className={classes.switch}>
      {forgotPasswordTexts && (
        <div className={classes.switchPassword}>
          <p>{forgotPasswordTexts.text}</p>
          <Link href={forgotPasswordTexts.linkPath} replace className={classes.switchLink}>
            {forgotPasswordTexts.linkText}
          </Link>
        </div>
      )}
      <div className={classes.switchContent}>
        <p>{switchText}</p>
        <Link href={linkPath} replace className={classes.switchLink}>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default AuthFormSwitch;