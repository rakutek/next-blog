import Link from 'next/link'
import Layout from '../components/Layout'
import Date from '../components/date'

import {getSortedPostsData} from '../lib/posts'

import utilStyles from '../styles/utils.module.css'


const IndexPage = ({allPostsData}) => (
    <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hello Next.js 👋</h1>
        <p>
            <Link href="/">
                <a>About</a>
            </Link>
        </p>


        {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <a>{title}</a>
                </Link>
                <br/>
                <small className={utilStyles.lightText}>
                <Date dateString={date}/>
                </small>
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
