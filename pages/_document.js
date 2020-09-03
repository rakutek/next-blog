import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

import { GA_TRACKING_ID } from "../lib/gtag";

const APP_NAME = "next-pwa example";
const APP_DESCRIPTION = "This is an example of using next-pwa plugin";

export default class extends Document {
    static async getInitialProps(ctx) {
        return await Document.getInitialProps(ctx);
    }

    render() {
        return (
            <html lang="ja" dir="ltr">
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                        }}
                    />

                    <meta name="application-name" content={APP_NAME} />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta
                        name="apple-mobile-web-app-title"
                        content={APP_NAME}
                    />
                    <meta name="description" content={APP_DESCRIPTION} />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#FFFFFF" />

                    <link
                        rel="apple-touch-icon"
                        q
                        sizes="180x180"
                        href="../../public/icons/apple-touch-icon.png"
                    />
                    {/*<link rel="manifest" href="../../public/manifest.json" />*/}
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="shortcut icon"
                        href="../../public/icons/favicon.ico"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
