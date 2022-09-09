import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import WishlistTemplate from './WishlistTemplate'
import { wishlistMock } from '@/__mocks__/stories'
import { userMock } from '@/__mocks__/stories/userMock'

export default {
  title: 'Page Templates/Wishlist Template',
  component: WishlistTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof WishlistTemplate>

const Template: ComponentStory<typeof WishlistTemplate> = (args) => <WishlistTemplate {...args} />

export const Common = Template.bind({})
Common.args = {
  customerAccount: userMock?.customerAccount,
}

export const Empty = Template.bind({})

const emptyWishlist = { ...wishlistMock }
emptyWishlist.items = []
Empty.args = {
  customerAccount: userMock?.customerAccount,
}
Empty.parameters = {
  msw: {
    handlers: {
      wishlist: graphql.query('wishlists', (_req, res, ctx) => {
        return res(ctx.data({ wishlists: emptyWishlist }))
      }),
    },
  },
}
