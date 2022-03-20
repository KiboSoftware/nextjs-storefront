import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { productOptionListValuesMock } from '../../../__mocks__/productOptionListMock'
import ProductOptionList from './ProductOptionList'

export default {
  title: 'Product/Product Option List',
  component: ProductOptionList,
  args: {
    optionValues: productOptionListValuesMock,
  },
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ProductOptionList>

const Template: ComponentStory<typeof ProductOptionList> = (args) => <ProductOptionList {...args} />

export const Default = Template.bind({})

export const WithError = Template.bind({})
WithError.args = {
  error: true,
}

export const WithErrorDescription = Template.bind({})
WithErrorDescription.args = {
  error: true,
  errorHelperText: 'value not valid',
}
