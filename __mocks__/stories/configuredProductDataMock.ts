export const configuredProductDataMock = {
  productCode: 'BackP_001',
  purchasableState: {
    isPurchasable: true,
  },
  options: [
    {
      attributeFQN: 'tenant~size',
      attributeDetail: {
        name: 'Size',
        inputType: 'List',
      },
      isProductImageGroupSelector: false,
      isRequired: true,
      isMultiValue: false,
      values: [
        {
          value: 'Small',
          isSelected: true,
          deltaPrice: null,
          stringValue: 'S',
        },
        {
          value: 'Large',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'L',
        },
      ],
    },
    {
      attributeFQN: 'tenant~monogram',
      attributeDetail: {
        name: 'Monogram',
        inputType: 'TextBox',
      },
      isProductImageGroupSelector: false,
      isRequired: false,
      isMultiValue: false,
      values: [
        {
          value: '',
          isSelected: false,
          deltaPrice: 15,
          stringValue: null,
        },
      ],
    },
    {
      attributeFQN: 'tenant~product-warranty',
      attributeDetail: {
        name: 'Product Warranty',
        inputType: 'List',
      },
      isProductImageGroupSelector: false,
      isRequired: false,
      isMultiValue: false,
      values: [
        {
          value: '1-Year-Warranty',
          isSelected: false,
          deltaPrice: 10,
          stringValue: '1 Year Warranty',
        },
        {
          value: '2-Year-Warranty',
          isSelected: false,
          deltaPrice: 20,
          stringValue: '2 Year Warranty',
        },
      ],
    },
  ],
  inventoryInfo: {
    manageStock: true,
    onlineLocationCode: '41315',
    onlineSoftStockAvailable: 10179,
    onlineStockAvailable: 10179,
  },
}
