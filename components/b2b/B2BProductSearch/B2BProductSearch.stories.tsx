import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import B2BProductSearch from './B2BProductSearch'

// Common
export default {
  title: 'B2B/B2BProductSearch',
  component: B2BProductSearch,
} as ComponentMeta<typeof B2BProductSearch>

const Template: ComponentStory<typeof B2BProductSearch> = (args) => <B2BProductSearch {...args} />

export const Common = Template.bind({})
