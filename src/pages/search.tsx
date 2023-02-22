import { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { ProductListingTemplate } from '@/components/page-templates'
import { useProductSearchQueries } from '@/hooks'
import { productSearch } from '@/lib/api/operations'
import { facetGetters, productSearchGetters } from '@/lib/getters'
import type { CategorySearchParams } from '@/lib/types'

import type { Facet, FacetValue, Product, ProductSearchResult } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next'

interface SearchPageType {
  results: ProductSearchResult
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await productSearch(context.query as unknown as CategorySearchParams)
  const { locale, res } = context

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  return {
    props: {
      results: response?.data?.products || [],
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const SearchPage: NextPage<SearchPageType> = (props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()

  const [searchParams, setSearchParams] = useState<CategorySearchParams>(
    router.query as unknown as CategorySearchParams
  )

  const { data: searchPageResults, isFetching } = useProductSearchQueries(
    searchParams,
    props.results
  )

  const breadcrumbs = [{ text: 'Home', link: '/' }]
  const searchPageHeading = router?.query?.search
    ? t('search-results', {
        m: `${searchPageResults?.totalCount}`,
        n: `"${router?.query?.search}"`,
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
    router.push(
      {
        pathname: router?.pathname,
        query: {
          ...router.query,
          sort,
        },
      },
      undefined,
      { scroll: false }
    )
  }

  const changePagination = () => {
    const pageSize = searchPageResults?.pageSize + publicRuntimeConfig.productListing.pageSize
    router.push(
      {
        pathname: router?.pathname,
        query: {
          ...router.query,
          pageSize,
        },
      },
      undefined,
      { scroll: false }
    )
  }

  useEffect(() => {
    setSearchParams(router.query as unknown as CategorySearchParams)
  }, [router.query])
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
