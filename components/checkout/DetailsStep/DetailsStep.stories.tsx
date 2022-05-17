import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { orderMock } from '../../../__mocks__/stories/orderMock'
import DetailsStep from './DetailsStep'

// Common
export default {
  title: 'Checkout/DetailsStep',
  component: DetailsStep,
  argTypes: { onPersonalDetailsSave: { action: 'clicked' } },
} as ComponentMeta<typeof DetailsStep>

const Template: ComponentStory<typeof DetailsStep> = (args) => <DetailsStep {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  setAutoFocus: false,
  stepperStatus: 'INVALID',
  checkout: undefined,
  onCompleteCallback: () => console.log('called onCompleteCallback : '),
}

// With account fields
export const withAccountCreation = Template.bind({})
withAccountCreation.args = {
  setAutoFocus: false,
  stepperStatus: 'INVALID',
  onCompleteCallback: () => console.log('called onCompleteCallback : '),
  checkout: undefined,
}
