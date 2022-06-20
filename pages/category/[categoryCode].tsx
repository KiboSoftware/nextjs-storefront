import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { ProductListingTemplate } from '@/components/page-templates'
import { productSearch, categoryTreeSearchByCode } from '@/lib/api/operations'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { productSearchGetters, facetGetters } from '@/lib/getters'

import type { PrCategory, ProductSearchResult, Facet, Product } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext } from 'next'

interface CategoryPageType {
  results: ProductSearchResult
  categoriesTree?: PrCategory[]
  category: { categories: PrCategory[] }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const response = await productSearch(context.query)
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
  const breadcrumbs = facetGetters.getBreadcrumbs(props.category)
  const sortingValues = publicRuntimeConfig.productListing.sortOptions

  const facetList = props?.results?.facets as Facet[]
  const products = props.results?.items as Product[]
  const categoryFacet = productSearchGetters.getCategoryFacet(props?.results, categoryCode)
  const changeSorting = () => {
    console.log('change sorting called')
  }
  return (
    <>
      <ProductListingTemplate
        categoryFacet={categoryFacet}
        facetList={facetList}
        sortingValues={sortingValues}
        products={products}
        totalResults={props.results?.totalCount}
        breadCrumbsList={breadcrumbs}
        isLoading={false}
        onSortingSelection={changeSorting}
      />
    </>
  )
}

export default CategoryPage
