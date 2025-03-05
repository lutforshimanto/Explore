import './globals.css';

import { ThemeProvider } from 'next-themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import { RootLayoutType } from '@/types/Layout';
import Header from '@/components/common/blocks/Header';
import Footer from '@/components/common/blocks/Footer';
import { SideAd } from '@/components/common/blocks/ads/SideAds';
import QueryProvider from '@/components/QueryProvider/QueryProvider';
import { ourFileRouter } from '@/app/api/uploadthing/core';

import ReduxProvider from '../../providers/redux';

export default async function RootLayout({ children, modal }: RootLayoutType) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col items-center justify-center w-screen">
        <QueryProvider>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              <Header />
              <div className="w-full grid grid-cols-1 xl:grid-cols-[324px_1fr_324px] 2xl:grid-cols-[320px_1fr_320px] 3xl:grid-cols-[340px_1fr_340px] xl:max-w-[1920px]">
                <SideAd />
                <NextSSRPlugin
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                {children}
                {modal}
                <SideAd />
              </div>
              <Footer />
            </ThemeProvider>
          </ReduxProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
