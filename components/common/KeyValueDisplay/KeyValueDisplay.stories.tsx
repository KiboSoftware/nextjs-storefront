import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KeyValueDisplay from './KeyValueDisplay'

import type { CrProductOption } from '@/lib/gql/types'

export default {
  title: 'Common/KeyValueDisplay',
  component: KeyValueDisplay,
} as ComponentMeta<typeof KeyValueDisplay>

const productOption: CrProductOption = {
  attributeFQN: 'Tenant~color',
  name: 'Color',
  value: 'Blue',
}

// Default Line Item
const Template: ComponentStory<typeof KeyValueDisplay> = (args) => <KeyValueDisplay {...args} />

export const Common = Template.bind({})
Common.args = {
  option: productOption,
}
