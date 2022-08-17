import { useEffect, useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { ProductListingTemplate } from '@/components/page-templates'
import { useProductSearch } from '@/hooks'
import { productSearch, categoryTreeSearchByCode } from '@/lib/api/operations'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { productSearchGetters, facetGetters } from '@/lib/getters'
import type { CategorySearchParams } from '@/lib/types'
import nextI18NextConfig from '@/next-i18next.config'

import type { PrCategory, ProductSearchResult, Facet, Product, FacetValue } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next'

interface CategoryPageType {
  results: ProductSearchResult
  categoriesTree?: PrCategory[]
  category: { categories: PrCategory[] }
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, res } = context
  const response = await productSearch(context.query as unknown as CategorySearchParams)
  const categoriesTree = await getCategoryTree()
  const category = await categoryTreeSearchByCode(context.query)

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      category,
      ...(await serverSideTranslations(locale as string, ['product', 'common'], nextI18NextConfig)),
    },
  }
}

const CategoryPage: NextPage<CategoryPageType> = (props) => {
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()

  const { categoryCode } = router.query
  const [searchParams, setSearchParams] = useState<CategorySearchParams>(
    router.query as unknown as CategorySearchParams
  )
  const { data: productSearchResult, isFetching } = useProductSearch(searchParams, props.results)
  const breadcrumbs = facetGetters.getBreadcrumbs(props.category)

  const facetList = productSearchResult?.facets as Facet[]
  const products = productSearchResult?.items as Product[]
  const categoryFacet = productSearchGetters.getCategoryFacet(productSearchResult, categoryCode)
  const appliedFilters = facetGetters.getSelectedFacets(productSearchResult?.facets as Facet[])
  const categoryPageHeading = categoryFacet.header
    ? categoryFacet.header
    : breadcrumbs[breadcrumbs.length - 1].text
  const sortingValues = facetGetters.getSortOptions(
    {
      ...productSearchResult,
      input: { sort: router.query?.sort as string },
    },
    publicRuntimeConfig.productListing.sortOptions
  )

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
    const pageSize = productSearchResult?.pageSize + publicRuntimeConfig.productListing.pageSize
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
        productListingHeader={categoryPageHeading as string}
        categoryFacet={categoryFacet}
        facetList={facetList}
        sortingValues={sortingValues}
        products={products}
        totalResults={productSearchResult?.totalCount}
        pageSize={productSearchResult?.pageSize}
        breadCrumbsList={breadcrumbs}
        isLoading={isFetching}
        appliedFilters={appliedFilters as FacetValue[]}
        onSortItemSelection={changeSorting}
        onPaginationChange={changePagination}
      />
    </>
  )
}

export default CategoryPage
