import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SubscriptionItemList from './SubscriptionItemList'
import { subscriptionCollectionMock } from '@/__mocks__/stories'

export default {
  title: 'Subscription/SubscriptionItemList',
  component: SubscriptionItemList,

  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SubscriptionItemList>

const Template: ComponentStory<typeof SubscriptionItemList> = (args) => (
  <SubscriptionItemList {...args} />
)

export const Common = Template.bind({})

Common.args = {
  subscriptionDetailsData: subscriptionCollectionMock.subscriptions,
}
