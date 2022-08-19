import getConfig from 'next/config'

import { fetcher } from '@/lib/api/util'
import cache from '@/lib/api/util/cache'
import { getCategoryTreeQuery } from '@/lib/gql/queries'

const { serverRuntimeConfig } = getConfig()
const key = serverRuntimeConfig.cacheKey
const timeOut = serverRuntimeConfig.cacheTimeOut

export default async function getCategoryTree() {
  try {
    const cachedItems = cache.get(key)
    if (cachedItems) return cachedItems

    if (!cachedItems) {
      const response = await fetcher({ query: getCategoryTreeQuery, variables: {} }, null)
      cache.set(key, response, timeOut)

      return response
    }
  } catch (error) {
    console.log(error)
  }
}
