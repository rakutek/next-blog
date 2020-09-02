import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

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
