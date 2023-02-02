import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { productOptionSelectValuesMock } from '../../../__mocks__/stories/productOptionSelectMock'
import ProductOptionSelect, { ProductOptionSelectProps } from './ProductOptionSelect'

export default {
  title: 'Product/ProductOptionSelect',
  component: ProductOptionSelect,
  args: {
    optionValues: productOptionSelectValuesMock,
    attributeFQN: 'test-attributeFQN',
  },
  argTypes: { onDropdownChange: { action: 'onDropdownChange' } },
} as ComponentMeta<typeof ProductOptionSelect>

const Template: ComponentStory<typeof ProductOptionSelect> = (args: ProductOptionSelectProps) => (
  <ProductOptionSelect {...args} />
)

export const Common = Template.bind({})

export const WithError = Template.bind({})
WithError.args = {
  error: true,
}

export const WithErrorDescription = Template.bind({})
WithErrorDescription.args = {
  error: true,
  errorHelperText: 'value not valid',
}
