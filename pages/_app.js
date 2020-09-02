import "github-markdown-css";
import "github-markdown-css/github-markdown.css";

import "highlight.js/styles/a11y-dark.css";

import * as gtag from "lib/gtag";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        if (!gtag.existsGaId) {
            return;
        }

        const handleRouteChange = (path) => {
            gtag.pageview(path);
        };

        Router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            Router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);

    return <Component {...pageProps} />;
}
