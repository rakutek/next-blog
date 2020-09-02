import Router from "next/router";

import * as gtag from "../lib/gtag";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

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
