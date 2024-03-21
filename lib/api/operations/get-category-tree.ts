import { NextApiRequest, PreviewData } from 'next'
import getConfig from 'next/config'

import { getAdditionalHeader } from '../util'
import { fetcher } from '@/lib/api/util'
import cache from '@/lib/api/util/cache'
import { getCategoryTreeQuery } from '@/lib/gql/queries'

const { serverRuntimeConfig } = getConfig()
const cacheKey = serverRuntimeConfig.cacheKey
const cacheTimeOut = serverRuntimeConfig.cacheTimeOut

export default async function getCategoryTree({
  req,
  previewData,
}: {
  req?: NextApiRequest
  previewData?: PreviewData
}) {
  try {
    // const cachedItems = cache.get(cacheKey)
    // console.log("cached Items", cachedItems, !(previewData as any)?.siteId )
    // if (cachedItems && !(previewData as any)?.siteId) return cachedItems // if preview is true, data should not be cached

    const headers = req
      ? getAdditionalHeader(req)
      : previewData
      ? { 'X-Vol-Site': (previewData as any)?.siteId }
      : {}

    const response = await fetcher({ query: getCategoryTreeQuery, variables: {} }, { headers })
    const items = response?.data?.categoriesTree?.items
    if (items.length) {
      cache.set(cacheKey, items, cacheTimeOut)
    }

    return items
  } catch (error) {
    console.log(error)
  }
}
