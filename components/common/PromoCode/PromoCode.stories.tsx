import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PromoCode from './PromoCode'

export default {
  title: 'Common/PromoCode',
} as ComponentMeta<typeof PromoCode>

const Template: ComponentStory<typeof PromoCode> = () => <PromoCode />

export const PromocodeComponent = Template.bind({})
