import { createClient } from 'contentful'
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

const { publicRuntimeConfig } = getConfig()

const getContentfulPage = async () => {
  const client = createClient({
    space: publicRuntimeConfig.contentful.CONTENTFUL_SPACE_ID,
    accessToken: publicRuntimeConfig.contentful.CONTENTFUL_ACCESS_TOKEN,
  })

  const res = await client.getEntries({ content_type: 'homePage' })
  return {
    props: {
      components: res.items[0].fields,
      revalidate: 10,
    },
  }
}

export const getPage = async (params: any) => {
  const currentCMS = publicRuntimeConfig.cms || ''
  if (currentCMS === 'contentstack') return getContentStackPage(params)
  if (currentCMS === 'contentful') return getContentfulPage()

  return {
    components: [],
  }
}
