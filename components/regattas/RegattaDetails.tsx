import { getRegattaRegistrations, getRegattaScores } from "@/customApi/regattas/regattasApiClient";
import Link from "next/link";
import classes from '@/styles/components/regattas/regattaDetails.module.scss';
import RegattaRegistrationsTable from "./RegattaRegistrationsTable";
import { RegattaType } from "@/types/entities";
import { getTranslations } from "@/i18n";
import { REGATTA_REGISTRATIONS_PAGE_NS } from "@/i18n/namespaces/pages";
import RegattaScores from "./scores";

interface Props {
  lng: string;
  regattaId: string;
  regattaSailingClasses: RegattaType['sailingClasses'];
  tab: 'registrations' | 'scores' | undefined;
  regattaStartDate: string;
  regattaEndDate: string;
}

const RegattaDetails = async ({ lng, regattaId, regattaSailingClasses, tab, regattaStartDate, regattaEndDate }: Props) => {
  const { t } = await getTranslations(lng, REGATTA_REGISTRATIONS_PAGE_NS)
  const activeTab = tab || 'scores';
  const [registrations, regattaScores] = await Promise.all([
    getRegattaRegistrations(regattaId),
    getRegattaScores(regattaId)
  ]);

  if (!registrations.success || !regattaScores.success) {
    return <p>Error fetching registrations</p>;
  }

  if (activeTab === 'registrations') {
    const tableTranslations = {
      header: {
        name: t('name'),
        birthday: t('birthday'),
        sailNumber: t('sailNumber'),
        gender: t('gender'),
        club: t('club'),
        sailingClass: t('sailingClass'),
        nation: t('nation'),
      }
    };

    return (
      <section className={classes.details}>
        <nav>
          <Link className={`${classes.detailsLink} ${classes.detailsLinkActive}`} href="?tab=registrations">Registrations</Link>
          <Link className={classes.detailsLink} href="?tab=scores">Scores</Link>
        </nav>

        {/* render registrations.data */}
        <RegattaRegistrationsTable
          locale={lng}
          regattaId={regattaId}
          regattaSailingClasses={regattaSailingClasses}
          registrations={registrations.data}
          translations={tableTranslations}
        />
      </section>
    );
  }

  return (
    <section className={classes.details}>
      <nav>
        <Link className={classes.detailsLink} href="?tab=registrations">Registrations</Link>
        <Link className={`${classes.detailsLink} ${classes.detailsLinkActive}`} href="?tab=scores">Scores</Link>
      </nav>
      <RegattaScores
        regattaId={regattaId}
        registrations={registrations.data}
        scores={regattaScores.data}
        regattaSailingClasses={regattaSailingClasses}
        regattaStartDate={regattaStartDate}
        regattaEndDate={regattaEndDate}
      />
    </section>
  );
};

export default RegattaDetails;