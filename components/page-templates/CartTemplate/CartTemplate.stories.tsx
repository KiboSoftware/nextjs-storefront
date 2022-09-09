import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import CartTemplate from './CartTemplate'
import { cartMock } from '@/__mocks__/stories/cartMock'
export default {
  title: 'Page Templates/Cart Template',
  component: CartTemplate,
  argTypes: { onChange: { action: 'onChange' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CartTemplate>

const Template: ComponentStory<typeof CartTemplate> = (args) => <CartTemplate {...args} />

export const Common = Template.bind({})
Common.args = {
  cart: cartMock.currentCart,
}
export const Empty = Template.bind({})

const emptyCart = { ...cartMock.currentCart }
emptyCart.items = []
Empty.args = {
  cart: emptyCart,
}
Empty.parameters = {
  msw: {
    handlers: {
      cart: graphql.query('cart', (_req, res, ctx) => {
        return res(ctx.data({ currentCart: emptyCart }))
      }),
    },
  },
}
