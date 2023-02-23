import getConfig from 'next/config'

import { FulfillmentOptions } from '../constants'
import { buildBreadcrumbsParams, uiHelpers } from '@/lib/helpers'
import type { ProductCustom, BreadCrumb, ProductProperties, FulfillmentOption } from '@/lib/types'
import DefaultImage from '@/public/product_placeholder.svg'

import type {
  Product,
  ProductOption,
  ProductPriceRange,
  ProductProperty,
  Location,
  LocationInventory,
  CrProduct,
  CrProductOption,
  ProductPrice,
} from '@/lib/gql/types'

type ProductOptionsReturnType<T> = T extends ProductCustom
  ? ProductOption[]
  : T extends CrProduct
  ? CrProductOption[]
  : never

const { publicRuntimeConfig } = getConfig()

type GenericProduct = Product | ProductCustom | CrProduct

const getName = (product: GenericProduct): string => {
  if ('name' in product) {
    return product.name || ''
  }

  if ('content' in product) {
    return product?.content?.productName || ''
  }

  return ''
}

const getProductId = (product: GenericProduct): string => product?.productCode || ''

const getRating = (product: Product | ProductCustom) => {
  const attr = product?.properties?.find(
    (property) => property?.attributeFQN === publicRuntimeConfig.ratingAttrFQN
  )?.values
  return attr?.[0]?.value
}

const getPrice = (product: GenericProduct): { regular: number; special: number } => {
  return {
    regular: product?.price?.price as number,
    special: product?.price?.salePrice as number,
  }
}

const getPDPProductPrice = (
  pdpProductPrice?: ProductPrice
): { regular: number; special: number } => {
  return {
    regular: pdpProductPrice?.price as number,
    special: pdpProductPrice?.salePrice as number,
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

const getProductImage = (product: CrProduct): string => product?.imageUrl || DefaultImage

const handleProtocolRelativeUrl = (url: string) => {
  if (typeof url === 'string' && !url.startsWith('http')) {
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
  const productCrumbs = buildBreadcrumbsParams(product?.categories[0]).map((b) => ({
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

export const getOptions = <T extends ProductCustom | CrProduct>(
  product: T
): ProductOptionsReturnType<T> => {
  return product.options as ProductOptionsReturnType<T>
}

const getSelectedFulfillmentOption = (product: ProductCustom) => product?.fulfillmentMethod

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

const validateAddToCartForOneTime = (product: ProductCustom): boolean => {
  if (product.fulfillmentMethod === FulfillmentOptions.SHIP) {
    return Boolean(product?.purchasableState?.isPurchasable)
  }
  if (product.fulfillmentMethod === FulfillmentOptions.PICKUP) {
    return (
      Boolean(product?.purchasableState?.isPurchasable) &&
      Boolean(product.fulfillmentMethod) &&
      Boolean(product.purchaseLocationCode)
    )
  }
  return false
}

const getVariationProductCodeOrProductCode = (product: ProductCustom): string => {
  if (!product) return ''
  return product.variationProductCode
    ? product.variationProductCode
    : (product.productCode as string)
}

const getIsPackagedStandAlone = (product: ProductCustom): boolean => {
  return product?.isPackagedStandAlone || true
}

const isVariationProduct = (product: Product): boolean =>
  Boolean(product?.options?.filter((option) => option?.isRequired === true).length)

const getProductDetails = (product: ProductCustom, pdpProductPrice?: ProductPrice) => {
  const productOptions = getSegregatedOptions(product)

  return {
    productName: getName(product),
    productCode: getProductId(product),
    variationProductCode: getVariationProductCodeOrProductCode(product),
    fulfillmentMethod: getSelectedFulfillmentOption(product),
    productPrice: pdpProductPrice ? getPDPProductPrice(pdpProductPrice) : getPrice(product),
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
    isValidForOneTime: validateAddToCartForOneTime(product),
    productOptions,
    isPackagedStandAlone: getIsPackagedStandAlone(product),
  }
}
const getProductFulfillmentOptions = (
  product: Product,
  purchaseLocation: Location,
  productLocationInventoryData?: LocationInventory[]
): FulfillmentOption[] => {
  const fulfillmentOptions = publicRuntimeConfig.fulfillmentOptions
  return fulfillmentOptions?.map((option: FulfillmentOption) => ({
    value: option.value,
    name: option.name,
    code: option.code,
    label: option.label,
    fulfillmentLocation: purchaseLocation?.name,
    required: option.isRequired,
    shortName: option.shortName,
    disabled:
      product?.fulfillmentTypesSupported?.filter(
        (type) => type.toLowerCase() === option?.value?.toLowerCase()
      ).length === 0,
    details: (() => {
      if (option.shortName === FulfillmentOptions.SHIP)
        return product?.inventoryInfo?.onlineStockAvailable
          ? option.details
          : option.unavailableDetails // checking if Directship
      if (purchaseLocation?.name)
        return `${
          productLocationInventoryData && productLocationInventoryData[0]?.stockAvailable
            ? option.details
            : option.unavailableDetails
        }: ${purchaseLocation.name}`
      return ''
    })(),
  }))
}

const isProductVariationsSelected = (product: Product): boolean => {
  // check if product variation options selected
  if (!product?.options && product?.purchasableState?.isPurchasable) {
    return product.purchasableState?.isPurchasable
  }

  const requiredOptions = product?.options?.filter((option) => option?.isRequired === true)
  const selectedOptions = requiredOptions?.map((option) =>
    option?.values?.some((value) => value?.isSelected === true)
  )

  if (selectedOptions && product?.purchasableState?.isPurchasable) {
    return (
      selectedOptions.every((value) => value === true) && product?.purchasableState?.isPurchasable
    )
  }
  return false
}

const getAvailableItemCount = (
  product: ProductCustom,
  productLocationInventoryData: LocationInventory[] = [],
  fulfillmentOptionValue: string
): number => {
  const allVariantSelected = isProductVariationsSelected(product)
  const qtyLeft = { value: 0 }
  if (allVariantSelected) {
    if (fulfillmentOptionValue === FulfillmentOptions.PICKUP) {
      qtyLeft.value = productLocationInventoryData[0]?.stockAvailable
        ? productLocationInventoryData[0]?.stockAvailable
        : 0
    } else if (fulfillmentOptionValue === FulfillmentOptions.SHIP) {
      qtyLeft.value = product?.inventoryInfo?.onlineStockAvailable
        ? product?.inventoryInfo.onlineStockAvailable
        : 0
    }
  }
  return qtyLeft.value
}

export const productGetters = {
  getName,
  getRating,
  getPrice,
  getPriceRange,
  getBreadcrumbs,
  getOptionSelectedValue,
  getOptionName,
  getOptions,
  getCoverImage,
  getProductId,
  handleProtocolRelativeUrl,
  getProductFulfillmentOptions,
  getAvailableItemCount,
  isVariationProduct,
  getProductImage,
  getProductDetails,
  getPDPProductPrice,
}
