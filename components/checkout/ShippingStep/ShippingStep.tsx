import React, { useEffect, useState } from 'react'

import { Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { ShippingMethod } from '@/components/checkout'
import { AddressForm } from '@/components/common'
import type { Contact } from '@/components/common/AddressForm/AddressForm'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useUpdateCheckoutShippingInfo, useShippingMethods } from '@/hooks'
import { buildCheckoutShippingParams, ShippingParams } from '@/lib/helpers'

import type { Order, CrOrderItem } from '@/lib/gql/types'

const buttonStyle = {
  width: '100%',
  maxWidth: '421px',
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined
interface ShippingProps {
  setAutoFocus?: boolean
  checkout: Order
}

const ShippingStep = (props: ShippingProps) => {
  const { checkout } = props

  const contact = checkout?.fulfillmentInfo?.fulfillmentContact as Contact

  const orderItems = checkout?.items
  const shipItems = orderItems?.filter((item) => item?.fulfillmentMethod === 'Ship')
  const pickupItems = orderItems?.filter((item) => item?.fulfillmentMethod === 'Pickup')

  const [validateForm, setValidateForm] = useState<boolean>(false)
  const { t } = useTranslation('checkout')
  const { stepStatus, setStepNext, setStepStatusComplete } = useCheckoutStepContext()

  const updateCheckoutShippingInfo = useUpdateCheckoutShippingInfo()
  const { data: shippingMethods } = useShippingMethods(checkout.id as string)
  const handleAddressValidationAndSave = () => setValidateForm(true)

  const updateShippingInfo = async (params: ShippingParams) => {
    await updateCheckoutShippingInfo.mutateAsync(params)
  }

  const handleSaveAddress = async ({ contact }: { contact: Contact }) => {
    const params = buildCheckoutShippingParams({ checkout, contact })

    try {
      await updateShippingInfo(params)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveShippingMethod = async (
    _shippingMethodName: string,
    shippingMethodCode: string
  ) => {
    const shippingMethodName = shippingMethods.find(
      (method) => method.shippingMethodCode === shippingMethodCode
    )?.shippingMethodName as string

    const params = buildCheckoutShippingParams({
      checkout,
      contact: undefined,
      email: undefined,
      shippingMethodCode,
      shippingMethodName,
    })

    try {
      await updateShippingInfo(params)
    } catch (error) {
      console.error(error)
    }
  }

  const handleStoreLocatorClick = () => {
    /**/
  }

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
  }, [stepStatus])

  return (
    <Stack data-testid="checkout-shipping" gap={2}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {t('shipping')}
      </Typography>

      <AddressForm
        contact={contact}
        isUserLoggedIn={false}
        saveAddressLabel={t('save-shipping-address')}
        setAutoFocus={true}
        checkout={checkout}
        validateForm={validateForm}
        onSaveAddress={handleSaveAddress}
        setValidateForm={setValidateForm}
      />

      <Button
        variant="contained"
        color="inherit"
        sx={{ ...buttonStyle }}
        style={{ textTransform: 'none' }}
        onClick={handleAddressValidationAndSave}
      >
        {t('save-shipping-address')}
      </Button>

      {shippingMethods.length > 0 && (
        <ShippingMethod
          shipItems={shipItems as CrOrderItem[]}
          pickupItems={pickupItems as CrOrderItem[]}
          orderShipmentMethods={shippingMethods}
          onShippingMethodChange={handleSaveShippingMethod}
          onStoreLocatorClick={handleStoreLocatorClick}
        />
      )}
    </Stack>
  )
}

export default ShippingStep
