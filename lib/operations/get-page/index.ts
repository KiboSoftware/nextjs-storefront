import Stack from '../../cms/content-stack'

interface getPageProps {
  contentTypeUid: string
  referenceFieldPath: Array<string>
}

export const getPage = async ({ contentTypeUid = '', referenceFieldPath = [] }: getPageProps) => {
  const response = await Stack.getEntry({
    contentTypeUid: contentTypeUid,
    referenceFieldPath,
    jsonRtePath: [],
  })

  return {
    components: response[0][0]?.page_components,
  }
}
