import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { b } from 'msw/lib/SetupApi-f4099ef3'

import AccountsTable from './AccountsTable'
import { getB2BContactsMock } from '@/__mocks__/stories/getB2BContactsMock'
import { quotesMock } from '@/__mocks__/stories/quotesMock'

export default {
  title: 'B2B/Quotes/AccountsTable',
  component: AccountsTable,
  argTypes: {
    setB2BContactsSearchParam: { action: 'setB2BContactsSearchParam' },
  },
} as ComponentMeta<typeof AccountsTable>

const Template: ComponentStory<typeof AccountsTable> = (args) => <AccountsTable {...args} />

export const Common = Template.bind({})

Common.args = {
  b2bContacts: getB2BContactsMock,
}

export const Mobile = Template.bind({})

Mobile.args = {
  ...Common.args,
}

Mobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
