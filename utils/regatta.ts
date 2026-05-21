import { REGATTA_RACE_CIRCUMSTANCES } from '@/configs/constants';
import type { RegattaType } from '@/types/entities';
import { INPUT_TYPES, SelectInputType, TextInputType } from '@/types/inputs';

export const renderInitScoreDateInput = ({
  regattaStartDate,
  regattaEndDate
}: {
  regattaStartDate: string;
  regattaEndDate: string;
}): TextInputType => ({
  inputType: INPUT_TYPES.TEXT,
  attributes: {
    type: 'date',
    id: 'raceDate',
    name: 'raceDate',
    placeholder: 'Race Date',
    min: regattaStartDate,
    max: regattaEndDate
  },
  label: 'Race Date',
  focused: false,
  touched: false,
  valid: true,
  validation: {
    required: false
  },
  value: ''
});

export const renderInitScoreSailClassesInput = ({
  regattaSailingClasses
}: {
  regattaSailingClasses: RegattaType['sailingClasses']
}): SelectInputType => ({
  inputType: INPUT_TYPES.SELECT,
  attributes: {
    id: 'salingClass',
    name: 'sailingClass',
    placeholder: 'Sailing Class',
    type: 'text'
  },
  label: 'Sailing Class',
  focused: false,
  touched: false,
  valid: true,
  validation: {
    required: false
  },
  dropdownOpen: false,
  options: regattaSailingClasses.map((sc) => ({ id: sc.id, value: sc.name })),
  value: '',
  searchedOptions: regattaSailingClasses.map((sc) => ({ id: sc.id, value: sc.name }))
});

export const renderInitScorePositionInput = ({ sailNum, initValue }: { sailNum: string; initValue: number }): TextInputType => ({
  inputType: INPUT_TYPES.TEXT,
  attributes: {
    type: 'number',
    id: `${sailNum}-position`,
    name: `${sailNum}-position`,
    placeholder: 'position'
  },
  label: '',
  focused: false,
  touched: false,
  valid: true,
  validation: {
    required: false
  },
  value: initValue.toString()
});

export const renderInitScoreCircumstanceInput = ({ sailNum }: { sailNum: string }): SelectInputType => {
  const options = Object.keys(REGATTA_RACE_CIRCUMSTANCES).map((circ) => ({ id: circ, value: circ }))
  return {
    inputType: INPUT_TYPES.SELECT,
    attributes: {
      id: `${sailNum}-circumstance`,
      name: `${sailNum}-circumstance`,
      placeholder: 'Circumstance',
      type: 'text'
    },
    label: '',
    focused: false,
    touched: false,
    valid: true,
    validation: {
      required: false
    },
    dropdownOpen: false,
    options,
    value: '',
    searchedOptions: options
  }
};