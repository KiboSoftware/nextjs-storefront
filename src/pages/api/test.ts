import type { NextApiRequest, NextApiResponse } from 'next'

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      KIBO_API_HOST,
      VERCEL_GIT_REPO_SLUG,
      VERCEL_GIT_REPO_OWNER,
      VERCEL_GIT_REPO_ID,
      VERCEL_GIT_COMMIT_REF,
      VERCEL_GIT_COMMIT_SHA,
      VERCEL_GIT_COMMIT_MESSAGE,
      VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
      VERCEL_GIT_COMMIT_AUTHOR_NAME,
      VERCEL_GIT_PREVIOUS_SHA,
      VERCEL_GIT_PULL_REQUEST_ID,
    } = process.env
    res.send(
      JSON.stringify(
        {
          KIBO_API_HOST,
          VERCEL_GIT_REPO_SLUG,
          VERCEL_GIT_REPO_OWNER,
          VERCEL_GIT_REPO_ID,
          VERCEL_GIT_COMMIT_REF,
          VERCEL_GIT_COMMIT_SHA,
          VERCEL_GIT_COMMIT_MESSAGE,
          VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
          VERCEL_GIT_COMMIT_AUTHOR_NAME,
          VERCEL_GIT_PREVIOUS_SHA,
          VERCEL_GIT_PULL_REQUEST_ID,
        },
        null,
        2
      )
    )
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
