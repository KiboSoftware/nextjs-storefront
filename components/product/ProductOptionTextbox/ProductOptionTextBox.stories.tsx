import React from 'react'

import { Box } from '@mui/system'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptionTextBox from './ProductOptionTextBox'
import { options } from '@/__mocks__/productOptionTextBoxMock'

const onChangeMock = () => {}

export default {
  title: 'Product/Product Option TextBox',
  component: ProductOptionTextBox,
  argTypes: { selectOption: { action: 'selectOption' } },
} as ComponentMeta<typeof ProductOptionTextBox>

const Template: ComponentStory<typeof ProductOptionTextBox> = (args) => (
  <Box display={'flex'} flexDirection="column" gap={2}>
    {options.map((option) => (
      <ProductOptionTextBox key={option?.attributeFQN} option={option} onChange={onChangeMock} />
    ))}
  </Box>
)

export const Default = Template.bind({})
