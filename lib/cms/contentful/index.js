import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import getContentfulQuery from './query'

const { publicRuntimeConfig } = getConfig()

const accessToken = publicRuntimeConfig.contentful.accessToken
const spaceId = publicRuntimeConfig.contentful.spaceId
const homePageId = publicRuntimeConfig.contentful.homePageId
const query = getContentfulQuery(homePageId)

const contentful = {
  fetchContent: async () => {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query,
        }),
      }
    )

    return await response.json()
  },
}

export default contentful
