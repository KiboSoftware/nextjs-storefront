import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CardDetailsForm, { CardData } from './CardDetailsForm'

export default {
  component: CardDetailsForm,
  title: 'checkout/CardDetailsForm',
} as ComponentMeta<typeof CardDetailsForm>

const Template: ComponentStory<typeof CardDetailsForm> = (args) => <CardDetailsForm {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  onSaveCardData: (cardData: CardData) => cardData,
  stepperStatus: 'INCOMPLETE',
  onCompleteCallback: () => console.log('called onCompleteCallback : '),
}
