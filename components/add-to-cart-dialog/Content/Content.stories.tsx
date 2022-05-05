import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { cartItemMock } from '../../../__mocks__/stories/cartItemMock'
import Content from './Content'

export default {
  title: 'Add-To-Cart-Dialog/Content',
  component: Content,
} as ComponentMeta<typeof Content>

const Template: ComponentStory<typeof Content> = ({ ...args }) => <Content {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  cartItem: cartItemMock,
}
