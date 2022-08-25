import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import StoreDetails from './StoreDetails'
import { locationCollectionMock, locationInventoryCollectionMock } from '@/__mocks__/stories'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

export default {
  title: 'Dialogs/Store/StoreDetails',
  component: StoreDetails,
} as ComponentMeta<typeof StoreDetails>

const Template: ComponentStory<typeof StoreDetails> = ({ ...args }) => <StoreDetails {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  location: storeLocationGetters.getLocations(locationCollectionMock?.spLocations?.items || [])[0],
}

export const WithInventory = Template.bind({})

WithInventory.args = {
  location: storeLocationGetters.getLocations(locationCollectionMock?.spLocations?.items || [])[0],
  showProductAndInventory: true,
  inventory:
    (locationInventoryCollectionMock?.productLocationInventory?.items &&
      locationInventoryCollectionMock?.productLocationInventory?.items[0]) ||
    undefined,
}
