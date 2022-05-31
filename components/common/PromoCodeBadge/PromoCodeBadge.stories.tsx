import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PromoBadge from './PromoBadge'
import { PromoCodeBadge } from './PromoCodeBadge'

export default {
  title: 'Common/PromoCodeBadge',
} as ComponentMeta<typeof PromoCodeBadge>

const Template: ComponentStory<typeof PromoCodeBadge> = (args) => {
  const { errorPromo } = args
  const [couponList, setCouponList] = useState<any>([])
  const onRemoveCouponCode = (list: any) => {
    setCouponList((coupon: any) => coupon.filter((item: any) => item !== list))
  }
  const onApplyCouponCode = (promo: any) => {
    setCouponList((e: any) => [...e, promo])
  }

  return (
    <>
      <PromoCodeBadge
        onApplyCouponCode={onApplyCouponCode}
        onRemoveCouponCode={onRemoveCouponCode}
        couponList={couponList}
        errorPromo={errorPromo}
      />
    </>
  )
}
const BadgeTemplate: ComponentStory<typeof PromoBadge> = (args) => <PromoBadge {...args} />

export const PromocodeBadgeComponent = Template.bind({})
export const PromocodeBadge = BadgeTemplate.bind({})

PromocodeBadgeComponent.args = {
  errorPromo: '100%OFFEVERYTHING',
}

PromocodeBadge.args = {
  promoCode: 'SAVE50',
}
