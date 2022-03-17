import { ProductOption } from '@/lib/gql/types'

export const options: ProductOption[] = [
  {
    attributeFQN: 'Tenant~optional-mount',
    attributeDetail: {
      dataTypeSequence: 13,
      name: 'Optional Mount',
    },
    values: [
      {
        value: 'MS-CAM-004',
        attributeValueId: 125,
        shopperEnteredValue: null,
      },
    ],
  },
  {
    attributeFQN: 'Tenant~size',
    attributeDetail: {
      dataTypeSequence: 13,
      name: 'Size',
    },
    values: [
      {
        value: 'L',
        attributeValueId: 125,
        shopperEnteredValue: 'Large',
      },
    ],
  },
]
