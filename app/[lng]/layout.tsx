import { Roboto } from 'next/font/google';
import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import { getProfile } from '@/customApi/auth/authUtils';
import StoreProvider from '@/store/StoreProvider';
import Header from '@/components/layout/header/Header';
import '@/styles/global.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
});

export function generateStaticParams(): {
  lng: string;
}[] {
  return languages.map((lng) => ({ lng }))
}

const RootLayout = async ({
  children,
  params: { lng }
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) => {
  const profileResponse = await getProfile(lng);
  return (
    <html lang={lng} dir={dir(lng)} className={roboto.className}>
      <body>
        <StoreProvider initialUser={profileResponse.success ? profileResponse.data : null}>
          <Header lng={lng} />
          <main>
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;
