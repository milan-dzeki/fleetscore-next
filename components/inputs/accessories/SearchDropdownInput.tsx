import { type FC, type ChangeEvent } from 'react';
import classes from '@/styles/components/inputs/accessories/searchDropdownInput.module.scss';
import XFatIcon from '@/components/icons/XFatIcon';

interface Props {
  value: string;
  parentInputName: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
  onClear: (inputName: string) => void;
}

const SearchDropdownInput: FC<Props> = ({
  value,
  parentInputName,
  onChange,
  onClear
}) => {
  return (
    <div className={classes.input}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event, parentInputName)}
      />
      {value.trim().length > 0 && (
        <XFatIcon onClick={() => onClear(parentInputName)} />
      )}
    </div>
  );
};

export default SearchDropdownInput;