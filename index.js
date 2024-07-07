import fs from "fs/promises";
import path from "path";


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const auth = await (await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
    })).json();

    const accessToken = auth.access_token;

    const topPosts = await (
        await fetch("https://oauth.reddit.com/r/ProgrammerHumor/top/.json?t=day", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    ).json();

    const posts = topPosts.data.children.map(({ data }) => data);
    const postsWithImages = posts.filter(({ url }) => url.includes(".jpg") || url.includes(".png"));
    
    const topPost = postsWithImages.reduce((a, b) => a.score > b.score ? a : b);
    const topPostImage = topPost.url;
    const topPostTitle = topPost.title;
    const topPostPermalink = topPost.permalink;

    const readme = readmeTemplate
        .replace(/{templ_title}/g, topPostTitle)
        .replace(/{templ_image}/g, topPostImage)
        .replace(/{templ_permalink}/g, topPostPermalink);

    await fs.writeFile("README.md", readme);
}

main();