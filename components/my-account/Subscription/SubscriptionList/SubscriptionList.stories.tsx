import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SubscriptionList from './SubscriptionList'

export default {
  title: 'Subscription/SubscriptionList',
  component: SubscriptionList,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SubscriptionList>

const Template: ComponentStory<typeof SubscriptionList> = (args) => <SubscriptionList {...args} />

export const Common = Template.bind({})
