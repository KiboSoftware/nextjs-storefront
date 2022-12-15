import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Subscription from './Subscription'
import { subscriptionResponse } from '@/__mocks__/stories/subscriptionMock'

export default {
  title: 'Subscription/Subscription',
  component: Subscription,
  argTypes: { onChange: { action: 'onChange' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Subscription>

const Template: ComponentStory<typeof Subscription> = (args) => <Subscription {...args} />

export const Common = Template.bind({})
Common.args = {
  subscription: subscriptionResponse.subscription,
}
