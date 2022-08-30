import '../styles/globals.css';
import { FC, useEffect, useRef } from 'react';
import Layout from '../src/layout/Layout';
 



const MyApp:FC<any> = ({ Component, pageProps }) => {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>  
    )
}


MyApp.displayName = 'MyApp';

export default MyApp;
