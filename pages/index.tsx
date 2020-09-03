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
    padding-bottom: 2px;
`;

const Ol = styled.ol`
    padding-left: 0;
`;
const Title = styled.a`
    font-size: 24px;
`;

type Props = {
    id?: string;
    date?: string;
    title?: string;
};

const IndexPage = ({ allPostsData }: any) => (
    <Layout title="rakutek.dev">
        <h1>Blog</h1>

        {allPostsData.map(({ id, date, title }: Props) => (
            <Ol>
                <List>
                    <Light>{date}</Light>
                    <br />
                    <Link href="/[id]" as={`/${id}`}>
                        {/*<Link href="/posts/[id]" as={`/posts/${id}`}>*/}

                        <Title>
                            <a>{title}</a>
                        </Title>
                    </Link>
                </List>
            </Ol>
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
