import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import dayjs from 'dayjs'

import EditOrderDateDialog from './EditOrderDateDialog'

export default {
  title: 'Dialogs/Edit Order Date Dialog',
  component: EditOrderDateDialog,
} as ComponentMeta<typeof EditOrderDateDialog>

const Template: ComponentStory<typeof EditOrderDateDialog> = ({ ...args }) => (
  <EditOrderDateDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  subscriptionId: '1',
  orderDate: dayjs(),
}
