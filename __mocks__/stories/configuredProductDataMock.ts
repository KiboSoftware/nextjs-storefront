import { ConfiguredProduct } from '@/lib/gql/types'

export const configuredProductDataMock: { configureProduct: ConfiguredProduct } = {
  configureProduct: {
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
          dataTypeSequence: 0,
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
            attributeValueId: 0,
          },
          {
            value: 'Large',
            isSelected: false,
            deltaPrice: null,
            stringValue: 'L',
            attributeValueId: 1,
          },
        ],
      },
      {
        attributeFQN: 'tenant~monogram',
        attributeDetail: {
          name: 'Monogram',
          inputType: 'TextBox',
          dataTypeSequence: 1,
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
            attributeValueId: 0,
          },
        ],
      },
      {
        attributeFQN: 'tenant~product-warranty',
        attributeDetail: {
          name: 'Product Warranty',
          inputType: 'List',
          dataTypeSequence: 2,
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
            attributeValueId: 0,
          },
          {
            value: '2-Year-Warranty',
            isSelected: false,
            deltaPrice: 20,
            stringValue: '2 Year Warranty',
            attributeValueId: 1,
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
  },
}
