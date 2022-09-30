import { ContentClient } from 'dc-delivery-sdk-js'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const amplience = {
  fetchHomePage: async () => {
    const client = new ContentClient({
      hubName: publicRuntimeConfig.amplience.hubName,
    })

    const response = await client
      .filterByContentType(publicRuntimeConfig.amplience.homePageContentUrl)
      .request({
        format: 'inlined',
        depth: 'all',
      })
    return response?.responses?.[0]?.content
  },
}

export default amplience
