import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import WishlistTemplate from './WishlistTemplate'
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
