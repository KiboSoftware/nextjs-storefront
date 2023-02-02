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
  const { onBlur } = args
  return (
    <Box display={'flex'} flexDirection="column" gap={2}>
      <ProductOptionTextBox
        key={productOptionTextBoxMock[0]?.attributeFQN}
        option={productOptionTextBoxMock[0]}
        onBlur={onBlur}
      />
    </Box>
  )
}

export const Common = Template.bind({})
