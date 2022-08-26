import getConfig from 'next/config'

import { fetcher } from '@/lib/api/util'
import cache from '@/lib/api/util/cache'
import { getCategoryTreeQuery } from '@/lib/gql/queries'

const { serverRuntimeConfig } = getConfig()
const cacheKey = serverRuntimeConfig.cacheKey
const cacheTimeOut = serverRuntimeConfig.cacheTimeOut

export default async function getCategoryTree() {
  try {
    const cachedItems = cache.get(cacheKey)
    if (cachedItems) return cachedItems

    if (!cachedItems) {
      const response = await fetcher({ query: getCategoryTreeQuery, variables: {} }, null)
      const items = response.data.categoriesTree.items
      cache.set(cacheKey, items, cacheTimeOut)

      return items
    }
  } catch (error) {
    console.log(error)
  }
}
