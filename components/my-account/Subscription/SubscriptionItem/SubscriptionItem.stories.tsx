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
  SnackbarContextProvider,
  SnackbarRoot,
  AuthContextProvider,
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

const Template: ComponentStory<typeof SubscriptionItem> = ({ ...args }) => (
  <ModalContextProvider>
    <SnackbarContextProvider>
      <AuthContextProvider>
        <DialogRoot />
        <SnackbarRoot />
        <SubscriptionItem {...args} />
      </AuthContextProvider>
    </SnackbarContextProvider>
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
