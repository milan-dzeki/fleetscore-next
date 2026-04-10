'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store';
import ROUTE_PATHS from '@/configs/routePaths';
import classes from '@/styles/components/layout/header/headerNavigation.module.scss';

interface Props {
  lng: string;
}

const HeaderNavigation = ({ lng }: Props) => {
  const [navOpen, setNavOpen] = useState(false);
  const { data: userData } = useAppSelector(({ user }) => user);

  const pathPrefix = `/${lng}`;

  const onCloseNav = (): void => setNavOpen(false);

  return (
    <div className={classes.nav}>
      <button type="button" className={classes.navBtn} onClick={() => setNavOpen((prev) => !prev)}>
        <span className={`${classes.navLine} ${navOpen ? classes.navLineOpen1 : ''}`} />
        {!navOpen && <span className={classes.navLine} />}
        <span className={`${classes.navLine} ${navOpen ? classes.navLineOpen3 : ''}`} />
      </button>
      <nav className={`${classes.navList} ${navOpen ? classes.navListOpen : ''}`}>
        <Link className={classes.navLink} href={`${pathPrefix}${ROUTE_PATHS.REGATTAS.root}`} onClick={onCloseNav}>Regattas</Link>
        {userData && <Link className={classes.navLink} href={`${pathPrefix}${ROUTE_PATHS.REGATTAS.create}`} onClick={onCloseNav}>Create Regatta</Link>}
        <Link className={classes.navLink} href={`${pathPrefix}${ROUTE_PATHS.ORGANISATIONS.root}`} onClick={onCloseNav}>Organisations</Link>
        {userData && <Link className={classes.navLink} href={`${pathPrefix}${ROUTE_PATHS.ORGANISATIONS.create}`} onClick={onCloseNav}>Create Organisation</Link>}
        <Link className={classes.navLink} href={`${pathPrefix}${ROUTE_PATHS.CLUBS.root}`} onClick={onCloseNav}>Clubs</Link>
        {userData && <Link className={classes.navLink} href={`${pathPrefix}${ROUTE_PATHS.CLUBS.create}`} onClick={onCloseNav}>Create Club</Link>}
      </nav>
    </div>
  );
};

export default HeaderNavigation;