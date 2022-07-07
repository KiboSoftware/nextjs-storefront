import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Actions from './Actions'

export default {
  title: 'Dialogs/AddToCartDialog/Actions',
  component: Actions,
} as ComponentMeta<typeof Actions>

const Template: ComponentStory<typeof Actions> = ({ ...args }) => <Actions {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  onGoToCart: () => 'go to cart clicked',
  onContinueShopping: () => 'continue shopping clicked',
}
