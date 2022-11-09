import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewProductItemsWithAddresses from './ReviewProductItemsWithAddresses'
import { orderMock } from '@/__mocks__/stories/orderMock'

import type { CrOrderItem } from '@/lib/gql/types'

export default {
  title: 'Common/ReviewProductItemsWithAddresses',
  component: ReviewProductItemsWithAddresses,
  argTypes: {},
} as ComponentMeta<typeof ReviewProductItemsWithAddresses>

const orderItems = orderMock?.checkout?.items

// Default Line Item
const Template: ComponentStory<typeof ReviewProductItemsWithAddresses> = (args) => (
  <ReviewProductItemsWithAddresses {...args} />
)

export const Common = Template.bind({})
Common.args = {
  items: orderItems as CrOrderItem[],
}
