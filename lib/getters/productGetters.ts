import getConfig from 'next/config'

import { buildBreadcrumbs, validateProductVariations } from '@/lib/helpers'
import { uiHelpers } from '@/lib/helpers'
import type { ProductCustom, BreadCrumb } from '@/lib/types'

import type { Product, ProductOption, ProductPriceRange, ProductProperty } from '@/lib/gql/types'

const getName = (product: Product | ProductCustom) => product?.content?.productName

const getProductId = (product: Product | ProductCustom): string => product?.productCode || ''

const getRating = (product: Product | ProductCustom) => {
  const { publicRuntimeConfig } = getConfig()

  const attr = product?.properties?.find(
    (property) => property?.attributeFQN === publicRuntimeConfig.ratingAttrFQN
  )?.values
  return attr?.[0]?.value
}

const getProductTotalReviews = (): number => 0

const getPrice = (product: Product | ProductCustom): { regular: number; special: number } => {
  return {
    regular: product?.price?.price as number,
    special: product?.price?.salePrice as number,
  }
}

const getPriceRange = (product: Product | ProductCustom): ProductPriceRange =>
  product?.priceRange as ProductPriceRange

const getCoverImage = (product: Product | ProductCustom): string =>
  product?.content?.productImages?.[0]?.imageUrl || ''

const getDescription = (product: Product | ProductCustom): string =>
  product?.content?.productFullDescription || ''

const getShortDescription = (product: Product | ProductCustom): string =>
  product?.content?.productShortDescription || ''

const getProductGallery = (product: Product | ProductCustom) => {
  return product?.content?.productImages
}

const handleProtocolRelativeUrl = (url: string) => {
  if (!url.startsWith('https')) {
    return `https:${url}`
  }
  return url
}

const getBreadcrumbs = (product: Product | ProductCustom): BreadCrumb[] => {
  const homeCrumb = [{ text: 'Home', link: '/' }]
  const { getCatLink } = uiHelpers()
  if (!product?.categories?.[0]) {
    return homeCrumb
  }
  const productCrumbs = buildBreadcrumbs(product?.categories[0]).map((b) => ({
    ...b,
    link: getCatLink(b?.link as string),
  }))

  return [...homeCrumb, ...productCrumbs]
}

const getProperties = (product: ProductCustom) => {
  return product?.properties
    ?.filter((attr) => !attr?.isHidden)
    .map((attr: ProductProperty | null) => {
      return {
        name: attr?.attributeDetail?.name,
        value: attr?.values?.map((v) => v?.value).join(', '),
      }
    })
}

const getOptionSelectedValue = (option: ProductOption) => {
  const selectedValue = option?.values?.find((value) => value?.isSelected)
  const result = selectedValue?.value || selectedValue?.stringValue || selectedValue?.isSelected
  return result?.toString()
}
export const getOptionName = (option: ProductOption): string => option?.attributeDetail?.name || ''
export const getOptions = (product: Product) => product?.options

const getSelectedFullfillmentOption = (product: ProductCustom) => product?.fulfillmentMethod

const getSegregatedOptions = (product: ProductCustom) => {
  const options = product?.options
  if (!options) return

  const { publicRuntimeConfig } = getConfig()
  const colorAttributeFQN = publicRuntimeConfig.colorAttributeFQN.toLowerCase()
  const sizeAttributeFQN = publicRuntimeConfig.sizeAttributeFQN.toLowerCase()

  const colourOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === colorAttributeFQN.toLowerCase()
  )

  const sizeOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === sizeAttributeFQN.toLowerCase()
  )

  const selectOptions = options?.filter(
    (option) =>
      option?.attributeDetail?.inputType?.toLowerCase() === 'list' &&
      option?.attributeFQN?.toLowerCase() !== colorAttributeFQN.toLowerCase() &&
      option?.attributeFQN?.toLowerCase() !== sizeAttributeFQN.toLowerCase()
  )

  const yesNoOptions = options?.filter(
    (option) => option?.attributeDetail?.inputType?.toLowerCase() === 'yesno'
  )

  const textBoxOptions = options?.filter(
    (option) => option?.attributeDetail?.inputType?.toLowerCase() === 'textbox'
  )

  return {
    colourOptions,
    sizeOptions,
    selectOptions,
    yesNoOptions,
    textBoxOptions,
  }
}

const validateAddToCart = (product: ProductCustom): boolean =>
  validateProductVariations(product) && Boolean(product.fulfillmentMethod)

const getVariationProductCodeOrProductCode = (product: ProductCustom): string => {
  if (!product) return ''
  return product.variationProductCode
    ? product.variationProductCode
    : (product.productCode as string)
}

export const productGetters = {
  getName,
  getRating,
  getProductTotalReviews,
  getPrice,
  getPriceRange,
  getDescription,
  getShortDescription,
  getProductGallery,
  getBreadcrumbs,
  getProperties,
  getOptionSelectedValue,
  getOptionName,
  getOptions,
  getSegregatedOptions,
  getSelectedFullfillmentOption,
  getCoverImage,
  getProductId,
  validateAddToCart,
  getVariationProductCodeOrProductCode,
  handleProtocolRelativeUrl,
}
