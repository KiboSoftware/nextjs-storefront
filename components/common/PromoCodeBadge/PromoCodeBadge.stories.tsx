import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PromoBadge from './PromoBadge'
import PromoCodeBadge from './PromoCodeBadge'

export default {
  title: 'Common/PromoCodeBadge',
} as ComponentMeta<typeof PromoCodeBadge>

const Template: ComponentStory<typeof PromoCodeBadge> = (args) => <PromoCodeBadge {...args} />
const BadgeTemplate: ComponentStory<typeof PromoCodeBadge> = (args) => <PromoBadge {...args} />

export const PromocodeBadgeComponent = Template.bind({})
export const PromocodeBadge = BadgeTemplate.bind({})

PromocodeBadgeComponent.args = {
  isEnabled: false,
}

PromocodeBadge.args = {
  promoCode: 'SAVE50',
}
