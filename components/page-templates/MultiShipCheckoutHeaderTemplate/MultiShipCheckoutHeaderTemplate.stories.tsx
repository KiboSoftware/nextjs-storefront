import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import MultiShipCheckoutHeaderTemplate from './MultiShipCheckoutHeaderTemplate'
import { checkoutMock } from '@/__mocks__/stories'
export default {
  title: 'Page Templates/MultiShip Checkout Header Template',
  component: MultiShipCheckoutHeaderTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MultiShipCheckoutHeaderTemplate>

const Template: ComponentStory<typeof MultiShipCheckoutHeaderTemplate> = () => (
  <MultiShipCheckoutHeaderTemplate />
)

export const Common = Template.bind({})
Common.args = checkoutMock.checkout
