import type { IAuth, IListings } from './interfaces'
import { readFileSync, writeFileSync } from 'node:fs'

import path from 'node:path'

import process from 'node:process'
import axios from 'axios'

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      REDDIT_CLIENT_ID: string
      REDDIT_SECRET: string
    }
  }
}

async function main() {
  const readmeTemplate = readFileSync(
    path.join(process.cwd(), './README.template.md'),
  ).toString('utf-8')

  const authResponse = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    new URLSearchParams({ grant_type: 'client_credentials', scope: 'read' }),
    {
      auth: {
        username: process.env.REDDIT_CLIENT_ID,
        password: process.env.REDDIT_SECRET,
      },
    },
  )
  const authData = authResponse.data as IAuth

  const accessToken = authData.access_token
  const topPostsResponse = await axios.get(
    'https://oauth.reddit.com/r/ProgrammerHumor/top/.json?t=day',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  const topPosts = topPostsResponse.data as IListings

  const posts = topPosts.data.children.map(({ data }) => data)
  const postsWithImages = posts.filter(
    ({ url }) => url.includes('.jpg') || url.includes('.png'),
  )

  const topPost = postsWithImages.reduce((a, b) => (a.score > b.score ? a : b))
  const topPostImage = topPost.url
  const topPostTitle = topPost.title
  const topPostPermalink = topPost.permalink

  const readme = readmeTemplate
    .replace(/\{templ_title\}/g, topPostTitle)
    .replace(/\{templ_image\}/g, topPostImage)
    .replace(/\{templ_permalink\}/g, topPostPermalink)

  writeFileSync('README.md', readme)
}

main()
