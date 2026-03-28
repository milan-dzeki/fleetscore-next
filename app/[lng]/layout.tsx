import { Roboto } from 'next/font/google';
import { dir } from 'i18next';
import { getProfile } from '@/customApi/auth/authUtils';
import StoreProvider from '@/store/StoreProvider';
import NotificationWrapper from '@/components/notifications/NotificationWrapper';
import Header from '@/components/layout/header/Header';
import Modal from '@/components/modals/Modal';
import { ModalProvider } from '@/contexts/modalContext';
import '@/styles/global.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700']
});

const RootLayout = async ({
  children,
  params: { lng }
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) => {
  const profileResponse = await getProfile();

  return (
    <html lang={lng} dir={dir(lng)} className={roboto.className}>
      <body>
        <div id="modal" />
        <StoreProvider initialUser={profileResponse.success ? profileResponse.data : null}>
          <ModalProvider>
            <Modal locale={lng} />
            <NotificationWrapper />
            <Header lng={lng} />
            <main>
              {children}
            </main>
          </ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;
