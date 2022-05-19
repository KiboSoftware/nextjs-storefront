import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingStep from './ShippingStep'

// Common
export default {
  title: 'Checkout/ShippingStep',
  component: ShippingStep,
} as ComponentMeta<typeof ShippingStep>

const Template: ComponentStory<typeof ShippingStep> = (args) => <ShippingStep {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  setAutoFocus: false,
  stepperStatus: 'INVALID',
  checkout: undefined,
  onCompleteCallback: () => console.log('called onCompleteCallback on shipping: '),
}
