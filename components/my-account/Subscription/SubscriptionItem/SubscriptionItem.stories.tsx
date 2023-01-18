import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SubscriptionItem from './SubscriptionItem'
import { subscriptionItemMock } from '@/__mocks__/stories/subscriptionCollectionMock'
import { DialogRoot, ModalContextProvider, SnackbarContextProvider, SnackbarRoot } from '@/context'

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
      <DialogRoot />
      <SnackbarRoot />
      <SubscriptionItem {...args} />
    </SnackbarContextProvider>
  </ModalContextProvider>
)

export const Common = Template.bind({})

Common.args = {
  subscriptionDetailsData: subscriptionItemMock?.items,
}
