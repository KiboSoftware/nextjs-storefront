import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuotesTemplate from './QuotesTemplate'
import { quotesMock } from '@/__mocks__/stories/quotesMock'

// Common
export default {
  title: 'Page Templates/B2B/QuotesTemplate',
  component: QuotesTemplate,
  argTypes: {
    setQuotesSearchParam: { action: 'setQuotesSearchParam' },
  },
} as ComponentMeta<typeof QuotesTemplate>

const Template: ComponentStory<typeof QuotesTemplate> = (args) => <QuotesTemplate {...args} />

export const Common = Template.bind({})

Common.args = {
  quoteCollection: quotesMock,
  filters: {
    expirationDate: '',
    createDate: '',
    status: '',
    name: '',
    number: '',
  },
  sortingValues: {
    selected: '',
    options: [
      { value: 'First Created', id: 'first created' },
      { value: 'Last Created', id: 'last created' },
      { value: 'Quote name: A-Z', id: 'name asc' },
      { value: 'Quote name: Z-A', id: 'name desc' },
      { value: 'Quote number: Low-High', id: 'number asc' },
      { value: 'Quote number: High-Low', id: 'number desc' },
    ],
  },
}

export const QuotesTemplateMobile = Template.bind({})
QuotesTemplateMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}

QuotesTemplateMobile.args = {
  ...Common.args,
}
