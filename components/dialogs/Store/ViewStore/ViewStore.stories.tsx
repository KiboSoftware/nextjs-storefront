import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewStore from './ViewStore'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'

export default {
  title: 'store/ViewStore',
  component: ViewStore,
} as ComponentMeta<typeof ViewStore>

const spLocations = locationCollectionMock.spLocations?.items || []

const Template: ComponentStory<typeof ViewStore> = ({ ...args }) => <ViewStore {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  spLocations,
  handleSetStore: () => '',
}
