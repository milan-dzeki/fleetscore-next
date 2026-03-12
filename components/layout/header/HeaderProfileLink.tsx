'use client';

// import Link from 'next/link';
import ArrowDownMinimalIcon from '@/components/icons/ArrowDownMinimalIcon';
import classes from '@/styles/components/layout/header/headerProfileLink.module.scss';

interface Props {
  firstName: string;
  lng: string;
}

const HeaderProfileLink = ({
  firstName,
  // lng
}: Props) => {
  return (
    <div className={classes.link}>
      <button className={classes.linkName}>
        <span>{firstName.charAt(0)}</span>
        <span className={classes.linkArrow}>
          <ArrowDownMinimalIcon size="ultraSmall" />
        </span>
      </button>
      {/* <ul className={classes.linkList}>
        <li>
          <Link href={`/${lng}/me`}>
            View Profile
          </Link>
        </li>
      </ul> */}
    </div>
  );
};

export default HeaderProfileLink;