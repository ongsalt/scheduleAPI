import dynamic from 'next/dynamic';
import { useState, createContext } from 'react';
import GlobalProvider from '../lib/clientContext';

import '../styles/globals.css'
import '../styles/palettes/shiroko.css'
// import '../styles/palettes/serika.css'

// const THEME = 'serika'

// const DynamicTheme = dynamic(() => {
//   if (THEME === 'shiroko') {
//     import('../styles/palettes/shiroko.css'), {
//       ssr: false,
//     }
//   } else {
//     import('../styles/palettes/serika.css'), {
//       ssr: false,
//     }
//   }
// })

export default function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}