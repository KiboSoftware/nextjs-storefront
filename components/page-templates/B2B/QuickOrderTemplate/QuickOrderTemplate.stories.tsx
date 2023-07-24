import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuickOrderTemplate from './QuickOrderTemplate'

// Common
export default {
  title: 'Page Templates/B2B/QuickOrderTemplate',
  component: QuickOrderTemplate,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof QuickOrderTemplate>

const Template: ComponentStory<typeof QuickOrderTemplate> = (args) => (
  <QuickOrderTemplate {...args} />
)

export const Common = Template.bind({})

export const QuickOrderTemplateMobile = Template.bind({})
QuickOrderTemplateMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
