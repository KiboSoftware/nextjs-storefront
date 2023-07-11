import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboPagination from './KiboPagination'

// Common
export default {
  title: 'Common/KiboPagination',
  component: KiboPagination,
  argTypes: { onPaginationChange: { action: 'clicked' } },
} as ComponentMeta<typeof KiboPagination>

const Template: ComponentStory<typeof KiboPagination> = (args) => <KiboPagination {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  count: 10,
  pageSize: 300,
  startIndex: 0,
}
