'use client';

import classes from '@/styles/components/regattas/regattaRegistrations.module.scss';
import RegularLink from '../links/RegularLink';
import ArrowLinkRightIcon from '../icons/ArrowLinkRightIcon';
import IconButton from '../buttons/IconButton';
import PlusCircleIcon from '../icons/PlusCircleIcon';

interface Props {
  translations: {
    seeRegistrations: string;
    register: string;
  };
}

const RegattaRegistrations = ({ translations }: Props) => {
  return (
    <section className={classes.registrations}>
      <IconButton text={translations.register} Icon={<PlusCircleIcon />} onClick={() => {}} />
      <RegularLink
        href='/'
        text={translations.seeRegistrations}
        IconRight={<ArrowLinkRightIcon color="mainBlue" />}
      />
    </section>
  );
};

export default RegattaRegistrations;