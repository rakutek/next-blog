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
        //padding-left: 190px;
        //text-align: left;

        display: inline-block;
        font-size: 32px;
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

const Layout = ({ children, title = "This is the default title" }: Props) => (
    <div>
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
    </div>
);

export default Layout;
