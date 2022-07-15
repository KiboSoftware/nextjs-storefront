import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import StoreDetails from './StoreDetails'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

export default {
  title: 'Dialogs/Store/StoreDetails',
  component: StoreDetails,
} as ComponentMeta<typeof StoreDetails>

const Template: ComponentStory<typeof StoreDetails> = ({ ...args }) => <StoreDetails {...args} />

// Common
export const Common = Template.bind({})

Common.args = storeLocationGetters.getLocations(locationCollectionMock?.spLocations?.items || [])[0]
