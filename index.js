require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const topPosts = await (
        await fetch("https://www.reddit.com/r/ProgrammerHumor/top/.json")
    ).json();

    const posts = topPosts.data.children.map(({ data }) => data);
    const postsWithImages = posts.filter(({ url }) => url.includes(".jpg") || url.includes(".png"));
    
    const topPost = postsWithImages.reduce((a, b) => a.score > b.score ? a : b);
    const topPostImage = topPost.url;
    const topPostTitle = topPost.title;

    const readme = readmeTemplate
        .replace(/{templ_title}/g, topPostTitle)
        .replace(/{templ_image}/g, topPostImage);

    await fs.writeFile("README.md", readme);
}

main();