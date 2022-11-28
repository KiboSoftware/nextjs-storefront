import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import WishlistPopover from './WishlistPopover'

export default {
  title: 'Dialogs/WishlistPopover',
  component: WishlistPopover,
} as ComponentMeta<typeof WishlistPopover>

const Template: ComponentStory<typeof WishlistPopover> = ({ ...args }) => (
  <WishlistPopover {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  isInWishlist: true,
}
