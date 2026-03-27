'use client';

import { useAppSelector } from '@/hooks/store';
import IconButton from './IconButton';
import classes from '@/styles/components/buttons/actionsConteiner.module.scss';

interface Props {
  itemOwnerId: string | number;
  buttons: {
    text: string;
    Icon: JSX.Element;
    danger?: boolean;
  }[];
}

const ActionsContainer = ({ itemOwnerId, buttons }: Props) => {
  const { data: authUser } = useAppSelector((state) => state.user);

  if (!authUser || authUser.userId.toString() !== itemOwnerId.toString()) {
    return null;
  }

  return (
    <section className={classes.actions}>
      {buttons.map((btn) => (
        <IconButton
          key={btn.text}
          text={btn.text}
          Icon={btn.Icon}
          danger={btn.danger || false}
        />
      ))}
    </section>
  );
};

export default ActionsContainer;