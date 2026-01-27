import { Roboto } from 'next/font/google';
import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import '@/styles/global.scss';
import StoreProvider from '@/store/StoreProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
});

export function generateStaticParams(): {
  lng: string;
}[] {
  return languages.map((lng) => ({ lng }))
}

const RootLayout = ({
  children,
  params: { lng }
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) => {
  return (
    <html lang={lng} dir={dir(lng)} className={roboto.className}>
      <body>
        <main>
          <StoreProvider>
            {children}
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
