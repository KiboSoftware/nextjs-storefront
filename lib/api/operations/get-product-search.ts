import { fetcher } from '@/lib/api/util'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchInput } from '@/lib/helpers/buildProductSearchInput'

interface SearchParams {
  categoryCode: string
  pageSize: number
  filters: Array<string>
  startIndex: number
  sort: string
  search: string
  filter: string
}

export default async function search(searchParams: SearchParams) {
  try {
    const variables = buildProductSearchInput(searchParams)
    return await fetcher({ query: searchProductsQuery, variables })
  } catch (error) {
    console.error(error)
  }
}
