import classes from '@/styles/components/loaders/spinner.module.scss';

interface Props {
  withContainer?: boolean;
}

const SpinnerContent = () => <div className={classes.spinner} />;

const Spinner = ({ withContainer }: Props) => {
  if (withContainer) {
    return (
      <div className={classes.spinnerContainer}><SpinnerContent /></div>
    );
  }

  return <SpinnerContent />;
};

export default Spinner;