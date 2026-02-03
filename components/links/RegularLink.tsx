import type { ReactNode } from 'react';
import Link from 'next/link';
import classes from '@/styles/components/links/regularLink.module.scss';

interface Props {
  href: string;
  text: string;
  IconRight?: ReactNode;
}

const RegularLink = ({ href, text, IconRight }: Props) => {
  return (
    <Link href={href} className={classes.link}>
      <span className={`${classes.linkText} ${IconRight ? classes.linkTextWithIconRight : ''}`}>{text}</span>
      {IconRight && IconRight}
    </Link>
  );
};

export default RegularLink;