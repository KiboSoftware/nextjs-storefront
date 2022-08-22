import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import nextI18NextConfig from '../../next-i18next.config'
import { ProductDetailTemplate } from '@/components/page-templates'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import getProduct from '@/lib/api/operations/get-product'
import search from '@/lib/api/operations/get-product-search'
import { productGetters } from '@/lib/getters'
import { getPage } from '@/lib/operations/get-page'
import type { CategorySearchParams } from '@/lib/types'

import type { CategoryCollection } from '@/lib/gql/types'
import type { NextPage, GetStaticPropsContext } from 'next'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params, locale } = context
  const { productCode } = params as any
  const { serverRuntimeConfig } = getConfig()
  const result = await getPage({ contentTypeUid: 'product_detail', entryUrl: productCode })
  const response =
    result?.components?.length > 0 ? await search({ productCodes: result?.components }) : []

  const product = await getProduct(productCode)
  const categoriesTree: CategoryCollection = await getCategoryTree()
  return {
    props: {
      product,
      categoriesTree,
      recomendationProducts: response?.data?.products?.items || [],
      ...(await serverSideTranslations(locale as string, ['common', 'product'], nextI18NextConfig)),
    },
    revalidate: serverRuntimeConfig.revalidate,
  }
}

export async function getStaticPaths() {
  const { serverRuntimeConfig } = getConfig()
  const searchResponse = await search({
    pageSize: serverRuntimeConfig.pageSize,
  } as CategorySearchParams)
  const { items } = searchResponse.data.products
  const paths: string[] = []
  items.length &&
    items?.map((item: { productCode: string }) => paths.push(`/product/${item.productCode}`))
  return { paths, fallback: true }
}

const ProductDetailPage: NextPage = (props: any) => {
  const { product, recomendationProducts } = props
  const { isFallback } = useRouter()

  if (isFallback) {
    return <>Fallback</>
  }

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []
  return (
    <>
      <ProductDetailTemplate
        product={product}
        breadcrumbs={breadcrumbs}
        recommendationProducts={recomendationProducts}
      />
    </>
  )
}

export default ProductDetailPage
