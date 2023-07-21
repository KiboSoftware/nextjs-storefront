import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuickOrderTable from './QuickOrderTable'
import { cartResponse, locationCollectionMock } from '@/__mocks__/stories'

import { CrCartItem, Location } from '@/lib/gql/types'

export default {
  title: 'B2B/Quick Order/QuickOrderTable',
  component: QuickOrderTable,

  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof QuickOrderTable>

const Template: ComponentStory<typeof QuickOrderTable> = (args) => <QuickOrderTable {...args} />

export const Common = Template.bind({})

const locationList = locationCollectionMock?.spLocations?.items ?? []

Common.args = {
  cartItems: (cartResponse?.items as CrCartItem[]) || [],
  fulfillmentLocations: locationList,
  purchaseLocation: locationList[0] as Location,
  onFulfillmentOptionChange: () => null,
  onStoreSetOrUpdate: () => null,
  onQuantityUpdate: () => null,
}
