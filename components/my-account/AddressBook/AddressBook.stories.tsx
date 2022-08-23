import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressBook from './AddressBook'

export default {
  title: 'My Account / Address Book',
  component: AddressBook,
} as ComponentMeta<typeof AddressBook>

const Template: ComponentStory<typeof AddressBook> = () => <AddressBook />

export const Common = Template.bind({})
