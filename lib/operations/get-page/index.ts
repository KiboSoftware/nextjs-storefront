import getConfig from 'next/config'

import Stack from '../../cms/content-stack'
import contentful from '@/lib/cms/contentful'

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
  const response = productCode
    ? await contentful.fetchHomePage()
    : await contentful.fetchProductDetails(productCode) //BackP_004

  return response
}

export const getPage = async (params: PageProps) => {
  const currentCMS = publicRuntimeConfig.cms || ''
  if (currentCMS === 'contentstack') return getContentStackPage(params)
  if (currentCMS === 'contentful') return getContentfulPage(params.entryUrl)

  return {
    components: [],
  }
}
