import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DetailsStep from '../DetailsStep/DetailsStep'
import MultiShippingStep from '../MultiShippingStep/MultiShippingStep'
import PaymentStep from '../PaymentStep/PaymentStep'
import ReviewStep from '../ReviewStep/ReviewStep'
import StandardShippingStep from '../StandardShippingStep/StandardShippingStep'
import CheckoutUITemplate from './CheckoutUITemplate'
import { orderMock, checkoutMock } from '@/__mocks__/stories'
import { CheckoutStepProvider } from '@/context'

import { Checkout, CrOrder } from '@/lib/gql/types'

export default {
  title: 'Page Templates/Checkout UI Template',
  component: CheckoutUITemplate,
  argTypes: {
    handleApplyCouponCode: { action: 'handleApplyCouponCode' },
    handleRemoveCouponCode: { action: 'handleRemoveCouponCode' },
  },
  decorators: [
    (Story) => (
      <div>
        <div
          style={{ height: '50px', position: 'sticky', top: 0, background: 'white', zIndex: 2000 }}
        ></div>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CheckoutUITemplate>

const Template: ComponentStory<typeof CheckoutUITemplate> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']} initialActiveStep={1}>
    <CheckoutUITemplate {...args}>
      <DetailsStep
        checkout={orderMock.checkout as CrOrder}
        updateCheckoutPersonalInfo={handleUpdateCheckoutPersonalInfo}
      />
      <StandardShippingStep
        checkout={orderMock.checkout as CrOrder}
        userShippingAddress={[]}
        isAuthenticated={true}
      />
      <PaymentStep checkout={orderMock.checkout} />
      <ReviewStep checkout={orderMock.checkout as CrOrder} onBackButtonClick={() => null} />
    </CheckoutUITemplate>
  </CheckoutStepProvider>
)

const handleUpdateCheckoutPersonalInfo = async () => undefined
const handleUpdateCheckoutShippingMethod = async () => undefined

const MultiShipTemplate: ComponentStory<typeof CheckoutUITemplate> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']} initialActiveStep={1}>
    <CheckoutUITemplate {...args}>
      <DetailsStep
        checkout={checkoutMock.checkout as Checkout}
        updateCheckoutPersonalInfo={handleUpdateCheckoutPersonalInfo}
      />
      <MultiShippingStep
        key={checkoutMock.checkout?.groupings?.map((group) => group?.id).join('')}
        checkout={checkoutMock.checkout as Checkout}
        userSavedShippingAddress={[]}
        isAuthenticated={true}
        shippingMethods={[]}
        createCheckoutDestination={() => null}
        onUpdateCheckoutShippingMethod={handleUpdateCheckoutShippingMethod}
      />
      {/* <PaymentStep checkout={checkoutMock.checkout as Checkout} />
      <ReviewStep checkout={checkoutMock.checkout as Checkout} onBackButtonClick={() => null} /> */}
    </CheckoutUITemplate>
  </CheckoutStepProvider>
)

export const Common = Template.bind({})
Common.args = {
  checkout: orderMock?.checkout,
}

export const MultiShip = MultiShipTemplate.bind({})
MultiShip.args = {
  checkout: checkoutMock?.checkout,
}
