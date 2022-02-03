import vercelFetch from '@vercel/fetch'
const fetch = vercelFetch()
const graphUrl = `https://${process.env.KIBO_API_HOST}/graphql`
const authHost = `https://${process.env.KIBO_AUTH_HOST}`

const testToken = process.env.TEST_API_TOKEN

const fetcher = async ({ query, variables }: any) => {
  const response = await fetch(graphUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${testToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  return await response.json()
}
export default fetcher
