import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CreateNewQuoteTemplate from './CreateNewQuoteTemplate'
import { quoteMock } from '@/__mocks__/stories'

import { Quote } from '@/lib/gql/types'

// Common
export default {
  title: 'Page Templates/B2B/CreateNewQuoteTemplate',
  component: CreateNewQuoteTemplate,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof CreateNewQuoteTemplate>

const Template: ComponentStory<typeof CreateNewQuoteTemplate> = (args) => (
  <CreateNewQuoteTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {
  quote: quoteMock?.items?.[0] as Quote,
}

export const CreateNewQuoteTemplateMobile = Template.bind({})
CreateNewQuoteTemplateMobile.args = {
  quote: quoteMock?.items?.[0] as Quote,
}
CreateNewQuoteTemplateMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
