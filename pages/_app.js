import Router from "next/router";

import * as gtag from "../lib/gtag";

import "github-markdown-css";
import "github-markdown-css/github-markdown.css";

import "highlight.js/styles/a11y-dark.css";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
