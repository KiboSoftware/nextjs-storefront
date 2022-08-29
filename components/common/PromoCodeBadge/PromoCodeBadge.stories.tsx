import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PromoBadge from './PromoBadge'
import PromoCodeBadge from './PromoCodeBadge'

export default {
  title: 'Common/PromoCodeBadge',
} as ComponentMeta<typeof PromoCodeBadge>

const Template: ComponentStory<typeof PromoCodeBadge> = (args) => {
  const { promoList = [], promoError, helpText } = args
  const [promoCodes, setPromoCodes] = useState<any>(promoList)
  const onRemoveCouponCode = (list: any) => {
    setPromoCodes((coupon: any) => coupon.filter((item: any) => item !== list))
  }
  const onApplyCouponCode = (promo: any) => {
    setPromoCodes((e: any) => [...e, promo])
  }

  return (
    <>
      <PromoCodeBadge
        onApplyCouponCode={onApplyCouponCode}
        onRemoveCouponCode={onRemoveCouponCode}
        promoList={promoCodes}
        promoError={promoError}
        helpText={helpText}
      />
    </>
  )
}
const BadgeTemplate: ComponentStory<typeof PromoBadge> = (args) => <PromoBadge {...args} />

export const PromocodeBadgeComponent = Template.bind({})
export const PromocodeErrorComponent = Template.bind({})
export const PromocodeBadge = BadgeTemplate.bind({})

PromocodeBadge.args = {
  promoCode: 'SAVE50',
}

PromocodeErrorComponent.args = {
  promoError: true,
  helpText: 'Oops, this code is not valid. Please try again.',
}
