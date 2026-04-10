import { Titan_One } from 'next/font/google';
import Link from 'next/link';
import ROUTE_PATHS from '@/configs/routePaths';
import ShipIcon from '../../icons/ShipIcon';
import HeaderLinks from './HeaderLinks';
import HeaderLngSwitcher from './HeaderLngSwitcher';
import HeaderNavigation from './HeaderNavigation';
import classes from '@/styles/components/layout/header/header.module.scss';

const titanOne = Titan_One({
  subsets: ['latin'],
  weight: '400'
});

interface Props {
  lng: string;
}

const Header = ({ lng }: Props) => {
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
        <div className={classes.headerNav}>
          <HeaderLinks lng={lng} />
          <HeaderLngSwitcher lng={lng} />
          <HeaderNavigation lng={lng} />
        </div>
      </div>
    </header>
  );
};

export default Header;