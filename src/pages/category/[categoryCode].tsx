import { useEffect, useRef, useState } from 'react'

import getConfig from 'next/config'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProductListingTemplate } from '@/components/page-templates'
import { useGetSearchedProducts } from '@/hooks'
import { getCategoryTree, productSearch } from '@/lib/api/operations'
import { productSearchGetters, facetGetters } from '@/lib/getters'
import { categoryTreeSearchByCode, buildCategoryPath } from '@/lib/helpers'
import type { CategorySearchParams, MetaData, PageWithMetaData } from '@/lib/types'

import type {
  PrCategory,
  ProductSearchResult,
  Facet,
  Product,
  FacetValue,
  Maybe,
} from '@/lib/gql/types'
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next'

interface CategoryPageType extends PageWithMetaData {
  results: ProductSearchResult
  categoriesTree?: PrCategory[]
  seoFriendlyUrl?: string
  categoryCode?: string
  category: { categories: PrCategory[] }
}
function getMetaData(category: PrCategory): MetaData {
  return {
    title: category?.content?.metaTagTitle || null,
    description: category?.content?.metaTagDescription || null,
    keywords: category?.content?.metaTagKeywords || null,
    canonicalUrl: null,
    robots: null,
  }
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const categoriesTree = (await getCategoryTree()) || []
  const getCategoryPaths = (category: Maybe<PrCategory>, categoryPaths: any[] = []) => {
    if (category?.isDisplayed) {
      categoryPaths.push(buildCategoryPath(category))
    }
    const { childrenCategories = [] } = category as PrCategory
    if (childrenCategories) {
      for (const child of childrenCategories) {
        getCategoryPaths(child, categoryPaths)
      }
    }
    return categoryPaths
  }
  const { serverRuntimeConfig } = getConfig()
  const { staticPathsMaxSize } = serverRuntimeConfig?.pageConfig?.productListing || {}
  const maxPathsToGenerate = parseInt(staticPathsMaxSize)
  let paths = categoriesTree.flatMap((c: PrCategory) => getCategoryPaths(c, []))
  if (maxPathsToGenerate && paths.length > maxPathsToGenerate) {
    paths = paths.slice(0, maxPathsToGenerate)
  }
  return { paths, fallback: true }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<CategoryPageType>> {
  const { locale, params } = context
  const { publicRuntimeConfig } = getConfig()
  const { categoryCode } = params as { categoryCode: string }
  const categoriesTree = await getCategoryTree()
  const category = await categoryTreeSearchByCode({ categoryCode }, categoriesTree)
  if (!category) {
    return { notFound: true }
  }
  const pageSize = publicRuntimeConfig.productListing.pageSize
  const response = await productSearch({
    pageSize,
    categoryCode,
    ...params,
  } as unknown as CategorySearchParams)
  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      category: { categories: [category] },
      categoryCode,
      metaData: getMetaData(category),
      ...(await serverSideTranslations(locale as string, ['common'])),
    } as CategoryPageType,
    revalidate: 60,
  }
}

const CategoryPage: NextPage<CategoryPageType> = (props) => {
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()
  const code = props.categoryCode
  const [searchParams, setSearchParams] = useState<CategorySearchParams>({
    categoryCode: props.categoryCode,
  } as unknown as CategorySearchParams)

  useEffect(() => {
    setSearchParams({
      categoryCode: code,
      ...router.query,
    } as unknown as CategorySearchParams)
  }, [router.query, code])

  const {
    data: productSearchResult,
    isFetching,
    isError,
  } = useGetSearchedProducts(
    {
      ...searchParams,
      pageSize: searchParams.pageSize || publicRuntimeConfig.productListing.pageSize,
    },
    props.results
  )

  if (isError) {
    return <ErrorPage statusCode={404} />
  }

  const breadcrumbs = facetGetters.getBreadcrumbs(props.category)

  const facetList = productSearchResult?.facets as Facet[]
  const products = productSearchResult?.items as Product[]

  const categoryFacet = productSearchGetters.getCategoryFacet(
    productSearchResult,
    props.categoryCode
  )
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
          categoryCode: code,
          ...router.query,
          sort,
        },
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  // For using Pagination, use this
  // const changePagination = (value: any) => {
  //   router.push(
  //     {
  //       pathname: router?.pathname,
  //       query: {
  //         categoryCode: code,
  //         ...router.query,
  //         ...value,
  //       },
  //     },
  //     undefined
  //   )
  // }

  // When InfiniteScroll is needed, use this.
  const handleInfiniteScroll = () => {
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
      { scroll: false, shallow: true }
    )
  }

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
        pageCount={productSearchResult?.pageCount}
        startIndex={productSearchResult?.startIndex}
        breadCrumbsList={breadcrumbs}
        isLoading={isFetching}
        appliedFilters={appliedFilters as FacetValue[]}
        onSortItemSelection={changeSorting}
        // onPaginationChange={changePagination}
        onInfiniteScroll={handleInfiniteScroll}
      />
    </>
  )
}

export default CategoryPage
