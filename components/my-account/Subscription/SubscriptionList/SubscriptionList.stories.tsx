import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import SubscriptionList from './SubscriptionList'
import { noSubscriptionMock } from '@/__mocks__/stories/subscriptionCollectionMock'

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

export const NoSubscription = Template.bind({})

NoSubscription.parameters = {
  msw: {
    handlers: {
      subscriptions: graphql.query('getSubscriptions', (_req, res, ctx) => {
        return res(ctx.data(noSubscriptionMock))
      }),
    },
  },
}
