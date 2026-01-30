'use client';

import Link from 'next/link';
import classes from '@/styles/components/layout/header/headerProfileLink.module.scss';

interface Props {
  firstName: string;
}

const HeaderProfileLink = ({ firstName }: Props) => {
  return (
    <Link href="/me" className={classes.link}>
      <span className={classes.linkName}>
        {firstName.charAt(0)}
      </span>
      <span className={classes.linkText}>Profile</span>
    </Link>
  );
};

export default HeaderProfileLink;