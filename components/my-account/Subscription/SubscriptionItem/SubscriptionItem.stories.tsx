import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import SubscriptionItem from './SubscriptionItem'
import { userAddressMock } from '@/__mocks__/stories'
import { customerAccountCardsMock } from '@/__mocks__/stories/customerAccountCardsMock'
import {
  subscriptionItemMock,
  subscriptionCollectionMock,
} from '@/__mocks__/stories/subscriptionCollectionMock'
import {
  DialogRoot,
  ModalContextProvider,
  RQNotificationContextProvider,
  SnackbarRoot,
  AuthContext,
} from '@/context'
import { subscriptionGetters } from '@/lib/getters'
import type { FulfillmentInfo } from '@/lib/types'

import type { Subscription } from '@/lib/gql/types'

export default {
  title: 'Subscription/SubscriptionItem',
  component: SubscriptionItem,

  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SubscriptionItem>

const userContextValues = {
  isAuthenticated: false,
  user: { id: 1012 },
  login: () => null,
  createAccount: () => null,
  logout: () => null,
}

const Template: ComponentStory<typeof SubscriptionItem> = ({ ...args }) => (
  <ModalContextProvider>
    <RQNotificationContextProvider>
      <AuthContext.Provider value={userContextValues}>
        <DialogRoot />
        <SnackbarRoot />
        <SubscriptionItem {...args} />
      </AuthContext.Provider>
    </RQNotificationContextProvider>
  </ModalContextProvider>
)

export const Common = Template.bind({})

Common.args = {
  subscriptionDetailsData: {
    ...subscriptionItemMock?.items,
  },
  fulfillmentInfoList: subscriptionCollectionMock?.subscriptions?.items?.map((subscription) =>
    subscriptionGetters.getFormattedAddress(subscription as Subscription)
  ) as FulfillmentInfo[],
}

Common.parameters = {
  msw: {
    handlers: {
      customerAccountCards: graphql.query('customerAccountCards', (_req, res, ctx) => {
        return res(ctx.data(customerAccountCardsMock))
      }),

      getUserAddresses: graphql.query('getUserAddresses', (_req, res, ctx) => {
        return res(ctx.data(userAddressMock))
      }),
    },
  },
}
