import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuoteHistoryDialog from './QuotesHistoryDialog'

export default {
  title: 'Dialogs/B2B/QuoteHistoryDialog',
  component: QuoteHistoryDialog,
  argTypes: { closeModal: { action: 'closeModal' } },
} as ComponentMeta<typeof QuoteHistoryDialog>

const Template: ComponentStory<typeof QuoteHistoryDialog> = ({ ...args }) => (
  <QuoteHistoryDialog {...args} />
)

// Common
export const Common = Template.bind({})
