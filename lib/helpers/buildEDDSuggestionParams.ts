export const buildEDDSuggestionParams = (productAndShippingData: any) => {
  const { product, shippingAddress } = productAndShippingData
  return {
    eddItems: [
      {
        orderItemID: 1,
        quantity: product.quantity,
        upc: product.variationProductCode || product.upc,
        productUsage: product.productUsage,
      },
    ],
    shippingAddress: {
      addressID: null,
      customerID: null,
      //   addressLine1: '126 NADINE ST',
      //   phone: '1-512-739-1485',
      //   city: 'Houston',
      //   state: 'TX',
      postalCode: shippingAddress.zipCode,
      //   countryCode: 'US',
    },
    orderType: 'DIRECTSHIP',
    total: product.price,
  }
}
