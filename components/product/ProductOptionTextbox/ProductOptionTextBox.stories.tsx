import React from 'react'

import { Box } from '@mui/system'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { productOptionTextBoxMock } from '../../../__mocks__/stories/productOptionTextBoxMock'
import ProductOptionTextBox, { ProductOptionTextBoxProps } from './ProductOptionTextBox'

export default {
  title: 'Product/Product Option TextBox',
  component: ProductOptionTextBox,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ProductOptionTextBox>

const Template: ComponentStory<typeof ProductOptionTextBox> = (args: ProductOptionTextBoxProps) => {
  const { onChange } = args
  return (
    <Box display={'flex'} flexDirection="column" gap={2}>
      {productOptionTextBoxMock.map((option) => (
        <ProductOptionTextBox key={option?.attributeFQN} option={option} onChange={onChange} />
      ))}
    </Box>
  )
}

export const Common = Template.bind({})
