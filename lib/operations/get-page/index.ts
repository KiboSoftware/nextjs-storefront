import getConfig from 'next/config'

import Stack from '../../cms/content-stack'
import contentful from '@/lib/cms/contentful'
import { CMS } from '@/lib/constants'
import { contentfulGetters } from '@/lib/getters'

interface PageProps {
  contentTypeUid: string
  referenceFieldPath: Array<string>
  entryUrl: string
}

const { publicRuntimeConfig } = getConfig()

const getContentStackPage = async (params: PageProps) => {
  const response = await Stack.getEntry(params)
  return {
    components: response[0][0]?.page_components || [],
  }
}

const getContentfulPage = async (productCode: string) => {
  if (productCode) {
    const response = await contentful.fetchProductDetails(productCode)
    const productData = contentfulGetters.getContentfulProductData(
      response?.data?.productDetailsCollection?.items[0]
    )
    return {
      components: productData || [],
    }
  } else {
    const response = await contentful.fetchHomePage()
    const homePageData = contentfulGetters.getContentfulPageData(
      response?.data?.homePageCollection?.items
    )
    return {
      components: homePageData || [],
    }
  }
}

export const getPage = async (params: PageProps) => {
  const currentCMS = publicRuntimeConfig.cms || ''
  if (currentCMS === CMS.CONTENTSTACK) return getContentStackPage(params)
  if (currentCMS === CMS.CONTENTFUL) return getContentfulPage(params.entryUrl)

  return {
    components: [],
  }
}
