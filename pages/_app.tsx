import Router from "next/router";
import * as gtag from "../lib/gtag";
import React from "react";

import "github-markdown-css";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/a11y-dark.css";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
interface Props {
    Component: any;
    pageProps: any;
}
export default function App({ Component, pageProps }: Props) {
    return <Component {...pageProps} />;
}
