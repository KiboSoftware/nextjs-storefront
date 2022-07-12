import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Content from './Content'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'

export default {
  title: 'Dialogs/AddToCartDialog/Content',
  component: Content,
} as ComponentMeta<typeof Content>

const Template: ComponentStory<typeof Content> = ({ ...args }) => <Content {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  cartItem: cartItemMock,
}
