import '../styles/globals.css';
import Layout from '../components/Layout';
import { FC } from 'react';
// import { AppProps } from '../node_modules/next/dist/shared/lib/router/router';
// import { AppPropsType } from '../node_modules/next/dist/shared/lib/utils';
// import { AppProps } from '../node_modules/next/app';

const MyApp:FC<any> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    )
}

export default MyApp;
