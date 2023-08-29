import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewUserDetail from './ViewUserDetail'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'

import { B2BUser } from '@/lib/gql/types'

// Common
export default {
  title: 'My Account/B2B/ViewUserDetail',
  component: ViewUserDetail,
} as ComponentMeta<typeof ViewUserDetail>

const Template: ComponentStory<typeof ViewUserDetail> = (args) => <ViewUserDetail {...args} />

export const Common = Template.bind({})
Common.args = {
  b2BUser: customerB2BUserForPage0Mock?.items?.[0] as B2BUser,
}
