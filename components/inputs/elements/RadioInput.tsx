'use client';

import type { ChangeEventHandler } from 'react';
import type { RadioInputType } from '@/types/inputs';
import classes from '@/styles/components/inputs/elements/radioInput.module.scss';

interface Props {
  data: RadioInputType;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioInput = ({
  data: {
    attributes,
    label,
    options,
    value
  },
  onChange
}: Props) => {
  return (
    <div className={classes.input}>
      <span className={classes.inputLabel}>{label}</span>
      <div className={classes.inputOptions}>
        {options.map((option) => (
          <div key={option.id} className={classes.inputRadio}>
            <input
              type="radio"
              name={attributes.name}
              id={option.id}
              checked={value === option.value}
              value={option.value}
              onChange={onChange}
            />
            <label htmlFor={option.id}>
              {option.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioInput;