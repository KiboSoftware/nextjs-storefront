import React from 'react'

import { Grid } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuotesCommentThread from './QuotesCommentThread'
import { quoteMock } from '@/__mocks__/stories/quoteMock'

// Common
export default {
  title: 'B2B/Quotes/QuotesCommentThread',
  component: QuotesCommentThread,
  argTypes: {
    onAddComment: { action: 'onAddComment' },
  },
} as ComponentMeta<typeof QuotesCommentThread>

const Template: ComponentStory<typeof QuotesCommentThread> = (args) => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <QuotesCommentThread {...args} />
    </Grid>
  </Grid>
)

export const Common = Template.bind({})
Common.args = {
  comments: quoteMock.comments,
  userId: quoteMock.userId as string,
  mode: 'edit',
  status: 'Pending',
}
