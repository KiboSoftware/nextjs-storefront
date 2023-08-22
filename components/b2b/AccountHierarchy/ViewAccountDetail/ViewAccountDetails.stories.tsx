import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewAccountDetails from './ViewAccountDetails'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

// Common
export default {
  title: 'B2B/AccountHierarchy/ViewAccountDetails',
  component: ViewAccountDetails,
} as ComponentMeta<typeof ViewAccountDetails>

const Template: ComponentStory<typeof ViewAccountDetails> = (args) => (
  <ViewAccountDetails {...args} />
)

export const Common = Template.bind({})
Common.args = {
  b2BAccount: b2BAccountHierarchyResult?.accounts?.[1],
}
