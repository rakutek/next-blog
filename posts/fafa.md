---
title: "リモート授業で１限に寝坊したのでzoomに自動参加するshell scriptを作る"
date: "2020-01-01"
---
おはようございます！

さっき起きて、リモート授業なのに寝坊して１限の授業が欠席になってしまいました〜！
テストが実施できない影響で平常点が重要らしいのに、、、

とにかくGPAが欲しいお年頃でなかなかつらいお気持ちになってしまったので、毎週定時に自動的にZOOMに参加できるようにしました。

MacのAutomatorを使うと標準のカレンダーで簡単にShellScriptを実行できるらしいけど、なぜか実行した瞬間にzoomが落ちてしまってよくわからなかったので、cronで実装しました。

terminalからcrontab -eで編集できます。

crontab -rでcron設定を全消去できるようにした人、一生恨んでいます

cronの記法がわからん時はツールを使いましょう

 

https://www.japan9.com/cgi/cron.cgi

 毎週金曜日朝8時50分に指定したzoomの部屋に入れるようにします。

50 8 * * 5 open -a /Applications/zoom.us.app/Contents/MacOS/zoom.us "zoomの招待url"
 

 

ちなみに、通常のリンクを踏んでブラウザからzoomを起動するときに出てくるポップアップ等は出てこないので完全に自動で参加できます


```javascript
import Layout from "../components/Layout";
import { getAllPostIds, getPostData } from "../lib/posts";
import Head from "next/head";

import styled from "styled-components";
import media from "styled-media-query";

const HeadingXl = styled.h1`
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
`;

const Article = styled.article`
    max-width: 48rem;

    ${media.lessThan("small")`
       word-break: break-all;
`}
`;

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <Article>
                <HeadingXl>{postData.title}</HeadingXl>

                <div>{postData.date}</div>
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

```
