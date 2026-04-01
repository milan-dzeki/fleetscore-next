import type { ClubType } from '@/types/entities';
import classes from '@/styles/components/clubs/clubFull.module.scss';

interface Props {
  club: ClubType;
  translations: {
    place: string;
    address: string;
    organisation: string;
    email: string;
    phone: string;
  };
}

const ClubFull = ({ club, translations }: Props) => {
  return (
    <div className={classes.club}>
      <div className={classes.clubInfo}>
        <span className="text-bold">{translations.place}: </span>
        <span>{club.country}{club.place ? ` / ${club.place}` : ''}</span>
      </div>
      <div className={classes.clubInfo}>
        <span className="text-bold">{translations.address}: </span>
        <span>{club.address || '--'}</span>
      </div>
      <div className={classes.clubInfo}>
        <span className="text-bold">{translations.organisation}: </span>
        <span>{club.organisationName || '--'}</span>
      </div>
      <div className={classes.clubInfo}>
        <span className="text-bold">{translations.email}: </span>
        <span>{club.email || '--'}</span>
      </div>
      <div className={classes.clubInfo}>
        <span className="text-bold">{translations.phone}: </span>
        <span>{club.phone || ''}</span>
      </div>
    </div>
  );
};

export default ClubFull;