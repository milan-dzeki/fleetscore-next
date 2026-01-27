import ShipIcon from '@/components/icons/ShipIcon';
import classes from '@/styles/components/loaders/mainLoader.module.scss';

interface Props {
  text?: string;
}

const MainLoader = ({ text }: Props) => {
  return (
    <div className={classes.mainLoader}>
      <div className={classes.mainLoaderIcons}>
        <ShipIcon size="big" color="white" />
        <ShipIcon size="big" color="white" />
        <ShipIcon size="big" color="white" />
      </div>
      {text && <p className={classes.mainLoaderText}>{text}</p>}
    </div>
  );
};

export default MainLoader;