import type { SailingNationType } from '@/types/entities';
import classes from '@/styles/components/sailingNations/sailingNation.module.scss';;

interface Props {
  sailingNation: SailingNationType;
  translations: {
    code: string;
    countryName: string;
  }
}

const SailingNation = ({ sailingNation, translations }: Props) => {
  return (
    <div className={classes.sNation}>
      <div className={classes.sNationCode}>
        <span>{translations.code}: </span>
        <span className="text-bold">{sailingNation.code}</span>
      </div>
      <div className={classes.sNationCountry}>
        <span>{translations.countryName}: </span>
        <span className="text-bold">{sailingNation.country}</span>
      </div>
    </div>
  );
};

export default SailingNation;