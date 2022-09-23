import React, { useEffect, useRef, useState } from 'react'

import { Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { ShippingMethod } from '@/components/checkout'
import { AddressDetailsView, AddressForm } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useUpdateCheckoutShippingInfo, useShippingMethods } from '@/hooks'
import { DefaultId } from '@/lib/constants'
import { checkoutGetters, userAddressGetters } from '@/lib/getters'
import { buildCheckoutShippingParams, ShippingParams } from '@/lib/helpers'

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
  isAuthenticated: boolean
}

const ShippingStep = (props: ShippingProps) => {
  const { checkout, userShippingAddress: addresses, isAuthenticated } = props

  const checkoutShippingContact = checkoutGetters.getShippingContact(checkout)
  const checkoutShippingMethodCode = checkoutGetters.getShippingMethodCode(checkout)
  const userShippingAddress = isAuthenticated
    ? (userAddressGetters.getUserShippingAddress(addresses) as CustomerContact[])
    : []
  if (checkoutShippingContact && checkoutShippingContact.id === null) {
    checkoutShippingContact.id = DefaultId.ADDRESSID
  }
  const shipItems = checkoutGetters.getShipItems(checkout)
  const pickupItems = checkoutGetters.getPickupItems(checkout)

  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [checkoutId, setCheckoutId] = useState<string | null | undefined>(undefined)
  const [isAddressFormValid, setIsAddressFormValid] = useState<boolean>(false)
  const [isNewAddressAdded, setIsNewAddressAdded] = useState<boolean>(false)
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number>(
    checkoutShippingContact?.id as number
  )
  const [savedShippingAddresses, setSavedShippingAddresses] = useState<
    CustomerContact[] | undefined
  >(
    userAddressGetters.getAllShippingAddresses(
      checkoutShippingContact,
      userShippingAddress as CustomerContact[]
    )
  )
  const [shouldShowAddAddressButton, setShouldShowAddAddressButton] = useState<boolean>(
    Boolean(savedShippingAddresses?.length)
  )

  const defaultShippingAddress = userAddressGetters.getDefaultShippingAddress(
    savedShippingAddresses as CustomerContact[]
  )
  const previouslySavedShippingAddress = userAddressGetters.getOtherShippingAddress(
    savedShippingAddresses as CustomerContact[],
    defaultShippingAddress?.id as number
  )

  const { t } = useTranslation(['checkout', 'common'])
  const shippingAddressRef = useRef()

  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()
  const updateCheckoutShippingInfo = useUpdateCheckoutShippingInfo()
  const { data: shippingMethods } = useShippingMethods(checkoutId, isNewAddressAdded)

  const handleAddressValidationAndSave = () => setValidateForm(true)

  const updateShippingInfo = async (params: ShippingParams) =>
    await updateCheckoutShippingInfo.mutateAsync(params)

  const handleSaveAddress = async ({ contact }: { contact: Contact }) => {
    const params = buildCheckoutShippingParams({ checkout, contact: contact })
    try {
      await updateShippingInfo(params)
      setCheckoutId(checkout?.id)
      setSelectedShippingAddressId((contact?.id as number) || DefaultId.ADDRESSID)
      setShouldShowAddAddressButton(true)
      setValidateForm(false)
      setIsNewAddressAdded(true)
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
      shippingAddressRef.current &&
        (shippingAddressRef.current as Element).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleStoreLocatorClick = () => {
    /**/
  }

  const handleFormStatusChange = (status: boolean) => setIsAddressFormValid(status)

  const handleAddressSelect = (addressId: string) => {
    const selectedAddress = savedShippingAddresses?.find(
      (address) => address.id === Number(addressId)
    )
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

  const handleAddNewAddress = () => {
    setShouldShowAddAddressButton(false)
    setIsNewAddressAdded(false)
  }

  const getSavedPaymentMethodView = (
    address: CustomerContact,
    isPrimary?: boolean
  ): React.ReactNode => (
    <AddressDetailsView
      key={address.id}
      radio={true}
      id={address.id as number}
      isPrimary={isPrimary}
      firstName={address.firstName as string}
      middleNameOrInitial={address.middleNameOrInitial as string}
      lastNameOrSurname={address.lastNameOrSurname as string}
      address1={address.address?.address1 as string}
      address2={address.address?.address2 as string}
      cityOrTown={address.address?.cityOrTown as string}
      stateOrProvince={address.address?.stateOrProvince as string}
      postalOrZipCode={address.address?.postalOrZipCode as string}
      selected={selectedShippingAddressId?.toString()}
      handleRadioChange={handleAddressSelect}
    />
  )

  useEffect(() => {
    if (isNewAddressAdded)
      setSavedShippingAddresses(
        userAddressGetters.getAllShippingAddresses(
          checkoutShippingContact,
          userShippingAddress as CustomerContact[]
        )
      )
  }, [checkoutShippingContact, isNewAddressAdded])

  useEffect(() => {
    if (selectedShippingAddressId) setCheckoutId(checkout.id)
  }, [selectedShippingAddressId])

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepStatus])

  useEffect(() => {
    selectedShippingAddressId && checkoutShippingMethodCode && shouldShowAddAddressButton
      ? setStepStatusValid()
      : setStepStatusIncomplete()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShippingAddressId, checkout, shouldShowAddAddressButton])

  return (
    <Stack data-testid="checkout-shipping" gap={2} ref={shippingAddressRef}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {t('shipping')}
      </Typography>
      {shouldShowAddAddressButton && (
        <>
          <Stack gap={2} width="100%" data-testid="saved-payment-methods">
            {defaultShippingAddress && (
              <>
                <Typography variant="h4" fontWeight={'bold'}>
                  {t('common:your-default-shipping-address')}
                </Typography>
                {getSavedPaymentMethodView(defaultShippingAddress, true)}
              </>
            )}

            <Typography variant="h4" fontWeight={'bold'}>
              {t('common:previously-saved-shipping-addresses')}
            </Typography>
            {previouslySavedShippingAddress?.length ? (
              previouslySavedShippingAddress.map((address) => {
                return getSavedPaymentMethodView(address)
              })
            ) : (
              <Typography variant="h4">{t('common:no-saved-addresses-yet')}</Typography>
            )}

            <Button
              variant="contained"
              color="inherit"
              sx={{ width: { xs: '100%', sm: '50%' } }}
              onClick={handleAddNewAddress}
            >
              {t('common:add-new-address')}
            </Button>
          </Stack>
          {shippingMethods.length > 0 && (
            <ShippingMethod
              shipItems={shipItems as CrOrderItem[]}
              pickupItems={pickupItems as CrOrderItem[]}
              orderShipmentMethods={[...shippingMethods]}
              selectedShippingMethodCode={checkoutShippingMethodCode}
              onShippingMethodChange={handleSaveShippingMethod}
              onStoreLocatorClick={handleStoreLocatorClick}
            />
          )}
        </>
      )}
      {!shouldShowAddAddressButton && (
        <>
          <AddressForm
            isUserLoggedIn={false}
            saveAddressLabel={t('save-shipping-address')}
            setAutoFocus={true}
            validateForm={validateForm}
            onSaveAddress={handleSaveAddress}
            onFormStatusChange={handleFormStatusChange}
          />
          <Stack pl={1} gap={2} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShouldShowAddAddressButton(true)}
            >
              {t('common:cancel')}
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{ ...buttonStyle }}
              style={{ textTransform: 'none' }}
              onClick={handleAddressValidationAndSave}
              {...(!isAddressFormValid && { disabled: true })}
            >
              {t('save-shipping-address')}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default ShippingStep
