import React, {ReactNode} from 'react'
import Head from 'next/head'

import styled from "styled-components";


type Props = {
    children?: ReactNode
    title?: string
}

const HeaderWrapper = styled.header`
    h1 {
    padding-left:190px;
    font-size: 32px;
    }
    
    height: 0px;
    padding-bottom: 70px;
    
`


const Layout = ({children, title = 'This is the default title'}: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>

        <HeaderWrapper>
            <h1>rakutek.dev🧑‍💻</h1>
            <hr/>
        </HeaderWrapper>


        <div className={"wrapper"}>
            <div className={"main"}>
                {children}
            </div>

        </div>

        <footer>
        </footer>

        <style jsx>{`
            .wrapper {
              margin: 0 auto;
              text-align: center;
            }
            
            .main {
              text-align: left;
              
 display: inline-block;
            }
        `}</style>


    </div>


)

export default Layout


