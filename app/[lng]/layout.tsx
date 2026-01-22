import { Roboto } from 'next/font/google';
import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import TextInput from '@/components/inputs/TextInput';
import '@/styles/global.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400']
});

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
    <html lang={lng} dir={dir(lng)} className={roboto.className}>
      <body>
        <main>
          <TextInput
            data={{
              label: 'Email',
              attributes: {
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'Email'
              },
              focused: false,
              touched: false,
              valid: false,
              value: ''
            }}
          />
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
