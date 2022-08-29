import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchStore from './SearchStore'
import {
  locationCollectionMock,
  ProductCustomMock,
  locationInventoryCollectionMock,
} from '@/__mocks__/stories'

import type { LocationInventory } from '@/lib/gql/types'

export default {
  title: 'Dialogs/Store/SearchStore',
  component: SearchStore,
} as ComponentMeta<typeof SearchStore>

const locationList = locationCollectionMock?.spLocations?.items

const Template: ComponentStory<typeof SearchStore> = ({ ...args }) => <SearchStore {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  spLocations: locationList || [],
  searchTerm: '',
  initialState: true,
  selectedStore: 'RICHMOND',
  setSelectedStore: () => undefined,
  setSearchTerm: (value: string) => value,
  onStoreByZipcode: (userEnteredValue: string) => userEnteredValue,
  onStoreByCurrentLocation: () => undefined,
}

export const WithInventory = Template.bind({})

WithInventory.args = {
  spLocations: locationList || [],
  showProductAndInventory: true,
  product: ProductCustomMock,
  locationInventory:
    (locationInventoryCollectionMock?.productLocationInventory?.items as LocationInventory[]) || [],
  searchTerm: '',
  initialState: true,
  selectedStore: 'RICHMOND',
  setSelectedStore: () => undefined,
  setSearchTerm: (value: string) => value,
  onStoreByZipcode: (userEnteredValue: string) => userEnteredValue,
  onStoreByCurrentLocation: () => undefined,
}

export const WithoutInventory = Template.bind({})

WithoutInventory.args = {
  spLocations: locationList || [],
  showProductAndInventory: true,
  product: ProductCustomMock,
  locationInventory: [],
  searchTerm: '',
  initialState: true,
  selectedStore: 'RICHMOND',
  setSelectedStore: () => undefined,
  setSearchTerm: (value: string) => value,
  onStoreByZipcode: (userEnteredValue: string) => userEnteredValue,
  onStoreByCurrentLocation: () => undefined,
}
