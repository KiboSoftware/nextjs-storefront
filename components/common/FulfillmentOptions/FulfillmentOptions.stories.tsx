import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FulfillmentOptions from './FulfillmentOptions'

export default {
  title: 'Common/FulfillmentOptions',
  component: FulfillmentOptions,
} as ComponentMeta<typeof FulfillmentOptions>

const Template: ComponentStory<typeof FulfillmentOptions> = () => <FulfillmentOptions />

export const Common = Template.bind({})
