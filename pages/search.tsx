import { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { ProductListingTemplate } from '@/components/page-templates'
import { categoryTreeSearchByCode, productSearch, getCategoryTree } from '@/lib/api/operations'
import { facetGetters, productSearchGetters } from '@/lib/getters'
import { productSearchResultKeys } from '@/lib/react-query/queryKeys'
import type { CategorySearchParams } from '@/lib/types'

import type { Facet, FacetValue, PrCategory, Product, ProductSearchResult } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next'

interface SearchPageType {
  results: ProductSearchResult
  categoriesTree?: PrCategory[]
  category: { categories: PrCategory[] }
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await productSearch(context.query as unknown as CategorySearchParams)
  const categoriesTree = await getCategoryTree()
  const category = await categoryTreeSearchByCode(context.query)
  const { locale, res } = context

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      category,
      ...(await serverSideTranslations(locale as string, ['product', 'common'])),
    },
  }
}

const SearchPage: NextPage<SearchPageType> = (props) => {
  const { t } = useTranslation('product')
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()

  const [searchParams, setSearchParams] = useState<string>(router.asPath.split('?')[1])

  const performSearch = async () => {
    const response = await fetch(`/api/search?${searchParams}`)
    const responseData = await response.json()
    return responseData.results
  }
  const { data: searchPageResults, isFetching } = useQuery(
    productSearchResultKeys.searchParams(searchParams),
    performSearch,
    { initialData: props.results || [], refetchOnWindowFocus: false }
  )
  const breadcrumbs = facetGetters.getBreadcrumbs(props.category)
  const searchPageHeading = router?.query?.search
    ? t('search-results', {
        m: `${searchPageResults?.totalCount}`,
        n: `'${router?.query?.search}'`,
      })
    : breadcrumbs[breadcrumbs.length - 1].text

  const facetList = searchPageResults?.facets as Facet[]
  const products = searchPageResults?.items as Product[]
  const appliedFilters = facetGetters.getSelectedFacets(searchPageResults?.facets as Facet[])
  const sortingValues = facetGetters.getSortOptions(
    {
      ...searchPageResults,
      input: { sort: router.query?.sort as string },
    },
    publicRuntimeConfig.productListing.sortOptions
  )
  const categoryFacet = productSearchGetters.getCategoryFacet(searchPageResults, '')

  const changeSorting = (sort: string) => {
    router.push({
      pathname: router?.pathname,
      query: {
        ...router.query,
        sort,
      },
    })
  }

  const changePagination = () => {
    const pageSize = searchPageResults?.pageSize + publicRuntimeConfig.productListing.pageSize
    router.push({
      pathname: router?.pathname,
      query: {
        ...router.query,
        pageSize,
      },
    })
  }

  useEffect(() => {
    setSearchParams(router.asPath.split('?')[1])
  }, [router.asPath.split('?')[1]])
  return (
    <>
      <ProductListingTemplate
        productListingHeader={searchPageHeading as string}
        categoryFacet={categoryFacet}
        facetList={facetList}
        sortingValues={sortingValues}
        products={products}
        totalResults={searchPageResults?.totalCount}
        pageSize={searchPageResults?.pageSize}
        breadCrumbsList={breadcrumbs}
        isLoading={isFetching}
        appliedFilters={appliedFilters as FacetValue[]}
        onSortItemSelection={changeSorting}
        onPaginationChange={changePagination}
      />
    </>
  )
}

export default SearchPage
