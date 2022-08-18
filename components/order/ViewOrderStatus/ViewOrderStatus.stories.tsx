import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewOrderStatus from './ViewOrderStatus'

// Common
export default {
  title: 'Order/ViewOrderStatus',
  component: ViewOrderStatus,
} as ComponentMeta<typeof ViewOrderStatus>

const Template: ComponentStory<typeof ViewOrderStatus> = (args) => <ViewOrderStatus {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  lookupErrorMessage: undefined,
}

export const WithErrorMeesage = Template.bind({})
WithErrorMeesage.args = {
  lookupErrorMessage: 'Error 500',
}
