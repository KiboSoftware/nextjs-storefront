import getConfig from 'next/config'

import Stack from '../../cms/content-stack'
import amplience from '@/lib/cms/amplience'
import contentful from '@/lib/cms/contentful'
import { CMS } from '@/lib/constants'
import { contentfulGetters, amplienceGetters, contentStackGetters } from '@/lib/getters'

interface PageProps {
  contentTypeUid: string
  referenceFieldPath: Array<string>
  entryUrl: string
  preview?: boolean
}

const { publicRuntimeConfig } = getConfig()

const getContentStackPage = async (params: PageProps) => {
  const response = await Stack.getEntry(params)

  return {
    components: contentStackGetters.getContentStackPageData(response[0][0]?.page_components) || [],
  }
}

const getContentfulPage = async (productCode: string, preview: boolean) => {
  if (productCode) {
    const response = await contentful.fetchProductDetails({ preview, productCode })
    const productData = contentfulGetters.getContentfulProductData(
      response?.data?.productDetailsCollection?.items[0]
    )
    return {
      components: productData || [],
    }
  } else {
    const response = await contentful.fetchHomePage({ preview })
    const homePageData = contentfulGetters.getContentfulPageData(
      response?.data?.homePageCollection?.items
    )
    return {
      components: homePageData || [],
    }
  }
}

const getAmpliencePage = async (productCode?: string) => {
  if (productCode) {
    const response = await amplience.fetchProductDetails(productCode)
    const pageData = response && amplienceGetters.getAmplienceProductDetailsPageData(response)
    return { components: pageData || [] }
  } else {
    const response = await amplience.fetchHomePage()
    const pageData =
      response &&
      response?.contentTypes &&
      amplienceGetters.getAmplienceHomePageData(response?.contentTypes)
    return { components: pageData || [] }
  }
}

export const getPage = async (params: PageProps) => {
  const currentCMS = publicRuntimeConfig.cms || ''
  if (currentCMS === CMS.CONTENTSTACK) return getContentStackPage(params)
  if (currentCMS === CMS.CONTENTFUL)
    return getContentfulPage(params.entryUrl, params.preview || false)
  if (currentCMS === CMS.AMPLIENCE) return getAmpliencePage(params.entryUrl)

  return {
    components: [],
  }
}
