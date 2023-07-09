interface UIHelpersType {
  getCategoryLink: (category?: string, seoFriendlyUrl?: string) => string
  getProductLink: (productCode?: string, seoFriendlyUrl?: string) => string
}

export const uiHelpers = (): UIHelpersType => {
  const getCategoryLink = (categoryCode?: string, seoFriendlyUrl?: string): string => {
    if (seoFriendlyUrl) {
      return `/category/${seoFriendlyUrl}/${categoryCode}`
    }

    return `/category/${categoryCode}`
  }
  const getProductLink = (productCode?: string, seoFriendlyUrl?: string) => {
    if (seoFriendlyUrl) {
      return `/product/${seoFriendlyUrl}/${productCode}`
    }
    return `/product/${productCode}`
  }

  return {
    getCategoryLink,
    getProductLink,
  }
}
