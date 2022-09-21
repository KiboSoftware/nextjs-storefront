import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import getHomePageQuery from './home-page-query'
import getProductDetails from './product-details-query'

const { publicRuntimeConfig } = getConfig()

const accessToken = publicRuntimeConfig.contentful.accessToken

const URL = publicRuntimeConfig.contentful.URL
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

    return response.json()
  },

  fetchProductDetails: async (productCode) => {
    const response = await fetch(URL, {
      ...options,
      body: JSON.stringify({
        query: getProductDetails(productCode),
      }),
    })

    return response.json()
  },
}

export default contentful
