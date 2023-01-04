import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SubscriptionItem from './SubscriptionItem'
import { subscriptionItemMock } from '@/__mocks__/stories/subscriptionCollectionMock'

export default {
  title: 'Subscription/SubscriptionItem',
  component: SubscriptionItem,

  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SubscriptionItem>

const Template: ComponentStory<typeof SubscriptionItem> = (args) => <SubscriptionItem {...args} />

export const Common = Template.bind({})

Common.args = {
  subscriptionDetailsData: subscriptionItemMock?.items,
}
