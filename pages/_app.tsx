import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@styles/globals.css';

import * as gtag from '../lib/gtag';
import { Layout } from '@components/common';
import Head from 'next/head';
import ScrollRestoration from '../components/common/ScrollRestoration/ScrollRestoration';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <ScrollRestoration />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
