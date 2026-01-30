import { Roboto } from 'next/font/google';
import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import StoreProvider from '@/store/StoreProvider';
import GetUserOnRefresh from '@/components/handlers/GetUserOnRefresh';
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
  return (
    <html lang={lng} dir={dir(lng)} className={roboto.className}>
      <body>
        <StoreProvider>
          <GetUserOnRefresh />
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
