import ContentstackLivePreview from '@contentstack/live-preview-utils'
import * as contentstack from 'contentstack'

const Stack = contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  region: 'us',
})

if (process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST) {
  Stack.setHost(process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST)
}

ContentstackLivePreview.init({
  stackSdk: Stack,
  clientUrlParams: {
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
  },
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
