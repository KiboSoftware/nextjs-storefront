import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import StandardCheckoutHeaderTemplate from './StandardCheckoutHeaderTemplate'
import { checkoutMock } from '@/__mocks__/stories'
export default {
  title: 'Page Templates/Standard Checkout Header Template',
  component: StandardCheckoutHeaderTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof StandardCheckoutHeaderTemplate>

const Template: ComponentStory<typeof StandardCheckoutHeaderTemplate> = () => (
  <StandardCheckoutHeaderTemplate />
)

export const Common = Template.bind({})
Common.args = checkoutMock.checkout
