import type { RegattaType } from '@/types/entities';
import classes from '@/styles/components/regattas/regattaFull.module.scss';

interface Props {
  regatta: RegattaType;
  translations: {
    dates: string;
    place: string;
    address: string;
    organisation: string;
    sailingClasses: string;
    email: string;
    phone: string;
    throwoutAfter: string;
    throwoutLimit: string;
  };
}

const RegattaFull = ({ regatta, translations }: Props) => {
  return (
    <div className={classes.regatta}>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.dates}: </span>
        <span>{regatta.startDate} - {regatta.endDate}</span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.place}: </span>
        <span>{regatta.country}{regatta.place ? ` / ${regatta.place}` : ''}</span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.address}: </span>
        <span>{regatta.address || '--'}</span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.organisation}: </span>
        <span>{regatta.organisation?.name || '--'}</span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.sailingClasses}: </span>
        <span>
          {regatta.sailingClasses.length > 0 ? regatta.sailingClasses.map((sc) => sc.name).join(' / ') : '--'}
        </span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.email}: </span>
        <span>{regatta.email || '--'}</span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.phone}: </span>
        <span>{regatta.phone || ''}</span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.throwoutAfter}: </span>
        <span>{regatta.throwoutAfter ?? '--'}</span>
      </div>
      <div className={classes.regattaInfo}>
        <span className="text-bold">{translations.throwoutLimit}: </span>
        <span>{regatta.throwoutLimit ?? '--'}</span>
      </div>
    </div>
  );
};

export default RegattaFull;