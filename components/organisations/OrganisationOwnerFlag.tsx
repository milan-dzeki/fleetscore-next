'use client';

import { useAppSelector } from '@/hooks/store';
import classes from '@/styles/components/organisations/organisationOwnerFlag.module.scss';

interface Props {
  organisationOwnerId: number;
  translation: string;
}

const OrganisationOwnerFlag = ({ organisationOwnerId, translation }: Props) => {
  const { data } = useAppSelector(({ user }) => user);

  if (!data || (data && data.userId !== organisationOwnerId)) {
    return null;
  }
  return <span className={classes.flag}>{translation}</span>;
};

export default OrganisationOwnerFlag;