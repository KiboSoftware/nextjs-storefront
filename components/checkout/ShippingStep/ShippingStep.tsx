import React, { useEffect, useRef, useState } from 'react'

import { Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { ShippingMethod, AddressList } from '@/components/checkout'
import { AddressForm } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useUpdateCheckoutShippingInfo, useShippingMethods } from '@/hooks'
import { checkoutGetters } from '@/lib/getters'
import { buildCheckoutShippingParams, ShippingParams } from '@/lib/helpers'
import type { ContactForm } from '@/lib/types'

import type { Order, CrOrderItem, Contact, CustomerContact } from '@/lib/gql/types'

const buttonStyle = {
  width: '100%',
  maxWidth: '421px',
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined
interface ShippingProps {
  setAutoFocus?: boolean
  checkout: Order
  userShippingAddress?: CustomerContact[]
}

const ShippingStep = (props: ShippingProps) => {
  const { checkout, userShippingAddress } = props

  const shippingBlockRef = useRef()

  const contactProp = checkoutGetters.getShippingContact(checkout)
  const shipItems = checkoutGetters.getShipItems(checkout)
  const pickupItems = checkoutGetters.getPickupItems(checkout)

  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [checkoutId, setCheckoutId] = useState<string | null | undefined>(undefined)
  const [isAddressFormValid, setIsAddressFormValid] = useState<boolean>(false)
  const [isShippingMethodSaved, setIsShippingMethodSaved] = useState<boolean>(false)

  const { t } = useTranslation(['checkout', 'common'])

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
      setStepStatusIncomplete()
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
      shippingBlockRef?.current &&
        (shippingBlockRef.current as Element).scrollIntoView({ behavior: 'smooth' })
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
  const handleAddressSelect = (_addressId: string) => {
    // do your stuff for the selected address
  }

  useEffect(() => {
    if (!validateForm) setStepStatusIncomplete()
  }, [validateForm])

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
    <Stack data-testid="checkout-shipping" gap={2} ref={shippingBlockRef}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {t('shipping')}
      </Typography>
      {
        <AddressList
          radio={true}
          heading={t('common:your-default-shipping-address')}
          subHeading={t('common:previously-saved-shipping-addresses')}
          addresses={userShippingAddress}
          radioGroupTitle={'Your default silling dddress'}
          onAddressSelection={handleAddressSelect}
          selectedAddressId={''}
        />
      }

      <AddressForm
        contact={contactProp as ContactForm}
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
