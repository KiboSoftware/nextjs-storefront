import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchStore from './SearchStore'

export default {
  title: 'store/SearchStore',
  component: SearchStore,
} as ComponentMeta<typeof SearchStore>

const Template: ComponentStory<typeof SearchStore> = ({ ...args }) => <SearchStore {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  handleSetStore: () => '',
}
