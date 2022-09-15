const formatCMSProduct = (cmsProducts: any) => {
  if (cmsProducts?.product_recommendations) {
    return {
      ...cmsProducts,
      product_recommendations: cmsProducts?.product_recommendations?.map((productCode: string) => {
        return { productCode }
      }),
    }
  } else {
    return {
      ...cmsProducts,
      customers_also_bought: cmsProducts?.customers_also_bought?.map((productCode: string) => {
        return { productCode }
      }),
    }
  }
}

const getContentfulProductData = (contentfulProductData: any) => {
  return (
    contentfulProductData &&
    Object.entries(contentfulProductData)?.map((item) => {
      return { [item[0]]: formatCMSProduct(item[1]) }
    })
  )
}

const getContentfulPageData = (contentfulPageData: any) => {
  //need to implement
  return []
}

export const contentfulGetters = {
  getContentfulProductData,
  getContentfulPageData,
}
