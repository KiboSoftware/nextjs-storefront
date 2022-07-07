import getConfig from 'next/config'

import { buildBreadcrumbs, uiHelpers } from '@/lib/helpers'
import type { ProductCustom, BreadCrumb, ProductProperties, FulfillmentOption } from '@/lib/types'

import type {
  Product,
  ProductOption,
  ProductPriceRange,
  ProductProperty,
  Location,
} from '@/lib/gql/types'

const { publicRuntimeConfig } = getConfig()

const getName = (product: Product | ProductCustom) => product?.content?.productName

const getProductId = (product: Product | ProductCustom): string => product?.productCode || ''

const getRating = (product: Product | ProductCustom) => {
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
  const { getCategoryLink } = uiHelpers()
  if (!product?.categories?.[0]) {
    return homeCrumb
  }
  const productCrumbs = buildBreadcrumbs(product?.categories[0]).map((b) => ({
    ...b,
    link: getCategoryLink(b?.link as string),
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
  Boolean(product?.purchasableState?.isPurchasable) && Boolean(product.fulfillmentMethod)

const getVariationProductCodeOrProductCode = (product: ProductCustom): string => {
  if (!product) return ''
  return product.variationProductCode
    ? product.variationProductCode
    : (product.productCode as string)
}

const getProductDetails = (product: ProductCustom) => {
  const productOptions = getSegregatedOptions(product)

  return {
    productName: getName(product),
    productCode: getProductId(product),
    variationProductCode: getVariationProductCodeOrProductCode(product),
    fulfillmentMethod: getSelectedFullfillmentOption(product),
    productPrice: getPrice(product),
    productPriceRange: getPriceRange(product),
    productRating: getRating(product),
    description: getDescription(product),
    shortDescription: getShortDescription(product),
    productGallery: getProductGallery(product),

    optionsVisibility: {
      color: productOptions && productOptions.colourOptions && productOptions.colourOptions.values,
      size: productOptions && productOptions.sizeOptions && productOptions.sizeOptions.values,
      select: productOptions && productOptions.selectOptions.length,
      checkbox: productOptions && productOptions.yesNoOptions.length,
      textbox: productOptions && productOptions.textBoxOptions.length,
    },

    properties: getProperties(product) as ProductProperties[],
    isValidForAddToCart: validateAddToCart(product),
    productOptions,
  }
}
const getProductFulfillmentOptions = (
  product: Product,
  purchaseLocation: Location
): FulfillmentOption[] => {
  const fullfillmentOptions = publicRuntimeConfig.fullfillmentOptions

  const result = fullfillmentOptions.map((option: FulfillmentOption) => ({
    value: option.value,
    name: option.name,
    code: option.code,
    label: option.label,
    details:
      option.value === 'DirectShip'
        ? option.details
        : purchaseLocation?.name
        ? `${option.details}: ${purchaseLocation.name}`
        : '',
    fulfillmentLocation: purchaseLocation?.name,
    required: option.isRequired,
    shortName: option.shortName,
    disabled:
      product?.fulfillmentTypesSupported?.filter(
        (type) => type.toLowerCase() === option?.value?.toLowerCase()
      ).length === 0,
  }))

  return result
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
  getProductFulfillmentOptions,
  // grouped
  getProductDetails,
}
