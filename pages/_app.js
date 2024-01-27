import React from 'react';
import { Analytics } from '@vercel/analytics/react';
// Import the CSS for your theme - adjust the path as needed
import 'nextra-theme-docs/style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
