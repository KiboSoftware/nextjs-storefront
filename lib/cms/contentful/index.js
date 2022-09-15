import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import getHomePageQuery from './home-page-query'
import getProductDetails from './product-details-query'

const { publicRuntimeConfig } = getConfig()

const accessToken = publicRuntimeConfig.contentful.accessToken
const spaceId = publicRuntimeConfig.contentful.spaceId

const URL = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${accessToken}`,
  },
}

const contentful = {
  fetchHomePage: async () => {
    const response = await fetch(URL, {
      ...options,
      body: JSON.stringify({
        query: getHomePageQuery(),
      }),
    })

    return await response.json()
  },

  fetchProductDetails: async (productCode) => {
    const response = await fetch(URL, {
      ...options,
      body: JSON.stringify({
        query: getProductDetails(productCode),
      }),
    })

    return await response.json()
  },
}

export default contentful
