import { ContentClient } from 'dc-delivery-sdk-js'

const amplience = {
  fetchHomePage: async () => {
    const client = new ContentClient({
      hubName: 'kibo',
    })

    const slotId = 'c79e66ce-6de5-44e3-b87e-6cdf5601c817'
    const response = await client
      .getContentItemById(slotId)
      .then((content) => {
        return content.body
      })
      .catch((error) => {
        console.log('content not found', error)
      })
    return response
  },
}

export default amplience
