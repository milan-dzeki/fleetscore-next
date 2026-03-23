'use client';

import { useAppSelector } from '@/hooks/store';
import classes from '@/styles/components/buttons/editButton.module.scss';
import EditIcon from '../icons/EditIcon';

interface Props {
  itemOwnerId: string | number;
  text: string;
}

const EditButton = ({ itemOwnerId, text }: Props) => {
  const { data: authUser } = useAppSelector((state) => state.user);

  if (!authUser || authUser.userId.toString() !== itemOwnerId.toString()) {
    return null;
  }
  return (
    <button type="button" className={classes.button}>
      <EditIcon/>
      <span className={classes.buttonText}>{text}</span>
    </button>
  );
};

export default EditButton;