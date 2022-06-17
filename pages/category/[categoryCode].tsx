import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { ProductListingTemplate } from '@/components/page-templates'
import { productSearch, categoryTreeSearchByCode } from '@/lib/api/operations'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { productSearchGetters, facetGetters } from '@/lib/getters'

import type { Maybe, PrCategory } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const response = await productSearch(context.query)
  const categoriesTree: Maybe<Maybe<PrCategory>[]> | undefined = await getCategoryTree()
  const categoryTreeByCodeResponse = await categoryTreeSearchByCode(context.query)

  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      categoryTreeByCodeResults: categoryTreeByCodeResponse,
      ...(await serverSideTranslations(locale as string, ['product', 'common'])),
    },
  }
}

const CategoryPage: NextPage = (props: any) => {
  const router = useRouter()

  const { categoryCode } = router.query
  const breadcrumbs = facetGetters.getBreadcrumbs(props.categoryTreeByCodeResults)

  const sortingValues = [
    {
      value: 'Default',
      id: '',
      selected: false,
    },
    {
      value: 'Price: Low to High',
      id: 'price asc',
      selected: false,
    },
    {
      value: 'Price: High to Low',
      id: 'price desc',
      selected: false,
    },
    {
      value: 'Latest',
      id: 'createDate desc',
      selected: false,
    },
    {
      value: 'Oldest',
      id: 'createDate asc',
      selected: false,
    },
  ]

  const facetList = props?.results?.facets
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
        products={props.results?.items}
        totalResults={props.results?.totalCount}
        breadCrumbsList={breadcrumbs}
        isLoading={false}
        onSortingSelection={changeSorting}
      />
    </>
  )
}

export default CategoryPage
