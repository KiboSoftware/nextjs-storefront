import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CardDetailsForm from './CardDetailsForm'
import { CardForm } from '@/lib/types'

export default {
  component: CardDetailsForm,
  title: 'checkout/CardDetailsForm',
} as ComponentMeta<typeof CardDetailsForm>

const Template: ComponentStory<typeof CardDetailsForm> = (args) => <CardDetailsForm {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  onSaveCardData: (cardData: CardForm) => cardData,
  setValidateForm: (isValidForm: boolean) => {
    console.log(isValidForm)
  },
  onFormStatusChange: (saveCardData) => {
    console.log(saveCardData)
  },
}
