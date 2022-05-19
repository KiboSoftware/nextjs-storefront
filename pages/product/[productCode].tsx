import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import nextI18NextConfig from '../../next-i18next.config'
import { ProductDetailTemplate } from '@/components/page-templates'
import getProduct from '@/lib/api/operations/get-product'
import search from '@/lib/api/operations/get-product-search'
import { productGetters } from '@/lib/getters'

import type { NextPage, GetStaticPropsContext } from 'next'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context
  const { productCode } = params as any
  const product = await getProduct(productCode)
  const { locale } = context
  return {
    props: {
      product,
      ...(await serverSideTranslations(locale as string, ['common', 'product'], nextI18NextConfig)),
    },
    revalidate: 60,
  }
}
export async function getStaticPaths() {
  const searchResponse = await search({ pageSize: 100 })
  const { items } = searchResponse.data.products
  const paths: string[] = []
  items.length &&
    items?.map((item: { productCode: string }) => paths.push(`/product/${item.productCode}`))
  return { paths, fallback: true }
}

const ProductDetailPage: NextPage = ({ product }: any) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <>Fallback</>
  }

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []
  return (
    <>
      <ProductDetailTemplate product={product} breadcrumbs={breadcrumbs} />
    </>
  )
}

export default ProductDetailPage
