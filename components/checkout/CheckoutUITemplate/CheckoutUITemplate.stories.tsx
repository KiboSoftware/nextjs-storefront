import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CheckoutUITemplate from './CheckoutUITemplate'
import DetailsStep from '../DetailsStep/DetailsStep'
import MultiShippingStep from '../MultiShippingStep/MultiShippingStep'
import PaymentStep from '../PaymentStep/PaymentStep'
import ReviewStep from '../ReviewStep/ReviewStep'
import StandardShippingStep from '../StandardShippingStep/StandardShippingStep'
import { checkoutMock, orderMock, userAddressResponse } from '@/__mocks__/stories'
import { CheckoutStepProvider } from '@/context'

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

const handleCreateOrder = async () => undefined
const handleUpdateCheckoutPersonalInfo = async () => undefined
const handleVoidPayment = async () => undefined
const handleAddPayment = async () => undefined

const Template: ComponentStory<typeof CheckoutUITemplate> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']} initialActiveStep={1}>
    <CheckoutUITemplate {...args}>
      <DetailsStep
        checkout={orderMock.checkout}
        updateCheckoutPersonalInfo={handleUpdateCheckoutPersonalInfo}
      />
      <StandardShippingStep
        checkout={orderMock.checkout}
        savedUserAddressData={userAddressResponse}
        isAuthenticated={true}
      />
      <PaymentStep
        checkout={orderMock.checkout}
        onVoidPayment={handleVoidPayment}
        onAddPayment={handleAddPayment}
      />
      <ReviewStep
        checkout={orderMock.checkout}
        shipItems={undefined}
        pickupItems={undefined}
        personalDetails={undefined}
        orderSummaryProps={undefined}
        isMultiShipEnabled={false}
        onCreateOrder={handleCreateOrder}
      />
    </CheckoutUITemplate>
  </CheckoutStepProvider>
)

export const Common = Template.bind({})
Common.args = {
  checkout: orderMock?.checkout,
}

const handleUpdateCheckoutShippingMethod = async () => undefined
const handleCreateCheckoutDestination = () => undefined
const MultiShipTemplate: ComponentStory<typeof CheckoutUITemplate> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']} initialActiveStep={1}>
    <CheckoutUITemplate {...args}>
      <DetailsStep
        checkout={checkoutMock.checkout}
        updateCheckoutPersonalInfo={handleUpdateCheckoutPersonalInfo}
      />
      <MultiShippingStep
        key={checkoutMock.checkout?.groupings?.map((group) => group?.id).join('')}
        checkout={checkoutMock.checkout}
        savedUserAddressData={userAddressResponse}
        isAuthenticated={true}
        shippingMethods={[]}
        createCheckoutDestination={handleCreateCheckoutDestination}
        onUpdateCheckoutShippingMethod={handleUpdateCheckoutShippingMethod}
      />
      <PaymentStep
        checkout={orderMock.checkout}
        onVoidPayment={handleVoidPayment}
        onAddPayment={handleAddPayment}
      />
      {/* <ReviewStep checkout={checkoutMock.checkout} onBackButtonClick={() => null} /> */}
    </CheckoutUITemplate>
  </CheckoutStepProvider>
)

export const MultiShip = MultiShipTemplate.bind({})
MultiShip.args = {
  checkout: checkoutMock?.checkout,
}
