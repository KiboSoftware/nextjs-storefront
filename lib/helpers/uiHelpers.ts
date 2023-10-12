import { buildCategoryPathByCode, buildProductPathByCode } from './buildStorefrontUrls'
interface UIHelpersType {
  getCategoryLink: (category?: string, seoFriendlyUrl?: string) => string
  getProductLink: (productCode?: string, seoFriendlyUrl?: string) => string
}

export const uiHelpers = (): UIHelpersType => {
  const getCategoryLink = (categoryCode?: string, seoFriendlyUrl?: string): string =>
    buildCategoryPathByCode(categoryCode as string)
  const getProductLink = (productCode?: string, seoFriendlyUrl?: string) =>
    buildProductPathByCode(productCode as string)

  return {
    getCategoryLink,
    getProductLink,
  }
}
