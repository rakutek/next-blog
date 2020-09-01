import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";

import styled from "styled-components";

const HeadingXl = styled.h1`
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
`;

const Article = styled.article`
    max-width: 48rem;
`;

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <Article>
                <HeadingXl>{postData.title}</HeadingXl>

                <div>
                    <Date dateString={postData.date} />
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />
            </Article>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
