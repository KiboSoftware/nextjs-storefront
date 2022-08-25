import Stack from '../../cms/content-stack'

interface getPageProps {
  contentTypeUid?: string
  referenceFieldPath?: Array<string>
  entryUrl?: string
}

export const getPage = async ({
  contentTypeUid = '',
  entryUrl = '',
  referenceFieldPath = [],
}: getPageProps) => {
  const response = await Stack.getEntry({
    contentTypeUid: contentTypeUid,
    entryUrl,
    referenceFieldPath,
  })
  return {
    components: response[0][0]?.page_components || [],
  }
}
