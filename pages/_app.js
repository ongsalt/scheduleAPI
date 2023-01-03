import { useState, createContext } from 'react';
import GlobalProvider from '../lib/clientContext';

import '../styles/globals.css'
import '../styles/palettes/shiroko.css'


export default function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )

}