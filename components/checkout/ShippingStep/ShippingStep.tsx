import React, { useEffect, useState } from 'react'

import { Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { ShippingMethod } from '@/components/checkout'
import { AddressForm, AddressList } from '@/components/common'
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
  const handleAddressSelect = (addressId: string) => {
    const selectedAddress = userShippingAddress?.find((address) => address.id === Number(addressId))
    if (selectedAddress?.id) {
      const contact: Contact = {
        id: selectedAddress.id,
        firstName: selectedAddress.firstName || '',
        lastNameOrSurname: selectedAddress.lastNameOrSurname || '',
        middleNameOrInitial: selectedAddress.middleNameOrInitial || '',
        email: selectedAddress.email || '',
        address: {
          ...(selectedAddress.address as any),
        },
        phoneNumbers: {
          ...(selectedAddress.phoneNumbers as any),
        },
      }
      handleSaveAddress({ contact })
    }
  }

  useEffect(() => {
    if (!validateForm) setStepStatusIncomplete()
  }, [validateForm])

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepStatus])

  useEffect(() => {
    isAddressFormValid && isShippingMethodSaved ? setStepStatusValid() : setStepStatusIncomplete()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddressFormValid, isShippingMethodSaved])

  return (
    <Stack data-testid="checkout-shipping" gap={2}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {t('shipping')}
      </Typography>
      {
        <AddressList
          radio={true}
          heading={t('common:your-default-shipping-address')}
          subHeading={t('common:previously-saved-shipping-addresses')}
          addresses={userShippingAddress}
          onAddressSelection={handleAddressSelect}
          selectedAddressId={contactProp?.id?.toString()}
        />
      }

      <AddressForm
        contact={contactProp as ContactForm}
        isUserLoggedIn={false}
        saveAddressLabel={t('save-shipping-address')}
        setAutoFocus={true}
        validateForm={validateForm}
        onSaveAddress={handleSaveAddress}
        onFormStatusChange={handleFormStatusChange}
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
