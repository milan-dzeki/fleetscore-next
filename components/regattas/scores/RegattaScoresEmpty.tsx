'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/store';
import IconButton from '@/components/buttons/IconButton';
import PlusCircleIcon from '@/components/icons/PlusCircleIcon';
import classes from '@/styles/components/regattas/scores/regattaScoresEmpty.module.scss';

interface Props {
  onSetAddMode: (mode: boolean) => void;
}

const RegattaScoresEmpty = ({ onSetAddMode }: Props) => {
  const { data: authUser } = useAppSelector(({ user }) => user);

  return (
    <div className={classes.empty}>
      <p>No scores added yet</p>
      {authUser && <IconButton text='Add scores' Icon={<PlusCircleIcon />} onClick={() => onSetAddMode(true)} />}
    </div>
  );
};

export default RegattaScoresEmpty;