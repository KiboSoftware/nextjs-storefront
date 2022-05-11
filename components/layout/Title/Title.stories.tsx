import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Title from './Title'

// Common
export default {
  title: 'Layout/Title',
  component: Title,
} as ComponentMeta<typeof Title>

const listItem = {
  heading: 'suggestions',
  code: 'Product Code',
  name: 'Product Name',
}

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />

// Default
export const Common = Template.bind({})
Common.args = listItem
