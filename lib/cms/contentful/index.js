import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import getContentfulQuery from './query'

const { publicRuntimeConfig } = getConfig()

const accessToken = publicRuntimeConfig.contentful.contentful_access_token
const spaceId = publicRuntimeConfig.contentful.contentful_space_id
const homePageId = publicRuntimeConfig.contentful.contentful_home_page_id
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
