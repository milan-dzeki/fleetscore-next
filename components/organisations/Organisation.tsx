import type { OrganisationType } from '@/types/entities';
import RegularLink from '@/components/links/RegularLink';
import ArrowLinkRightIcon from '../icons/ArrowLinkRightIcon';
import classes from '@/styles/components/organisations/organisation.module.scss';
import OrganisationOwnerFlag from './OrganisationOwnerFlag';

interface Props {
  organisation: OrganisationType;
  translations: {
    visit: string;
    location: string;
    email: string;
    phone: string;
    unspecified: string;
    ownerFlag: string;
  };
}

const Organisation = ({ organisation, translations }: Props) => {
  const setLocation = (): string => {
    const country = organisation.country ? `${organisation.country}${organisation.place || organisation.address ? ' / ' : ''}` : '';
    const place = organisation.place ? `${organisation.place}${organisation.address ? ' / ' : ''}` : '';
    const address = organisation.address || '';

    return `${country}${place}${address}`.trim();
  };

  const location = setLocation();

  return (
    <li className={classes.organisation}>
      <div className={classes.organisationTop}>
        <div className={classes.organisationTopInfo}>
          <div  className={classes.organisationImage}>
            {organisation.name.charAt(0)}
          </div>
          <p>
            <span className={classes.organisationName}>{organisation.name}</span>
            <OrganisationOwnerFlag organisationOwnerId={organisation.ownerId} translation={translations.ownerFlag} />
          </p>
        </div>
        <RegularLink href="/" text={translations.visit} IconRight={<ArrowLinkRightIcon color="mainBlue" />} />
      </div>
      <div className={classes.organisationInfo}>
        <div className={classes.organisationLocation}>
          <span className={classes.organisationLabel}>{translations.location}: </span>
          <span>{location || translations.unspecified}</span>
        </div>
        {organisation.email && <p><span className={classes.organisationLabel}>{translations.email}: </span>{organisation.email}</p>}
        {organisation.phone && <p><span className={classes.organisationLabel}>{translations.phone}: </span>{organisation.phone}</p>}
      </div>
    </li>
  );
};

export default Organisation;