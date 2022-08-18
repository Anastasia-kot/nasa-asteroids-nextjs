import '../styles/globals.css';
import Layout from '../components/Layout';
import { FC, useEffect, useRef } from 'react';
 














const MyApp:FC<any> = ({ Component, pageProps }) => {



  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    )
}

export default MyApp;
