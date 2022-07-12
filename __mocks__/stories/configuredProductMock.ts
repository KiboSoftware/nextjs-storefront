import { ConfiguredProduct } from '@/lib/gql/types'

export const configuredProductMock: { configureProduct: ConfiguredProduct } = {
  configureProduct: {
    productCode: 'BackP_001',
    variationProductCode: 'BackP_001-4',
    productImages: [
      {
        imageUrl:
          '//cdn-sb.mozu.com/26507-41315/cms/41315/files/ff4daef0-999e-4df7-abd2-257ccd8531cf',
      },
    ],
    purchasableState: {
      isPurchasable: true,
    },
    options: [
      {
        attributeFQN: 'tenant~color',
        attributeDetail: {
          name: 'Color',
          inputType: 'List',
          dataTypeSequence: 0,
        },
        isProductImageGroupSelector: false,
        isRequired: true,
        isMultiValue: false,
        values: [
          {
            value: 'Orange',
            isSelected: true,
            deltaPrice: null,
            stringValue: 'Orange',
            attributeValueId: 0,
            isEnabled: true,
          },
          {
            value: 'Purple',
            isSelected: false,
            deltaPrice: null,
            stringValue: 'Purple',
            attributeValueId: 1,
          },
        ],
      },
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
            value: 'L',
            isSelected: true,
            deltaPrice: null,
            stringValue: 'L',
            attributeValueId: 0,
            isEnabled: true,
          },
          {
            value: 'M',
            isSelected: false,
            deltaPrice: null,
            stringValue: 'M',
            attributeValueId: 1,
          },
          {
            value: 'S',
            isSelected: false,
            deltaPrice: null,
            stringValue: 'S',
            attributeValueId: 2,
          },
        ],
      },
      {
        attributeFQN: 'tenant~length-cm',
        attributeDetail: {
          name: 'Length (cm)',
          inputType: 'List',
          dataTypeSequence: 0,
        },
        isProductImageGroupSelector: false,
        isRequired: true,
        isMultiValue: false,
        values: [
          {
            value: 150,
            isSelected: true,
            deltaPrice: null,
            stringValue: null,
            attributeValueId: 0,
            isEnabled: true,
          },
          {
            value: 154,
            isSelected: false,
            deltaPrice: null,
            stringValue: null,
            attributeValueId: 1,
          },
          {
            value: 156,
            isSelected: false,
            deltaPrice: null,
            stringValue: null,
            attributeValueId: 2,
          },
        ],
      },
      {
        attributeFQN: 'tenant~include-warranty',
        attributeDetail: {
          name: 'Include Warranty',
          inputType: 'YesNo',
          dataTypeSequence: 0,
        },
        isProductImageGroupSelector: false,
        isRequired: false,
        isMultiValue: false,
        values: [
          {
            value: '',
            shopperEnteredValue: true,
            isSelected: true,
            deltaPrice: 0,
            stringValue: null,
            attributeValueId: 0,
            isEnabled: true,
          },
        ],
      },
      {
        attributeFQN: 'tenant~vanity-plate-text',
        attributeDetail: {
          name: 'Vanity Plate Text',
          inputType: 'TextBox',
          dataTypeSequence: 0,
        },
        isProductImageGroupSelector: false,
        isRequired: false,
        isMultiValue: false,
        values: [
          {
            value: '',
            shopperEnteredValue: 'Test',
            isSelected: true,
            deltaPrice: 0,
            stringValue: null,
            attributeValueId: 0,
            isEnabled: true,
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
