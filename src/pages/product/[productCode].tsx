import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProductDetailTemplate, ProductDetailSkeleton } from '@/components/page-templates'
import { useGetProduct } from '@/hooks'
import { getProduct, getCategoryTree, productSearch } from '@/lib/api/operations'
import { productGetters } from '@/lib/getters'
import { buildProductPath } from '@/lib/helpers'
import type { CategorySearchParams, MetaData, PageWithMetaData, ProductCustom } from '@/lib/types'

import { PrCategory, Product } from '@/lib/gql/types'
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next'

const { serverRuntimeConfig } = getConfig()

interface ProductPageType extends PageWithMetaData {
  categoriesTree?: PrCategory[]
  product?: Product
  productWithPreview?: Product
  isPreview?: boolean
}
function getMetaData(product: Product): MetaData {
  return {
    title: product?.content?.metaTagTitle || null,
    description: product?.content?.metaTagDescription || null,
    keywords: product?.content?.metaTagKeywords || null,
    canonicalUrl: null,
    robots: null,
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<any>> {
  const { locale, params } = context
  const { productCode } = params as any

  const product = await getProduct(productCode)
  const categoriesTree = await getCategoryTree()
  if (!product) {
    return { notFound: true }
  }
  return {
    props: {
      product,
      categoriesTree,
      metaData: getMetaData(product),
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
    revalidate: parseInt(serverRuntimeConfig.revalidate),
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const { serverRuntimeConfig } = getConfig()
  const { staticPathsMaxSize } = serverRuntimeConfig?.pageConfig?.productDetail || {}
  const searchResult = await productSearch({
    pageSize: parseInt(staticPathsMaxSize),
  } as CategorySearchParams)
  const items = searchResult?.data?.products?.items || []

  const paths: string[] = items.map(buildProductPath)
  return { paths, fallback: true }
}

const ProductDetailPage: NextPage<ProductPageType> = (props) => {
  const { product } = props
  const router = useRouter()

  const { isFallback, query } = router

  const { data: productResponse } = useGetProduct(query)

  if (isFallback) {
    return <ProductDetailSkeleton />
  }

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []

  return (
    <>
      <ProductDetailTemplate
        key={productResponse?.productCode}
        product={{ ...product, ...productResponse }}
        breadcrumbs={breadcrumbs}
      />
    </>
  )
}

export default ProductDetailPage
