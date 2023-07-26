import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import B2BProductDetailsTable from './B2BProductDetailsTable'
import { cartResponse, locationCollectionMock } from '@/__mocks__/stories'

import { CrCartItem, Location } from '@/lib/gql/types'

export default {
  title: 'B2B/Quick Order/B2BProductDetailsTable',
  component: B2BProductDetailsTable,
  argTypes: {
    backgroundColor: { control: 'color' },
    onFulfillmentOptionChange: { action: 'onFulfillmentOptionChange' },
    onStoreSetOrUpdate: { action: 'onStoreSetOrUpdate' },
    onQuantityUpdate: { action: 'onQuantityUpdate' },
    onItemDelete: { action: 'onItemDelete' },
  },
} as ComponentMeta<typeof B2BProductDetailsTable>

const Template: ComponentStory<typeof B2BProductDetailsTable> = (args) => (
  <B2BProductDetailsTable {...args} />
)

export const Common = Template.bind({})

const locationList = locationCollectionMock?.spLocations?.items ?? []

Common.args = {
  items: (cartResponse?.items as CrCartItem[]) || [],
  fulfillmentLocations: locationList,
  purchaseLocation: locationList[0] as Location,
}
