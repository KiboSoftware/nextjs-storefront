interface UIHelpersType {
  getCategoryLink: (category?: string) => string
  getProductLink: (productCode?: string) => string
}

export const uiHelpers = (): UIHelpersType => {
  const getCategoryLink = (categoryCode?: string): string => {
    return `/category/${categoryCode}`
  }
  const getProductLink = (productCode?: string) => {
    return `/product/${productCode}`
  }

  return {
    getCategoryLink,
    getProductLink,
  }
}
