import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuoteHistory from './QuotesHistory'
import { quoteMock } from '@/__mocks__/stories/quoteMock'

import { AuditRecord } from '@/lib/gql/types'

// Common
export default {
  title: 'B2B/Quotes/QuoteHistory',
  component: QuoteHistory,
} as ComponentMeta<typeof QuoteHistory>

const Template: ComponentStory<typeof QuoteHistory> = (args) => <QuoteHistory {...args} />

export const Common = Template.bind({})

Common.args = {
  auditHistory: quoteMock.auditHistory as AuditRecord[],
}
