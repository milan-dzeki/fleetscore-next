'use client';

import { useAppSelector } from '@/hooks/store';
import classes from '@/styles/components/buttons/editButton.module.scss';
import EditIcon from '../icons/EditIcon';

interface Props {
  itemOwnerId: string | number;
  text: string;
  isContainer?: boolean;
}

const EditButton = ({ itemOwnerId, text, isContainer }: Props) => {
  const { data: authUser } = useAppSelector((state) => state.user);

  if (!authUser || authUser.userId.toString() !== itemOwnerId.toString()) {
    return null;
  }

  const Content = (
    <button type="button" className={classes.button}>
      <EditIcon/>
      <span className={classes.buttonText}>{text}</span>
    </button>
  );

  if (isContainer) {
    return (
      <div className={classes.buttonContainer}>
        {Content}
      </div>
    );
  }

  return Content;
};

export default EditButton;