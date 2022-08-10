import Stack from '../../cms/content-stack'

export const getHomePageCMSRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'home_page',
    referenceFieldPath: [
      'page_components.hero_carousel.hero_carousel_items',
      'page_components.large_promo_blocks.large_promo_blocks',
      'page_components.small_promo_blocks.small_promo_blocks',
    ],
    jsonRtePath: [],
  })
  return response[0][0]?.page_components
}

export const getProductRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'product',
    referenceFieldPath: [],
    jsonRtePath: undefined,
  })
  return response[0][0]
}
