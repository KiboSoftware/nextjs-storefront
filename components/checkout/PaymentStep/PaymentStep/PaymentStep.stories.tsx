import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentStep from './PaymentStep'

export default {
  title: 'checkout/PaymentStep',
  component: PaymentStep,
} as ComponentMeta<typeof PaymentStep>

const Template: ComponentStory<typeof PaymentStep> = (args) => <PaymentStep {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  contact: undefined,
  isUserLoggedIn: true,
}
