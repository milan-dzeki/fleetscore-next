'use client';

import type { SailingClassType } from '@/types/entities';
import { useTranslation } from '@/i18n/client';
import { SHARED_NS } from '@/i18n/namespaces/components';
import { SAILING_CLASSES_PAGE_NS } from '@/i18n/namespaces/pages';
import classes from '@/styles/components/sailingClasses/sailingClass.module.scss';

interface Props {
  locale: string;
  sailingClass: SailingClassType;
}

const SailingClass = ({ locale, sailingClass }: Props) => {
  const { t } = useTranslation(locale, [SHARED_NS, SAILING_CLASSES_PAGE_NS]);
  return (
    <div className={classes.sailingClass}>
      <div className={classes.sailingClassTitle}>
        <span className={classes.sailingClassName}>{sailingClass.name}</span>
        <span className={classes.sailingClassCreator}>{t(`${SHARED_NS}:creator`)} <span className={classes.sailingClassCreatorName}>{sailingClass.classDesigner || t('unknown')}</span></span>
      </div>
      <div className={classes.sailingClassInfo}>
        <p className={classes.sailingClassInfoText}>
          {t(`${SAILING_CLASSES_PAGE_NS}:classCode`)}: {sailingClass.classCode}
        </p>
        <p className={classes.sailingClassInfoText}>
          {t(`${SAILING_CLASSES_PAGE_NS}:worldSailingStatus`)}: {sailingClass.worldSailingStatus}
        </p>
        <p className={classes.sailingClassInfoText}>
          {t(`${SAILING_CLASSES_PAGE_NS}:hullType`)}: {sailingClass.hullType}
        </p>
        <p className={classes.sailingClassInfoText}>
          {t(`${SAILING_CLASSES_PAGE_NS}:hullLength`)}: {sailingClass.hullLength || t(`${SHARED_NS}:unspeficied`)}
        </p>
      </div>
    </div>
  );
};

export default SailingClass;