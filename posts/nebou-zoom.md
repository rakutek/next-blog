---
title: "リモート授業で１限に寝坊したのでzoomに自動参加するshell scriptを作る"
date: "2020-01-01"
---
# おはようございます！

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
 

 

# ちなみに、通常のリンクを踏んでブラウザからzoomを起動するときに出てくるポップアップ等は出てこないので完全に自動で参加できます

```javascript

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

import hljs from "remark-highlight.js";

import "github-markdown-css";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/default.css";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .use(hljs)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

```
