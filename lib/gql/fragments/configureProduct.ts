export const configureProductOptions = `
fragment configureProductOptions on ConfiguredProduct {
  options {
    attributeFQN
    attributeDetail {
      name
      inputType
    }
    isProductImageGroupSelector
    isRequired
    isMultiValue
    values {
      value
      isSelected
      deltaPrice
      stringValue
      shopperEnteredValue
    }
  }
}
`
export const configureProductInfo = `
fragment configureProductInfo on ConfiguredProduct {
        productCode
        productImages {
          imageUrl
          altText
          cmsId
        }
        purchasableState {
          isPurchasable
        }
        ...configureProductOptions
}
${configureProductOptions}
`
