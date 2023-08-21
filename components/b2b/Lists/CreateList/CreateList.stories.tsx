import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CreateList from './CreateList'

export default {
  title: 'My Account / Create List',
  component: CreateList,
  argTypes: {
    openCreateForm: { action: 'openCreateForm' },
  },
} as ComponentMeta<typeof CreateList>

const Template: ComponentStory<typeof CreateList> = (args) => <CreateList {...args} />

export const Common = Template.bind({})

Common.args = {}
