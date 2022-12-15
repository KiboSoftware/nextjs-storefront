import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MultiShipCheckoutTemplate from './MultiShipCheckoutTemplate'
import { checkoutMock } from '@/__mocks__/stories'
export default {
  title: 'Page Templates/MultiShip Checkout Template',
  component: MultiShipCheckoutTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MultiShipCheckoutTemplate>

const Template: ComponentStory<typeof MultiShipCheckoutTemplate> = (args) => (
  <MultiShipCheckoutTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {
  checkout: checkoutMock.checkout,
}
