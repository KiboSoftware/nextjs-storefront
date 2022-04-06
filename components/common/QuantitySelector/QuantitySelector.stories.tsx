import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuantitySelector from './QuantitySelector'

// Common
export default {
  component: QuantitySelector,
  title: 'Common/QuantitySelector',
} as ComponentMeta<typeof QuantitySelector>

const Template: ComponentStory<typeof QuantitySelector> = (args) => {
  const [quantity, setQuantity] = useState(args.quantity || 1)

  const onDecrease = () => setQuantity((q) => q - 1)
  const onIncrease = () => setQuantity((q) => q + 1)

  return (
    <QuantitySelector
      quantity={quantity}
      label={args.label}
      onDecrease={onDecrease}
      onIncrease={onIncrease}
    />
  )
}

// Default
export const Default = Template.bind({})
Default.args = {
  quantity: 1,
  maxQuantity: 5,
}

export const withQtyLabel = Template.bind({})
withQtyLabel.args = {
  ...Default.args,
  label: 'Qty:',
}
