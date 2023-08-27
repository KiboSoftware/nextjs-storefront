import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import EmailQuoteDialog from './EmailQuoteDialog'

export default {
  title: 'Dialogs/B2B/EmailQuoteDialog',
  component: EmailQuoteDialog,
  argTypes: { closeModal: { action: 'closeModal' }, onEmailSend: { action: 'onEmailSend' } },
} as ComponentMeta<typeof EmailQuoteDialog>

const Template: ComponentStory<typeof EmailQuoteDialog> = ({ ...args }) => (
  <EmailQuoteDialog {...args} />
)

// Common
export const Common = Template.bind({})
