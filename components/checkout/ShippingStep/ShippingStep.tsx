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

  const contactProp = checkoutGetters.getShippingContact(checkout) as Contact
  const shipItems = checkoutGetters.getShipItems(checkout)
  const pickupItems = checkoutGetters.getPickupItems(checkout)

  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [checkoutId, setCheckoutId] = useState<string | null | undefined>(undefined)
  const [isAddressFormValid, setIsAddressFormValid] = useState<boolean>(false)
  const [isShippingMethodSaved, setIsShippingMethodSaved] = useState<boolean>(false)

  const { t } = useTranslation('checkout')

  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()
  const updateCheckoutShippingInfo = useUpdateCheckoutShippingInfo()
  const { data: shippingMethods } = useShippingMethods(checkoutId)
  const handleAddressValidationAndSave = () => setValidateForm(true)

  const updateShippingInfo = async (params: ShippingParams) => {
    await updateCheckoutShippingInfo.mutateAsync(params)
  }

  const handleSaveAddress = async ({ contact }: { contact: Contact }) => {
    const params = buildCheckoutShippingParams({ checkout, contact: contact })

    try {
      await updateShippingInfo(params)
      setCheckoutId(checkout?.id)
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
      setIsShippingMethodSaved(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleStoreLocatorClick = () => {
    /**/
  }

  const handleFormStatusChange = (status: boolean) => {
    setIsAddressFormValid(status)
  }

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
  }, [stepStatus])

  useEffect(() => {
    isAddressFormValid && isShippingMethodSaved ? setStepStatusValid() : setStepStatusIncomplete()
  }, [isAddressFormValid, isShippingMethodSaved])

  return (
    <Stack data-testid="checkout-shipping" gap={2}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {t('shipping')}
      </Typography>

      <AddressForm
        contact={contactProp}
        isUserLoggedIn={false}
        saveAddressLabel={t('save-shipping-address')}
        setAutoFocus={true}
        checkout={checkout}
        validateForm={validateForm}
        onSaveAddress={handleSaveAddress}
        onFormStatusChange={handleFormStatusChange}
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
