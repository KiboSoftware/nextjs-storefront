import React from 'react'

import { Box } from '@mui/system'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { productOptionTextBoxMock } from '../../../__mocks__/productOptionTextBoxMock'
import ProductOptionTextBox from './ProductOptionTextBox'

const onChangeMock = () => {}

export default {
  title: 'Product/Product Option TextBox',
  component: ProductOptionTextBox,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ProductOptionTextBox>

const Template: ComponentStory<typeof ProductOptionTextBox> = (args) => (
  <Box display={'flex'} flexDirection="column" gap={2}>
    {productOptionTextBoxMock.map((option) => (
      <ProductOptionTextBox key={option?.attributeFQN} option={option} onChange={onChangeMock} />
    ))}
  </Box>
)

export const Default = Template.bind({})
