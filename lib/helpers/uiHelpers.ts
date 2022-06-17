interface uiHelpersReturnType {
  getCatLink: (category?: string) => string
  getProductLink: (productCode?: string) => string
}

export const uiHelpers = (): uiHelpersReturnType => {
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
