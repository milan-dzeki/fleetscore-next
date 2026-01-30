'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { languages } from '@/i18n/settings';
import { HEADER_LNG_SWITCHER_NS } from '@/i18n/namespaces/components';
import ArrowDownMinimalIcon from '@/components/icons/ArrowDownMinimalIcon';
import LngFlagIcon from '@/components/icons/LngFlagIcon';
import classes from '@/styles/components/layout/header/headerLngSwitcher.module.scss';

interface Props {
  lng: string;
}

const HeaderLngSwitcher = ({ lng }: Props) => {
  const pathname = usePathname();
  const [lngListOpen, setLngListOpen] = useState(false);

  const { t } = useTranslation(lng, HEADER_LNG_SWITCHER_NS);

  const pathnameWithNoLocale = pathname.replace(lng, '');

  const onCloseLngList = () => {
    setLngListOpen(false);
  };

  return (
    <div className={classes.switcher}>
      <button
        type="button"
        className={`${classes.switcherBtn} ${lngListOpen ? classes.switcherBtnActive : ''}`}
        onClick={() => setLngListOpen((prev) => !prev)}
      >
        <LngFlagIcon locale={lng} />
        <span className={`${classes.switcherBtnIcon} ${lngListOpen ? classes.switcherBtnIconActive : ''}`}>
          <ArrowDownMinimalIcon color='white' size='small' />
        </span>
      </button>
      <div className={`${classes.switcherList} ${lngListOpen ? classes.switcherListOpen : ''}`}>
        <p className={classes.switcherListText}>{t('chooseLng')}</p>
        <ul>
          {languages.map((lang) => {
            const langValue = t(lang);
            const linkPathname = `/${lang}${pathnameWithNoLocale}`;
            const LinkContent = (
              <>
                <LngFlagIcon locale={lang} />
                <span className={classes.switcherItemText}>{langValue}</span>
              </>
            );
            return (
              <li key={lang}>
                {
                  lang === lng
                    ? (
                      <button className={classes.switcherItem} onClick={onCloseLngList}>
                        {LinkContent}
                      </button>
                    )
                    : (
                      <Link
                        href={linkPathname}
                        className={classes.switcherItem}
                        onClick={onCloseLngList}
                      >
                        {LinkContent}
                      </Link>
                    )
                }
                
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HeaderLngSwitcher;