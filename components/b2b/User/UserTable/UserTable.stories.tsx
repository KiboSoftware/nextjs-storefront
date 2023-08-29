import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserTable from './UserTable'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { userGetters } from '@/lib/getters'

import { B2BUser } from '@/lib/gql/types'

export default {
  component: UserTable,
  title: 'My Account/B2B/UserTable',
} as ComponentMeta<typeof UserTable>

const customerB2BUsers: B2BUser[] = userGetters.getCustomerB2BUsers(
  customerB2BUserForPage0Mock?.items as B2BUser[]
)

const Template: ComponentStory<typeof UserTable> = (args) => <UserTable {...args} />

// My Account
export const Table = Template.bind({})
Table.args = {
  mdScreen: true,
  b2bUsers: customerB2BUsers.map((customer: B2BUser, index: number) => ({
    ...customer,
    id: index,
  })),
}

export const TableMobile = Template.bind({})
TableMobile.args = {
  mdScreen: false,
  b2bUsers: customerB2BUsers.map((customer: B2BUser, index: number) => ({
    ...customer,
    id: index,
  })),
}
