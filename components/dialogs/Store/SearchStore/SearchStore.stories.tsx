import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchStore from './SearchStore'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'

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
