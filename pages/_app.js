import { useState, createContext } from 'react';

import '../styles/globals.css'

import '../styles/palettes/serika.css'


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )

}
