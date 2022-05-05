import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PromoCode from './PromoCode'

export default {
  title: 'Common/PromoCode',
} as ComponentMeta<typeof PromoCode>

const Template: ComponentStory<typeof PromoCode> = (args) => <PromoCode {...args} />

export const PromocodeBadge = Template.bind({})
export const PromocodeComponent = Template.bind({})

PromocodeBadge.args = {
  promoEnable: false,
}

PromocodeComponent.args = {
  promoEnable: true,
}
