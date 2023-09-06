import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuoteCommentThreadDialog from './QuotesCommentThreadDialog'
import { quoteMock } from '@/__mocks__/stories/quoteMock'

export default {
  title: 'Dialogs/B2B/QuoteCommentThreadDialog',
  component: QuoteCommentThreadDialog,
  argTypes: { closeModal: { action: 'closeModal' } },
} as ComponentMeta<typeof QuoteCommentThreadDialog>

const Template: ComponentStory<typeof QuoteCommentThreadDialog> = ({ ...args }) => (
  <QuoteCommentThreadDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  comments: quoteMock.comments,
  userId: quoteMock.userId as string,
  status: 'Pending',
  mode: 'edit',
}
