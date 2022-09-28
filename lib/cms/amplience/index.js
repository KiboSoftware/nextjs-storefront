import { ContentClient } from 'dc-delivery-sdk-js'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const amplience = {
  fetchHomePage: async () => {
    const client = new ContentClient({
      hubName: publicRuntimeConfig.amplience.hubName,
    })

    const slotId = publicRuntimeConfig.amplience.homePageContentId
    return await client
      .getContentItemById(slotId)
      .then((content) => content.body)
      .catch((error) => console.log('content not found', error))
  },
}

export default amplience
