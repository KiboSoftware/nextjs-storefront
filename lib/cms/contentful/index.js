import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import getHomePageQuery from './home-page-query'
import getProductDetails from './product-details-query'

const { publicRuntimeConfig } = getConfig()

const URL = publicRuntimeConfig.contentful.URL
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
}

const contentful = {
  fetchHomePage: async ({ preview }) => {
    const accessToken = preview
      ? publicRuntimeConfig.contentful.previewAccessToken
      : publicRuntimeConfig.contentful.accessToken
    options.headers.authorization = `Bearer ${accessToken}`

    const response = await fetch(URL, {
      ...options,
      body: JSON.stringify({
        query: getHomePageQuery(),
        variables: { preview },
      }),
    })
    const res = response.json()
    return res
  },

  fetchProductDetails: async ({ preview, productCode }) => {
    const accessToken = preview
      ? publicRuntimeConfig.contentful.previewAccessToken
      : publicRuntimeConfig.contentful.accessToken
    options.headers.authorization = `Bearer ${accessToken}`
    const response = await fetch(URL, {
      ...options,
      body: JSON.stringify({
        query: getProductDetails(productCode),
        variables: { preview },
      }),
    })

    return response.json()
  },
}

export default contentful
