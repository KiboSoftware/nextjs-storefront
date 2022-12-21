import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MySubscription from './MySubscription'

export default {
  title: 'Subscription/Subscription',
  component: MySubscription,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MySubscription>

const Template: ComponentStory<typeof MySubscription> = (args) => <MySubscription {...args} />

export const Common = Template.bind({})
