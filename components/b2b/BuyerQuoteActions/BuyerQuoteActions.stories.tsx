import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import BuyerQuoteActions from './BuyerQuoteActions'
import { quoteMock } from '@/__mocks__/stories'
import { QuoteStatus } from '@/lib/constants'

import { Quote } from '@/lib/gql/types'

// Common
export default {
  title: 'B2B/Quotes/BuyerQuoteActions',
  component: BuyerQuoteActions,

  argTypes: {
    handleClearChanges: { handleClearChanges: { action: 'handleClearChanges' } },
    handleEditQuote: { handleEditQuote: { action: 'handleEditQuote' } },
    handleSubmitForApproval: { handleSubmitForApproval: { action: 'handleSubmitForApproval' } },
    handleGotoCheckout: { handleGotoCheckout: { action: 'handleGotoCheckout' } },
    handlePrint: { handlePrint: { action: 'handlePrint' } },
    mode: {
      options: ['create', 'edit', ''],
      control: { type: 'radio' },
    },
    status: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof BuyerQuoteActions>

const Template: ComponentStory<typeof BuyerQuoteActions> = (args) => <BuyerQuoteActions {...args} />

export const Pending = Template.bind({})
Pending.args = {
  hasDraft: true,
  mode: 'edit',
  status: 'Pending',
  isSubmitForApprovalEnabled: false,
}
export const InReview = Template.bind({})
InReview.args = {
  ...Pending.args,
  status: 'InReview',
}
export const ReadyForCheckout = Template.bind({})
ReadyForCheckout.args = {
  ...Pending.args,
  status: 'ReadyForCheckout',
}
export const Completed = Template.bind({})
Completed.args = {
  ...Pending.args,
  status: 'Completed',
}
export const Expired = Template.bind({})
Expired.args = {
  ...Pending.args,
  status: 'Expired',
}
