'use client';

import Link from 'next/link';
import { useAppSelector } from '@/hooks/store';
import classes from '@/styles/components/layout/header/headerLinks.module.scss';
import HeaderProfileLink from './HeaderProfileLink';
import ROUTE_PATHS from '@/configs/routePaths';

interface Props {
  lng: string;
}

const HeaderLinks = ({ lng }: Props) => {
  const { data: authUser } = useAppSelector(({ user }) => user);

  return (
    <div className={classes.headerLinks}>
      {authUser?.emailVerified && authUser?.profileCreated && authUser?.firstName && (
        <HeaderProfileLink firstName={authUser.firstName} lng={lng} />
      )}
      {authUser && !authUser.profileCreated && (
        <Link href={ROUTE_PATHS.ONBOARDING.createProfile} className={classes.headerLink}>
          create profile
        </Link>
      )}
      {!authUser && (
        <>
          <Link href={ROUTE_PATHS.AUTH.signup} replace className={classes.headerLink}>
            signup
          </Link>
          <Link href={ROUTE_PATHS.AUTH.login} replace className={classes.headerLink}>
            login
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderLinks;