import { Titan_One } from 'next/font/google';
import Link from 'next/link';
import ROUTE_PATHS from '@/configs/routePaths';
import classes from '@/styles/components/layout/header/header.module.scss';
import ShipIcon from '../../icons/ShipIcon';
import HeaderLinks from './HeaderLinks';

const titanOne = Titan_One({
  subsets: ['latin'],
  weight: '400'
});

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.headerBcg} />
      <div className={classes.headerContent}>
        <Link href={ROUTE_PATHS.HOME.root} className={classes.headerLink}>
          <ShipIcon size="medium" color="white" />
          <p className={`${classes.headerLinkText} ${titanOne.className}`}>
            <span>Fleet</span><span>Score</span>
          </p>
        </Link>
        <HeaderLinks />
      </div>
    </header>
  );
};

export default Header;