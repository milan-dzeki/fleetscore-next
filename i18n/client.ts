'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions, languages, cookieName } from './settings';

const runsOnServerSide = typeof window === 'undefined';

const getDetectedLng = () => {
  if (runsOnServerSide) return undefined;
  // Simple check: does URL start with /sr-RS?
  const path = window.location.pathname;
  return languages.find(l => path.startsWith(`/${l}`));
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((
    language: string,
    namespace: string
  ) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(getDetectedLng()),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
      lookupCookie: cookieName,
      caches: ['cookie']
    },
    preload: runsOnServerSide ? languages : []
  });

export function useTranslation (lng: string, ns: string, options?: object) {
  // const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
  }
  return ret
}