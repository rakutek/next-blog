import Link from "next/link";
import Layout from "../components/Layout";
import { getSortedPostsData } from "../lib/posts";
import styled from "styled-components";

const Light = styled.small`
    color: #666;
`;
const List = styled.li`
    list-style: none;
    margin: 0;
    padding-bottom: 7px;
`;

const Title = styled.a`
    font-size: 24px;
`;

const IndexPage = ({ allPostsData }) => (
    <Layout title="rakutek.dev">
        <h1>Blog</h1>

        {allPostsData.map(({ id, date, title }) => (
            <List>
                <Link href="/[id]" as={`/${id}`}>
                    <Title>
                        <a>{title}</a>
                    </Title>
                </Link>

                <br />

                <Light>{date}</Light>
            </List>
        ))}
    </Layout>
);

export default IndexPage;

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}
