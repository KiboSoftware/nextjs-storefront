import getConfig from 'next/config'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProductDetailTemplate, ProductDetailSkeleton } from '@/components/page-templates'
import { getProduct, getCategoryTree } from '@/lib/api/operations'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'

import { Product } from '@/lib/gql/types'
import type { NextPage } from 'next'

export async function getServerSideProps(context: any) {
  const { locale, params, req, resolvedUrl } = context

  const { productSlug } = params
  if (!productSlug.length || productSlug.length > 2) {
    return { notFound: true }
  }
  const [_, productCode] =
    productSlug?.length === 2 ? productSlug : [null, productSlug?.[0] || null]

  const product = await getProduct(productCode, req)
  const categoriesTree = await getCategoryTree(req)

  const redirectPath = routeHandle(resolvedUrl, params.productSlug, product)
  const shouldRedirect = resolvedUrl !== redirectPath ? true : false

  return {
    redirect: shouldRedirect
      ? {
          permanent: false,
          destination: redirectPath,
        }
      : undefined,
    props: {
      product,
      categoriesTree,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const routeHandle = (url: string, productSlug: string[], product: Product) => {
  const firstQueryParam = productSlug?.length && productSlug[0]

  const { seoFriendlyUrl } = product?.content ?? {}
  let correctPath = url

  if (seoFriendlyUrl) {
    // if seoFriendlyUrl is set in admin, we need to add it to the path
    if (productSlug?.length === 1) {
      correctPath = correctPath.replace(
        `/${firstQueryParam}`,
        `/${seoFriendlyUrl}/${firstQueryParam}`
      )
      //router.replace(router.asPath, correctPath)
    } else if (seoFriendlyUrl !== firstQueryParam) {
      // if seoFriendlyUrl is set in admin and it is different from the first path param, we need to replace it with correct one
      correctPath = correctPath.replace(`/${firstQueryParam}/`, `/${seoFriendlyUrl}/`)
      //router.replace(router.asPath, correctPath)
    }
  } else {
    // if seoFriendlyUrl is not set, we need to remove it from the path
    if (productSlug?.length === 2) {
      correctPath = correctPath.replace(`/${firstQueryParam}`, '')
      //router.replace(router.asPath, correctPath)
    }
  }

  return correctPath
}

const ProductDetailPage: NextPage = (props: any) => {
  const { product } = props

  const { publicRuntimeConfig } = getConfig()
  const currentUrl = publicRuntimeConfig?.currentUrl

  const router = useRouter()
  const { getProductLink } = uiHelpers()
  const { isFallback } = router

  if (isFallback) {
    return <ProductDetailSkeleton />
  }

  if (!product && !isFallback) {
    return <ErrorPage statusCode={404} />
  }

  // if (typeof window !== 'undefined') {
  //   routeHandle(router, product)
  // }

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []
  return (
    <>
      <Head>
        <meta name="title" content={product?.content?.metaTagTitle} />
        <meta name="description" content={product?.content?.metaTagDescription} />
        <meta name="keywords" content={product?.content?.metaTagKeywords} />
        <link
          rel="canonical"
          href={`https://${currentUrl}${getProductLink(
            product.productCode,
            product.content.seoFriendlyUrl
          )}`}
        />
      </Head>
      <ProductDetailTemplate product={product} breadcrumbs={breadcrumbs} />
    </>
  )
}

export default ProductDetailPage
