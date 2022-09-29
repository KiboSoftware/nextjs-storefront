import { fetcher } from '@/lib/api/util'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchParams } from '@/lib/helpers'
import { CategorySearchParams } from '@/lib/types'

export default async function search(searchParams: CategorySearchParams) {
  try {
    const variables = buildProductSearchParams(searchParams)
    return await fetcher({ query: searchProductsQuery, variables }, null)
  } catch (error) {
    console.error(error)
  }
}
