import type { RegattaType } from '@/types/entities';
import { getDateLabel } from '@/utils/dates';
import EditButton from '../buttons/EditButton';
import classes from '@/styles/components/regattas/regatta.module.scss';
import RegularLink from '../links/RegularLink';
import ROUTE_PATHS from '@/configs/routePaths';
import ArrowLinkRightIcon from '../icons/ArrowLinkRightIcon';

interface Props {
  locale: string;
  regatta: RegattaType;
  translations: {
    upcoming: string;
    inProgress: string;
    ended: string;
    edit: string;
    place: string;
    date: string;
    seeDetails: string;
  };
}

const Regatta = ({ locale, regatta, translations }: Props) => {
  const dateLabel = getDateLabel(regatta.startDate, regatta.endDate);

  return (
    <div className={classes.regatta}>
      <h4>
        <span className={classes.regattaHeading}>
          <span className={classes.regattaName}>{regatta.name}</span>
          {dateLabel !== null && dateLabel in translations && (
            <span> ({translations[dateLabel]})</span>
          )}
        </span>
        <EditButton text={translations.edit} itemOwnerId={regatta.ownerId} />
      </h4>
      <div className={classes.regattaContent}>
        <div>
          <span className="text-light-bold">{translations.place}: </span>
          <span>{regatta.country} / {regatta.place}</span>
        </div>
        <div>
          <span className="text-light-bold">{translations.date}: </span>
          <span>{regatta.startDate} - {regatta.endDate}</span>
        </div>
        <br />
        <RegularLink
          href={`/${locale}${ROUTE_PATHS.REGATTAS.root}/${regatta.id}`}
          text={translations.seeDetails}
          IconRight={<ArrowLinkRightIcon color="mainBlue" />}
        />
      </div>
    </div>
  );
};

export default Regatta;