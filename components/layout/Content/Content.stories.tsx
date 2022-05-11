import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Content from './Content'

// Common
export default {
  title: 'Layout/Content',
  component: Content,
} as ComponentMeta<typeof Content>

const listItem = {
  heading: 'suggestions',
  code: 'ProductCode',
  name: 'Product Name',
}

const Template: ComponentStory<typeof Content> = (args) => <Content {...args} />

// Default
export const Common = Template.bind({})
Common.args = listItem
