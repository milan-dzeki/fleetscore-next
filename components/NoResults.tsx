'use client';

import Link from 'next/link';
import { useAppSelector } from '@/hooks/store';
import classes from '@/styles/components/noResults.module.scss';

interface Props {
  text: string;
  createItemData?: {
    text: string;
    url: string;
  };
}

const NoResults = ({
  text,
  createItemData
}: Props) => {
  const { data: authUser } = useAppSelector(({ user }) => user);

  return (
    <div className={classes.noResults}>
      <p className={classes.noResultsText}>{text}</p>
      {createItemData && authUser && (
        <Link href={createItemData.url} className={classes.noResultsLink}>
          <span>+</span> <span>{createItemData.text}</span>
        </Link>
      )}
    </div>
  );
};

export default NoResults;