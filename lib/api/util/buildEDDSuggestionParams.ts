import { Address, ProductCustom } from '@/lib/types'

const buildEDDSuggestionParams = (productAndShippingData: any) => {
  const { products, shippingAddress } = JSON.parse(productAndShippingData)

  return {
    eddItems: products.map((product: ProductCustom & { quantity: number }) => {
      return {
        orderItemID: 1,
        quantity: product?.quantity,
        upc: product?.variationProductCode || product?.productCode,
        productUsage: product?.productUsage,
      }
    }),
    shippingAddress: {
      addressID: null,
      customerID: null,
      addressLine1: shippingAddress?.address1,
      city: shippingAddress?.cityOrTown,
      state: shippingAddress?.stateOrProvince,
      postalCode: shippingAddress?.postalOrZipCode,
      countryCode: shippingAddress?.countryCode || 'US',
    },
    orderType: 'DIRECTSHIP',
    total: products.length === 1 ? products[0]?.price?.price : 1,
  }
}

export default buildEDDSuggestionParams
