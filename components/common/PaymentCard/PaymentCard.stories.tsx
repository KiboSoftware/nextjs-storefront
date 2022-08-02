import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentCard from './PaymentCard'

export default {
  title: 'Common/PaymentCard',
  component: PaymentCard,
} as ComponentMeta<typeof PaymentCard>

const Template: ComponentStory<typeof PaymentCard> = (args) => <PaymentCard {...args} />

export const Common = Template.bind({})

Common.args = {
  title: 'Payment Method',
  cardNumberPart: '****************1234',
  expireMonth: 4,
  expireYear: 2026,
  cardType: 'VISA',
  radio: false,
}
