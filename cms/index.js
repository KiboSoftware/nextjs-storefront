import { ContentClient } from 'dc-delivery-sdk-js'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const client = new ContentClient({
  hubName: publicRuntimeConfig.amplience.hubName,
})

const amplience = {
  fetchHomePage: async () => {
    const response = await client
      .filterByContentType(publicRuntimeConfig.amplience.homePageContentUrl)
      .request(publicRuntimeConfig.amplience.requestParams)
    return response?.responses?.[0]?.content
  },
  fetchProductDetails: async (productCode) => {
    const response = await client
      .filterByContentType(publicRuntimeConfig.amplience.productDetailsPageContentUrl)
      .filterBy('/productCode', productCode)
      .request(publicRuntimeConfig.amplience.requestParams)

    return response?.responses?.[0]?.content
  },
}

export default amplience
