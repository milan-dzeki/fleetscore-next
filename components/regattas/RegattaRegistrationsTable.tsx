import type { RegattaRegistrationType } from '@/types/entities';
import classes from '@/styles/components/regattas/regattaRegistrationsTable.module.scss';
import { getProfile } from '@/customApi/auth/authUtils';
import RegattaRegistrationActions from './RegattaRegistrationActions';

interface Props {
  registrations: RegattaRegistrationType[];
  translations: {
    header: {
      name: string;
      birthday: string;
      sailNumber: string;
      gender: string;
      club: string;
      sailingClass: string;
      nation: string;
    }
  }
}

const RegattaRegistrationsTable = async ({ registrations, translations }: Props) => {
  const profile = await getProfile();
  return (
    <div className={classes.table}>
      <div className={classes.tableHeader}>
        {Object.values(translations.header).map((item) => (
          <span key={item} className={classes.tableHeaderItem}>
            <span className={classes.tableHeaderItemText}>{item}</span>
          </span>
        ))}
        <div className={classes.tableHeaderActions} />
      </div>
      <div className={classes.tableBody}>
        {registrations.map((reg) => (
          <div key={reg.id} className={classes.tableBodyRow}>
            <span className={classes.tableBodyItem}>
              <span className={classes.tableBodyItemText}>
                {reg.sailorName}
              </span>
            </span>
            <span className={classes.tableBodyItem}>
              <span className={classes.tableBodyItemText}>
                {reg.dateOfBirth}
              </span>
            </span>
            <span className={classes.tableBodyItem}>
              <span className={classes.tableBodyItemText}>
                {reg.sailNumber}
              </span>
            </span>
            <span className={classes.tableBodyItem}>
              <span className={classes.tableBodyItemText}>
                {reg.gender}
              </span>
            </span>
            <span className={classes.tableBodyItem}>
              <span className={classes.tableBodyItemText}>
                {reg.sailingClubName}
              </span>
            </span>
            <span className={classes.tableBodyItem}>
              <span className={classes.tableBodyItemText}>
                {reg.sailingClass.name}
              </span>
            </span>
            <span className={classes.tableBodyItem}>
              <span className={classes.tableBodyItemText}>
                {reg.sailingNation.country}
              </span>
            </span>
            <div className={classes.tableItemActions}>
              {profile.success && profile.data.userId === reg.userId && <RegattaRegistrationActions />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegattaRegistrationsTable;