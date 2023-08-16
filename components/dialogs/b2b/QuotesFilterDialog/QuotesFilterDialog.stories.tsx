import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuotesFilterDialog from './QuotesFilterDialog'

export default {
  title: 'Dialogs/B2B/QuotesFilterDialog',
  component: QuotesFilterDialog,
  argTypes: { closeModal: { action: 'closeModal' }, onFilterAction: { action: 'onFilterAction' } },
} as ComponentMeta<typeof QuotesFilterDialog>

const Template: ComponentStory<typeof QuotesFilterDialog> = ({ ...args }) => (
  <QuotesFilterDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  filters: {
    expirationDate: '',
    createDate: '',
    status: '',
    name: '',
    number: '',
  },
}
