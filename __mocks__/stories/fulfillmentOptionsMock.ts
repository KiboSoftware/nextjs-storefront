import { FulfillmentOption } from '@/lib/types'

export const fulfillmentOptionsMock: FulfillmentOption[] = [
  {
    value: 'DirectShip',
    code: 'DS',
    name: 'Direct Ship',
    label: 'Ship to Home',
    details: 'Available to Ship',
    isRequired: false,
    shortName: 'Ship',
  },
  {
    value: 'InStorePickup',
    code: 'SP',
    name: 'In Store Pickup',
    label: 'Pickup in Store',
    details: 'Available at',
    isRequired: false,
    shortName: 'Pickup',
  },
]
