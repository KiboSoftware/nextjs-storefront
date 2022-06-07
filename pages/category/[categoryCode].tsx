import { useEffect } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { ProductListingTemplate } from '@/components/page-templates'
import { productSearch } from '@/lib/api/operations'
import getCategoryTree from '@/lib/api/operations/get-category-tree'

import type { CategoryCollection } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const response = await productSearch(context.query)
  const categoriesTree: CategoryCollection = await getCategoryTree()

  return {
    props: {
      results: response?.data?.products || [],
      categoriesTree,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const CategoryPage: NextPage = (props: any) => {
  const { categoriesTree, onLoadCategoriesTree } = props
  const router = useRouter()
  const query = router.asPath.split('?')[1]

  const performSearch = async () => {
    const response = await fetch(`/api/search?${query}`)
    const responseData = await response.json()
    return responseData.results
  }

  const { data } = useQuery('searchResults', performSearch, { initialData: props.results || [] })

  useEffect(() => {
    onLoadCategoriesTree(categoriesTree)
  }, [categoriesTree, onLoadCategoriesTree])

  return (
    <>
      <h1>Search</h1>
      <ProductListingTemplate {...data} />
    </>
  )
}

export default CategoryPage
