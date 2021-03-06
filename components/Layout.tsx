import React, { ReactNode } from "react";
import Head from "next/head";

import styled from "styled-components";
import media from "styled-media-query";
import Link from "next/link";

type Props = {
    children?: ReactNode;
    title?: string;
};

const HeaderWrapper = styled.header`
    text-align: center;
    a {
        font-weight: bold;
        font-size: 38px;
        display: block;
    }

    height: 0;
    padding-bottom: 14px;

    ${media.lessThan("small")`
        max-width: 23rem;
        padding-left:9px;
        padding-right:9px
        `}
`;

const Wrapper = styled.div`
    margin: 0 auto;
    text-align: center;
`;

const Main = styled.div`
    text-align: left;
    display: inline-block;
    padding-top: 60px;
    padding-left: 7px;
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

const Footer = styled.footer`
    background-color: #8b5def;

    width: 100%;
    height: 40px;

    bottom: 0; /*下に固定*/

    margin-top: auto;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Layout = ({ children, title = "rakutek.dev" }: Props) => (
    <>
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
                <Link href="/">
                    <a>rakutek.dev🧑‍💻</a>
                </Link>

                <hr />
            </HeaderWrapper>

            <Flex>
                <Wrapper>
                    <Main>{children}</Main>
                </Wrapper>
                <Footer>.</Footer>
            </Flex>
        </Body>
    </>
);
export default Layout;
