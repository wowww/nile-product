import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" />
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Judson:wght@400;700&display=swap" />
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NXT7P2T');
            `}
          </Script>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-MFZBL8E909" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || []
              function gtag() {window.dataLayer.push(arguments);}
              gtag('js', new Date())
              gtag('config', 'G-MFZBL8E909')
            `}
          </Script>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" href="/NILE_192.png" />
          <link rel="apple-touch-icon" href="/NILE_180.png" />
        </Head>
        <body>
        <Main />
        <NextScript />
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXT7P2T" height="0" width="0"
                  style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
