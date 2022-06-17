interface uiHelpersType {
  getCatLink: (category?: string) => string
  getProductLink: (productCode?: string) => string
}

export const uiHelpers = (): uiHelpersType => {
  const getCatLink = (categoryCode?: string) => {
    return `/category/${categoryCode}`
  }
  const getProductLink = (productCode?: string) => {
    return `/product/${productCode}`
  }

  return {
    getCatLink,
    getProductLink,
  }
}
