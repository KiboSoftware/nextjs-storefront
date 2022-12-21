import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import CheckoutUITemplate from './CheckoutUITemplate'
import { checkoutMock } from '@/__mocks__/stories'
export default {
  title: 'Page Templates/Checkout UI Template',
  component: CheckoutUITemplate,
  argTypes: {
    handleApplyCouponCode: { action: 'handleApplyCouponCode' },
    handleRemoveCouponCode: { action: 'handleRemoveCouponCode' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CheckoutUITemplate>

const Template: ComponentStory<typeof CheckoutUITemplate> = (args) => (
  <CheckoutUITemplate {...args} />
)

export const Common = Template.bind({})