'use client';

import IconButton from "../buttons/IconButton";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import classes from '@/styles/components/regattas/regattaRegistrationActions.module.scss';

const RegattaRegistrationActions = () => {
  return (
    <div className={classes.actions}>
      <IconButton
        Icon={<EditIcon />}
        onClick={() => {}}
        text=""
      />
      <IconButton
        Icon={<DeleteIcon color="errorRed" />}
        onClick={() => {}}
        text=""
      />
    </div>
  );
};

export default RegattaRegistrationActions;