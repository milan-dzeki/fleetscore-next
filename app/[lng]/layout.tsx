import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import '@/styles/global.scss';

export function generateStaticParams(): {
  lng: string;
}[] {
  return languages.map((lng) => ({ lng }))
}

function RootLayout({
  children,
  params: { lng }
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
