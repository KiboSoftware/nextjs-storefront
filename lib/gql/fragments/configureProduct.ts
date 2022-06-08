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
    }
  }
}
`
export const configureProductInfo = `
fragment configureProductInfo on ConfiguredProduct {
        productCode
        purchasableState {
          isPurchasable
        }
        ...configureProductOptions
}
${configureProductOptions}
`
