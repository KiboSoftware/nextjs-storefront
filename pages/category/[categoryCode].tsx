import { useEffect, useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { ProductListingTemplate } from '@/components/page-templates'
import { useProductSearch } from '@/hooks/queries/useProductSearch/useProductSearch'
import { productSearch, categoryTreeSearchByCode } from '@/lib/api/operations'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { productSearchGetters, facetGetters } from '@/lib/getters'
import type { CategorySearchParams } from '@/lib/types'

import type { PrCategory, ProductSearchResult, Facet, Product, FacetValue } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext } from 'next'

interface CategoryPageType {
  results: ProductSearchResult
  categoriesTree?: PrCategory[]
  category: { categories: PrCategory[] }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const response = await productSearch(context.query as unknown as CategorySearchParams)
  const categoriesTree = await getCategoryTree()
  const category = await categoryTreeSearchByCode(context.query)

  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      category,
      ...(await serverSideTranslations(locale as string, ['product', 'common'])),
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
  const sortingValues = publicRuntimeConfig.productListing.sortOptions

  const facetList = productSearchResult?.facets as Facet[]
  const products = productSearchResult?.items as Product[]
  const categoryFacet = productSearchGetters.getCategoryFacet(productSearchResult, categoryCode)
  const appliedFilters = facetGetters.getSelectedFacets(productSearchResult?.facets as Facet[])
  const changeSorting = () => {
    console.log('change sorting called')
  }

  useEffect(() => {
    setSearchParams(router.query as unknown as CategorySearchParams)
  }, [router.query])
  return (
    <>
      <ProductListingTemplate
        categoryFacet={categoryFacet}
        facetList={facetList}
        sortingValues={sortingValues}
        products={products}
        totalResults={productSearchResult?.totalCount}
        breadCrumbsList={breadcrumbs}
        isLoading={isFetching}
        appliedFilters={appliedFilters as FacetValue[]}
        onSortingSelection={changeSorting}
      />
    </>
  )
}

export default CategoryPage
