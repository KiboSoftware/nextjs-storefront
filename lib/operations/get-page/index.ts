import getConfig from 'next/config'

import Stack from '../../cms/content-stack'

interface getPageProps {
  contentTypeUid?: string
  referenceFieldPath?: Array<string>
  entryUrl?: string
}
const getContentStackPage = async (params: any) => {
  const response = await Stack.getEntry(params)
  return {
    components: response[0][0]?.page_components || [],
  }
}

export const getPage = async (params: any) => {
  const { publicRuntimeConfig } = getConfig()
  const currentCMS = publicRuntimeConfig.cms || ''
  if (currentCMS === 'contentstack') {
    return getContentStackPage(params)
  }
  return {
    components: [],
  }
}
