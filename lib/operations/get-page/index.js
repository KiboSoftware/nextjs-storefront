import Stack from '../../cms/content-stack'

export const getHomePageCMSRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'home_page',
    referenceFieldPath: [],
    jsonRtePath: [],
  })

  console.log('response', response[0][0])

  return response[0][0]
}
