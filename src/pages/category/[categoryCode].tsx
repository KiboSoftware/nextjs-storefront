import { useEffect, useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { ProductListingTemplate } from '@/components/page-templates'
import { useProductSearchQueries } from '@/hooks'
import { productSearch, categoryTreeSearchByCode } from '@/lib/api/operations'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { productSearchGetters, facetGetters } from '@/lib/getters'
import type { CategorySearchParams, CategoryTreeResponse } from '@/lib/types'

import type { PrCategory, ProductSearchResult, Facet, Product, FacetValue } from '@/lib/gql/types'
import type { NextPage } from 'next'

interface CategoryPageType {
  results: ProductSearchResult
  categoriesTree?: PrCategory[]
  category: { categories: PrCategory[] }
}

export async function getStaticPaths() {
  const walk = (category: any, categoryCodes: string[] = []) => {
    if (category.isDisplayed) {
      categoryCodes.push(category.categoryCode)
    }
    const { childrenCategories = [] } = category
    for (const child of childrenCategories) {
      walk(child, categoryCodes)
    }
    return categoryCodes
  }

  const categoriesTree: CategoryTreeResponse = await getCategoryTree()
  const getAllCategoryCodes = (categoryTree: any) => categoryTree.flatMap((c: any) => walk(c))
  const paths = getAllCategoryCodes(categoriesTree).map((code: string) => `/category/${code}`)
  return { paths, fallback: true }
}

export const getStaticProps: any = async (context: any) => {
  const { locale } = context
  const response = await productSearch(context.params as unknown as CategorySearchParams)

  const categoriesTree: CategoryTreeResponse = await getCategoryTree()
  const category = await categoryTreeSearchByCode(context.params)

  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      category,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
    revalidate: 60,
  }
}

const CategoryPage: NextPage<CategoryPageType> = (props: any) => {
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()

  const { categoryCode } = router.query
  const [searchParams, setSearchParams] = useState<CategorySearchParams>(
    router.query as unknown as CategorySearchParams
  )
  const { data: productSearchResult, isFetching } = useProductSearchQueries(
    searchParams,
    props.results
  )
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
  )
}

export default CategoryPage
