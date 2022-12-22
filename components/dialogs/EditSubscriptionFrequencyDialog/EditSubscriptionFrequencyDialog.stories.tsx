import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import EditSubscriptionFrequencyDialog from './EditSubscriptionFrequencyDialog'
import { subscriptionCollectionMock } from '@/__mocks__/stories/subscriptionCollectionMock'

import { SbProductPropertyValue, SbSubscriptionItem } from '@/lib/gql/types'

export default {
  title: 'Dialogs/Edit Subscription Frequency Dialog',
  component: EditSubscriptionFrequencyDialog,
} as ComponentMeta<typeof EditSubscriptionFrequencyDialog>

const Template: ComponentStory<typeof EditSubscriptionFrequencyDialog> = ({ ...args }) => (
  <EditSubscriptionFrequencyDialog {...args} />
)

// Common
const items = (subscriptionCollectionMock.subscriptions.items &&
  subscriptionCollectionMock.subscriptions.items[0] &&
  subscriptionCollectionMock.subscriptions.items[0].items &&
  subscriptionCollectionMock.subscriptions.items[0]?.items[0]) as SbSubscriptionItem

const values = items.product?.properties?.find(
  (property) => property?.name === 'Subscription Frequency'
)?.values as SbProductPropertyValue[]

export const Common = Template.bind({})

Common.args = {
  subscriptionId: '1',
  values,
}
