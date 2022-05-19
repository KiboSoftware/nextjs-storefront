import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { orderMock } from '../../../__mocks__/stories/orderMock'
import Checkout from './Checkout'

// Common
export default {
  title: 'Checkout/Checkout',
  component: Checkout,
} as ComponentMeta<typeof Checkout>

const Template: ComponentStory<typeof Checkout> = (args) => <Checkout {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: undefined,
}
