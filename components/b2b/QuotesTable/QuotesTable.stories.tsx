import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuotesTable from './QuotesTable'
import { quotesMock } from '@/__mocks__/stories/quotesMock'

export default {
  title: 'B2B/Quotes/QuotesTable',
  component: QuotesTable,
  argTypes: {
    backgroundColor: { control: 'color' },
    setQuotesSearchParam: { action: 'setQuotesSearchParam' },
  },
} as ComponentMeta<typeof QuotesTable>

const Template: ComponentStory<typeof QuotesTable> = (args) => <QuotesTable {...args} />

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

export const Mobile = Template.bind({})

Mobile.args = {
  ...Common.args,
}

Mobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
