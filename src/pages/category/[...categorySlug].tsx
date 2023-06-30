import { useEffect, useRef, useState } from 'react'

import getConfig from 'next/config'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProductListingTemplate } from '@/components/page-templates'
import { useGetSearchedProducts } from '@/hooks'
import { getCategoryTree, productSearch } from '@/lib/api/operations'
import { productSearchGetters, facetGetters } from '@/lib/getters'
import { categoryTreeSearchByCode } from '@/lib/helpers'
import type { CategorySearchParams } from '@/lib/types'

import type {
  PrCategory,
  ProductSearchResult,
  Facet,
  Product,
  FacetValue,
  Maybe,
} from '@/lib/gql/types'
import type { NextPage } from 'next'

interface CategoryPageType {
  results: ProductSearchResult
  categoriesTree?: PrCategory[]
  seoFriendlyUrl?: string
  categoryCode?: string
  metaInformation?: {
    metaTagTitle: string
    metaTagDescription: string
    metaTagKeywords: string
    canonical: string
  }
  category: { categories: PrCategory[] }
}

const walk = (category: Maybe<PrCategory>, categoryCodes: any[] = []) => {
  if (category?.isDisplayed) {
    categoryCodes.push({
      categoryCode: category.categoryCode,
      slug: category.content?.slug as string,
    })
  }
  const { childrenCategories = [] } = category as PrCategory
  if (childrenCategories) {
    for (const child of childrenCategories) {
      walk(child, categoryCodes)
    }
  }
  return categoryCodes
}

export async function getStaticPaths() {
  const categoriesTree = await getCategoryTree()

  const getAllCategoryCodes = (categoryTree: any) => categoryTree.flatMap((c: any) => walk(c))
  const paths = getAllCategoryCodes(categoriesTree).map((each: any) => {
    const urlSegment = each.slug
    const categoryCode = each.categoryCode
    if (urlSegment) {
      return `/category/${urlSegment}/${categoryCode}`
    }
    return `/category/${categoryCode}`
  })
  return { paths, fallback: true }
}

export const getStaticProps: any = async (context: any) => {
  const { locale, params, req } = context
  const { serverRuntimeConfig } = getConfig()
  const { categorySlug } = params
  if (!categorySlug?.length || categorySlug?.length > 2) {
    return { notFound: true }
  }
  const [_, categoryCode] =
    categorySlug?.length === 2 ? categorySlug : [null, categorySlug?.[0] || null]

  const response = await productSearch(
    {
      ...params,
      pageSize: parseInt(serverRuntimeConfig.pageSize),
      categoryCode,
    } as unknown as CategorySearchParams,
    req
  )

  const categoriesTree = await getCategoryTree(req)

  const categories = await categoryTreeSearchByCode({ categoryCode }, categoriesTree)

  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      category: categories,
      categoryCode,
      seoFriendlyUrl: categories?.seoFriendlyUrl,
      metaInformation: categories?.metaInformation,
      ...(await serverSideTranslations(locale as string, ['common'])),
    } as CategoryPageType,
    revalidate: 60,
  }
}

const CategoryPage: NextPage<CategoryPageType> = (props) => {
  const router = useRouter()
  const previousQueryRef = useRef(router.query)

  const slugArray = router?.query?.categorySlug ? router.query?.categorySlug : []
  const slug = slugArray[0]
  const code = slugArray?.length === 1 ? slugArray[0] : slugArray[1]

  if (slugArray.length > 1 && props.seoFriendlyUrl !== slug) {
    const correctPath = router.asPath.replace(`/${slug}/`, `/${props.seoFriendlyUrl}/`)
    router.replace(router.asPath, correctPath)
  }
  const { publicRuntimeConfig } = getConfig()
  const currentUrl = publicRuntimeConfig?.currentUrl
  const [searchParams, setSearchParams] = useState<CategorySearchParams>({
    categoryCode: props.categoryCode,
  } as unknown as CategorySearchParams)

  useEffect(() => {
    const hasQueryChanged =
      JSON.stringify(router.query) !== JSON.stringify(previousQueryRef.current)
    const hasCategoryChanged = code !== searchParams.categoryCode
    if (hasQueryChanged || hasCategoryChanged) {
      setSearchParams({
        categoryCode: code,
        ...router.query,
      } as unknown as CategorySearchParams)
    }
  }, [router.query, code])

  const {
    data: productSearchResult,
    isFetching,
    isError,
  } = useGetSearchedProducts(
    {
      ...searchParams,
      pageSize:
        searchParams.pageSize ??
        publicRuntimeConfig.productListing.pageSize ??
        publicRuntimeConfig.productListing.pageSize[0],
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
      <Head>
        <meta name="title" content={props?.metaInformation?.metaTagTitle} />
        <meta name="description" content={props?.metaInformation?.metaTagDescription} />
        <meta name="keywords" content={props?.metaInformation?.metaTagKeywords} />
        <link rel="canonical" href={`https://${currentUrl}${props?.metaInformation?.canonical}`} />
      </Head>
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
