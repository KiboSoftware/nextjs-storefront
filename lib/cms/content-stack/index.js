import ContentstackLivePreview from '@contentstack/live-preview-utils'
import Contentstack from 'contentstack'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const Stack = Contentstack.Stack({
  api_key: publicRuntimeConfig.contentstack.apiKey,
  delivery_token: publicRuntimeConfig.contentstack.deliveryToken,
  environment: publicRuntimeConfig.contentstack.environment,
  region: 'us',
  live_preview: {
    management_token: publicRuntimeConfig.contentstack.managementToken,
    enable: true,
    host: publicRuntimeConfig.contentstack.apiHost,
  },
})

if (publicRuntimeConfig.contentstack.apiHost) {
  Stack.setHost(publicRuntimeConfig.contentstack.apiHost)
}

ContentstackLivePreview.init({
  stackSdk: Stack,
  ssr: false,
})

export const { onEntryChange } = ContentstackLivePreview

const renderOption = {
  span: (node, next) => next(node.children),
}
export default {
  getEntry({ contentTypeUid, entryUrl, referenceFieldPath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query()
      if (referenceFieldPath) query.includeReference(referenceFieldPath)
      if (!entryUrl) {
        query
          .includeOwner()
          .toJSON()
          .find()
          .then(
            (result) => {
              resolve(result)
            },
            (error) => {
              reject(error)
            }
          )
      } else {
        query.includeOwner().toJSON()
        const data = query.where('title', `${entryUrl}`).find()
        data.then(
          (result) => {
            resolve(result)
          },
          (error) => {
            console.error(error)
            reject(error)
          }
        )
      }
    })
  },
}
