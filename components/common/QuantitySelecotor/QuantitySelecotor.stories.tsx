import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuantitySelecotor from './QuantitySelecotor'

// Common
export default {
  component: QuantitySelecotor,
  title: 'Common/QuantitySelecotor',
}

const Template: ComponentStory<typeof QuantitySelecotor> = (args) => {
  const [quantity, setQuantity] = useState(args.quantity || 1)

  const onDecrease = () => setQuantity((q) => q - 1)
  const onIncrease = () => setQuantity((q) => q + 1)

  return <QuantitySelecotor quantity={quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
}

// Default
export const Default = Template.bind({})
Default.args = {
  quantity: 1,
}
