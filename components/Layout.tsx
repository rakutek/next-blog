import React, { ReactNode } from "react";
import Head from "next/head";

import styled from "styled-components";

type Props = {
    children?: ReactNode;
    title?: string;
};

const HeaderWrapper = styled.header`
    text-align: center;
    h1 {
        display: inline-block;
        font-size: 38px;
    }

    height: 0;
    padding-bottom: 70px;
`;

const Wrapper = styled.div`
    margin: 0 auto;
    text-align: center;
`;

const Main = styled.div`
    text-align: left;

    display: inline-block;

    padding-top: 60px;
`;

const Body = styled.body`
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 18px;

    a {
        color: #0070f3;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;

const Layout = ({ children, title = "rakutek.dev" }: Props) => (
    <Body>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>

        <HeaderWrapper>
            <h1>rakutek.dev🧑‍💻</h1>

            <hr />
        </HeaderWrapper>

        <Wrapper>
            <Main>{children}</Main>
        </Wrapper>
    </Body>
);

export default Layout;
