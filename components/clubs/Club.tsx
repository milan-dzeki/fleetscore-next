import type { ClubType } from '@/types/entities';
import classes from '@/styles/components/clubs/club.module.scss';
import RegularLink from '../links/RegularLink';
import ROUTE_PATHS from '@/configs/routePaths';
import ArrowLinkRightIcon from '../icons/ArrowLinkRightIcon';
import EditButton from '../buttons/EditButton';

interface Props {
  locale: string;
  club: ClubType;
  translations: {
    place: string;
    organisation: string;
    seeDetails: string;
    edit: string;
  };
}


const Club = ({
  locale,
  club,
  translations
}: Props) => {
  return (
    <div className={classes.club}>
      <h4 className={classes.clubHeading}>
        <span className={classes.clubName}>{club.name}</span>
        <EditButton text={translations.edit} itemOwnerId={club.ownerId} />
      </h4>
      <div className={classes.clubContent}>
        <div>
          <span className="text-light-bold">{translations.place}: </span>
          <span>{club.country} / {club.place}</span>
        </div>
        <div>
          <span className="text-light-bold">{translations.organisation}: </span>
          <span>{club.organisationName}</span>
        </div>
        <br />
        <RegularLink
          href={`/${locale}${ROUTE_PATHS.CLUBS.root}/${club.id}`}
          text={translations.seeDetails}
          IconRight={<ArrowLinkRightIcon color="mainBlue" />}
        />
      </div>
    </div>
  );
};

export default Club;