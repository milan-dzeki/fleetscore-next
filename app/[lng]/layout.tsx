import { dir } from 'i18next';
import { languages } from '@/i18n/settings';

export async function generateStaticParams() {
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
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
