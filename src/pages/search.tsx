import { useEffect, useState } from 'react'

import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProductListingTemplate } from '@/components/page-templates'
import { useGetSearchedProducts } from '@/hooks'
import { productSearch } from '@/lib/api/operations'
import { facetGetters, productSearchGetters } from '@/lib/getters'
import type { CategorySearchParams, MetaData, PageWithMetaData } from '@/lib/types'

import type { Facet, FacetValue, Product, ProductSearchResult } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, GetServerSideProps, NextApiRequest } from 'next'

interface SearchPageType extends PageWithMetaData {
  results: ProductSearchResult
}

function getMetaData(): MetaData {
  return {
    title: 'Search Results',
    description: null,
    keywords: null,
    canonicalUrl: null,
    robots: 'noindex,nofollow',
  }
}
const { publicRuntimeConfig } = getConfig()

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await productSearch(
    {
      pageSize: publicRuntimeConfig.productListing.pageSize,
      ...context.query,
    } as CategorySearchParams,
    context.req as NextApiRequest
  )
  const { locale, res } = context

  return {
    props: {
      results: response?.data?.products || [],
      metaData: getMetaData(),
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const SearchPage: NextPage<SearchPageType> = (props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [searchParams, setSearchParams] = useState<CategorySearchParams>(
    router.query as unknown as CategorySearchParams
  )

  const { data: searchPageResults, isFetching } = useGetSearchedProducts(
    {
      ...searchParams,
      pageSize: searchParams.pageSize || publicRuntimeConfig.productListing.pageSize,
    },
    props.results
  )

  const breadcrumbs = [{ text: 'Home', link: '/' }]
  const searchPageHeading = router?.query?.search
    ? t('search-results', {
        m: `${searchPageResults?.totalCount || 0}`,
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
      { scroll: false, shallow: true }
    )
  }

  const changePagination = (value: any) => {
    router.push({
      pathname: router?.pathname,
      query: {
        ...router.query,
        ...value,
      },
    })
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
        pageCount={searchPageResults?.pageCount}
        startIndex={searchPageResults?.startIndex}
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
