'use client';

import Link from 'next/link';
import classes from '@/styles/components/layout/header/headerProfileLink.module.scss';

interface Props {
  firstName: string;
  lng: string;
}

const HeaderProfileLink = ({ firstName, lng }: Props) => {
  return (
    <Link href={`/${lng}/me`} className={classes.link}>
      <span className={classes.linkName}>
        {firstName.charAt(0)}
      </span>
      <span className={classes.linkText}>Profile</span>
    </Link>
  );
};

export default HeaderProfileLink;