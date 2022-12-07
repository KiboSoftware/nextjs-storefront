import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MySubscriptionTemplate from './MySubscriptionTemplate'
import { subscriptionResponse } from '@/__mocks__/stories/subscriptionMock'

export default {
  title: 'Page Templates/MySubscription Template',
  component: MySubscriptionTemplate,
  argTypes: { onChange: { action: 'onChange' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MySubscriptionTemplate>

const Template: ComponentStory<typeof MySubscriptionTemplate> = (args) => (
  <MySubscriptionTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {
  subscription: subscriptionResponse.subscription,
}
