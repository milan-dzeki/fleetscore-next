'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { useAppSelector } from '@/hooks/store';
import ROUTE_PATHS from '@/configs/routePaths';
import { useTranslation } from '@/i18n/client';
import { HEADER_NAVIGATION_NS } from '@/i18n/namespaces/components';
import classes from '@/styles/components/layout/header/headerNavigation.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface Props {
  lng: string;
}

const HeaderNavigation = ({ lng }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation(lng, HEADER_NAVIGATION_NS);
  const [navOpen, setNavOpen] = useState(false);
  const { data: userData } = useAppSelector(({ user }) => user);

  const pathPrefix = `/${lng}`;

  const onCloseNav = (): void => setNavOpen(false);

  useOutsideClick(containerRef, onCloseNav, navOpen);

  return (
    <div className={classes.nav}>
      <button
        type="button"
        className={classes.navBtn}
        onClick={() => setNavOpen((prev) => !prev)}
      >
        <span className={`${classes.navLine} ${navOpen ? classes.navLineOpen1 : ''}`} />
        {!navOpen && <span className={classes.navLine} />}
        <span className={`${classes.navLine} ${navOpen ? classes.navLineOpen3 : ''}`} />
      </button>

      <nav
        className={`${classes.navList} ${navOpen ? classes.navListOpen : ''}`}
        ref={containerRef}  
      >
        <Link
          className={classes.navLink}
          href={`${pathPrefix}${ROUTE_PATHS.REGATTAS.root}`}
          onClick={onCloseNav}
        >
          {t('regattas')}
        </Link>

        {userData && (
          <Link
            className={classes.navLink}
            href={`${pathPrefix}${ROUTE_PATHS.REGATTAS.create}`}
            onClick={onCloseNav}
          >
            {t('createRegatta')}
          </Link>
        )}

        <Link
          className={classes.navLink}
          href={`${pathPrefix}${ROUTE_PATHS.ORGANISATIONS.root}`}
          onClick={onCloseNav}
        >
          {t('organisations')}
        </Link>

        {userData && (
          <Link
            className={classes.navLink}
            href={`${pathPrefix}${ROUTE_PATHS.ORGANISATIONS.create}`}
            onClick={onCloseNav}
          >
            {t('createOrganisation')}
          </Link>
        )}

        <Link
          className={classes.navLink}
          href={`${pathPrefix}${ROUTE_PATHS.CLUBS.root}`}
          onClick={onCloseNav}
        >
          {t('clubs')}
        </Link>

        {userData && (
          <Link
            className={classes.navLink}
            href={`${pathPrefix}${ROUTE_PATHS.CLUBS.create}`}
            onClick={onCloseNav}
          >
            {t('createClub')}
          </Link>
        )}
        <Link
          className={classes.navLink}
          href={`${pathPrefix}${ROUTE_PATHS.SAILING_CLASSES.root}`}
          onClick={onCloseNav}
        >
          {t('sailingClasses')}
        </Link>
      </nav>
    </div>
  );
};

export default HeaderNavigation;