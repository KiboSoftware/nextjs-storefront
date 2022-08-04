import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import WishlistTemplate from './WishlistTemplate'
import { userMock } from '@/__mocks__/stories/userMock'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'

export default {
  title: 'Page Templates/Wishlist Template',
  component: WishlistTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof WishlistTemplate>

const Template: ComponentStory<typeof WishlistTemplate> = (args) => <WishlistTemplate {...args} />
const mockWishlist = wishlistMock?.items[0]

export const Common = Template.bind({})
Common.args = {
  wishlists: mockWishlist,
  customerAccount: userMock?.customerAccount,
}
