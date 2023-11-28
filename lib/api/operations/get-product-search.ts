import { NextApiRequest } from 'next'

import { getAdditionalHeader } from '../util'
import { fetcher } from '@/lib/api/util'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchParams } from '@/lib/helpers'
import { CategorySearchParams } from '@/lib/types'

export default async function search(searchParams: CategorySearchParams, req?: NextApiRequest) {
  try {
    const variables = buildProductSearchParams(searchParams)

    const headers = req ? getAdditionalHeader(req) : {}

    return await fetcher({ query: searchProductsQuery, variables }, { headers })
  } catch (error) {
    console.error(error)
  }
}
