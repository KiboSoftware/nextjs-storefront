import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewLists from './ViewLists'

export default {
  title: 'My Account / View Lists',
  component: ViewLists,
  argTypes: {
    onEditFormToggle: { action: 'onEditFormToggle' },
  },
} as ComponentMeta<typeof ViewLists>

const Template: ComponentStory<typeof ViewLists> = (args) => <ViewLists {...args} />

export const Common = Template.bind({})

Common.args = {
  isEditFormOpen: false,
}
