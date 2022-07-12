import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FulfillmentOptions from './FulfillmentOptions'
import { fulfillmentOptionsMock } from '@/__mocks__/stories/fulfillmentOptionsMock'

export default {
  title: 'Common/FulfillmentOptions',
  component: FulfillmentOptions,
} as ComponentMeta<typeof FulfillmentOptions>

const Template: ComponentStory<typeof FulfillmentOptions> = ({ ...args }) => (
  <FulfillmentOptions {...args} />
)

export const Common = Template.bind({})

Common.args = {
  fulfillmentOptions: fulfillmentOptionsMock,
}
