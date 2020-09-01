import Link from 'next/link'
import Layout from '../components/Layout'
import Date from '../components/date'

import {getSortedPostsData} from '../lib/posts'


import styled from "styled-components";

const Light = styled.small`
 color: #666;
`


const IndexPage = ({allPostsData}) => (
    <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hello Next.js 👋</h1>
        <p>
            <Link href="/">
                <a>About</a>
            </Link>
        </p>


        {allPostsData.map(({id, date, title}) => (
            <li>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <a>{title}</a>
                </Link>
                <br/>
                <Light>
                    <Date dateString={date}/>
                </Light>

            </li>
        ))}


    </Layout>
)

export default IndexPage


export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}
