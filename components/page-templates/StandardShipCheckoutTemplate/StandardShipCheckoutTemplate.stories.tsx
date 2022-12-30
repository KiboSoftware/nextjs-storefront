import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import StandardShipCheckoutTemplate from './StandardShipCheckoutTemplate'
import { orderMock } from '@/__mocks__/stories'
export default {
  title: 'Page Templates/StandardShip Checkout Template',
  component: StandardShipCheckoutTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof StandardShipCheckoutTemplate>

const Template: ComponentStory<typeof StandardShipCheckoutTemplate> = (args) => (
  <StandardShipCheckoutTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
}
