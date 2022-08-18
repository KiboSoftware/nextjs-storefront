import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SmallBanner from './SmallBanner'

export default {
  title: 'home/SmallBanner',
  component: SmallBanner,
} as ComponentMeta<typeof SmallBanner>

const Template: ComponentStory<typeof SmallBanner> = (args) => <SmallBanner {...args} />

export const Common = Template.bind({})

const bannerItems = {
  title: 'Save up to 50% + Free Shipping',
  subtitle: 'Valid through 10/31.',
  callToAction: { title: 'Shop Now', url: '/category/deals' },
  backgroundColor: '#A12E87',
}

Common.args = {
  bannerProps: bannerItems,
}
