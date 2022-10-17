import { useEffect, useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import nextI18NextConfig from '../../next-i18next.config'
import { ProductDetailTemplate } from '@/components/page-templates'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import getProduct from '@/lib/api/operations/get-product'
import search from '@/lib/api/operations/get-product-search'
import { onEntryChange } from '@/lib/cms/content-stack'
import { productGetters } from '@/lib/getters'
import { getPage } from '@/lib/operations/get-page'
import type { CategorySearchParams, CategoryTreeResponse } from '@/lib/types'

import type { NextPage, GetStaticPropsContext } from 'next'

const getCmsProductPageData = async (params: { productCode: string; preview?: boolean }) => {
  const { productCode, preview } = params
  const cmsPage = await getPage({
    contentTypeUid: 'product_detail',
    referenceFieldPath: [],
    entryUrl: productCode,
    preview,
  })
  return cmsPage
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params, locale, preview = false } = context
  const { productCode } = params as any
  const { serverRuntimeConfig } = getConfig()

  const cmsProductDetail = await getCmsProductPageData({ productCode, preview })
  const product = await getProduct(productCode)
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  return {
    props: {
      productCode,
      product,
      categoriesTree,
      cmsProductDetail,
      preview,
      ...(await serverSideTranslations(locale as string, ['common'], nextI18NextConfig)),
    },
    revalidate: serverRuntimeConfig.revalidate,
  }
}

export async function getStaticPaths() {
  const { serverRuntimeConfig } = getConfig()
  const searchResponse = await search({
    pageSize: serverRuntimeConfig.pageSize,
  } as CategorySearchParams)
  const items = searchResponse?.data?.products?.items || []
  const paths: string[] = []
  items?.length &&
    items?.map((item: { productCode: string }) => paths.push(`/product/${item.productCode}`))
  return { paths, fallback: true }
}

const ProductDetailPage: NextPage = (props: any) => {
  const { productCode, product, cmsProductDetail, preview } = props
  const { isFallback } = useRouter()
  const [cmsProductDetailRespone, setCmsProductDetailPageResponse] = useState(cmsProductDetail)

  const fetchData = async () => {
    try {
      const cmsPage = await getCmsProductPageData({ productCode, preview })
      setCmsProductDetailPageResponse(cmsPage)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    onEntryChange(() => {
      fetchData()
    })
  }, [])

  if (isFallback) {
    return <>Fallback</>
  }

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []
  return (
    <>
      <ProductDetailTemplate
        product={product}
        breadcrumbs={breadcrumbs}
        cmsProducts={cmsProductDetailRespone}
      />
    </>
  )
}

export default ProductDetailPage
