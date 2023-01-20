import React, { useEffect, useRef, useState } from 'react'

import { Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { ShippingMethod } from '@/components/checkout'
import { AddressDetailsView, AddressForm } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useUpdateCheckoutShippingInfoMutation, useShippingMethodsQueries } from '@/hooks'
import { DefaultId } from '@/lib/constants'
import { orderGetters, userGetters } from '@/lib/getters'

import type { CrOrder, CrContact, CustomerContact } from '@/lib/gql/types'

const buttonStyle = {
  width: '100%',
  maxWidth: '421px',
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

interface ShippingProps {
  setAutoFocus?: boolean
  checkout: CrOrder
  userShippingAddress?: CustomerContact[]
  isAuthenticated: boolean
}

const StandardShippingStep = (props: ShippingProps) => {
  const { checkout, userShippingAddress: addresses, isAuthenticated } = props

  const checkoutShippingContact = orderGetters.getShippingContact(checkout)
  const checkoutShippingMethodCode = orderGetters.getShippingMethodCode(checkout)
  const userShippingAddress = isAuthenticated
    ? userGetters.getUserShippingAddress(addresses as CustomerContact[])
    : []
  if (checkoutShippingContact && checkoutShippingContact.id === null) {
    checkoutShippingContact.id = DefaultId.ADDRESSID
  }
  const shipItems = orderGetters.getShipItems(checkout)
  const pickupItems = orderGetters.getPickupItems(checkout)

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
    userGetters.getAllShippingAddresses(
      checkoutShippingContact,
      userShippingAddress as CustomerContact[]
    )
  )
  const [shouldShowAddAddressButton, setShouldShowAddAddressButton] = useState<boolean>(
    Boolean(savedShippingAddresses?.length)
  )

  const defaultShippingAddress = userGetters.getDefaultShippingAddress(
    savedShippingAddresses as CustomerContact[]
  )
  const previouslySavedShippingAddress = userGetters.getOtherShippingAddress(
    savedShippingAddresses as CustomerContact[],
    defaultShippingAddress?.id as number
  )

  const { t } = useTranslation('common')
  const shippingAddressRef = useRef()

  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()
  const updateCheckoutShippingInfo = useUpdateCheckoutShippingInfoMutation()
  const { data: shippingMethods } = useShippingMethodsQueries(
    checkoutId,
    isNewAddressAdded,
    selectedShippingAddressId
  )

  const handleAddressValidationAndSave = () => setValidateForm(true)

  const handleSaveAddress = async ({ contact }: { contact: CrContact }) => {
    try {
      await updateCheckoutShippingInfo.mutateAsync({ checkout, contact })
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

  const handleSaveShippingMethod = async (shippingMethodCode: string) => {
    const shippingMethodName = shippingMethods.find(
      (method) => method.shippingMethodCode === shippingMethodCode
    )?.shippingMethodName as string

    try {
      await updateCheckoutShippingInfo.mutateAsync({
        checkout,
        contact: undefined,
        email: undefined,
        shippingMethodCode,
        shippingMethodName,
      })
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
      (address) => address?.id === Number(addressId)
    )
    if (selectedAddress?.id) {
      const contact: CrContact = {
        id: selectedAddress?.id,
        firstName: selectedAddress?.firstName || '',
        lastNameOrSurname: selectedAddress?.lastNameOrSurname || '',
        middleNameOrInitial: selectedAddress?.middleNameOrInitial || '',
        email: selectedAddress?.email || '',
        address: {
          ...(selectedAddress?.address as any),
        },
        phoneNumbers: {
          ...(selectedAddress?.phoneNumbers as any),
        },
      }
      handleSaveAddress({ contact })
    }
  }

  const handleAddNewAddress = () => {
    setShouldShowAddAddressButton(false)
    setIsNewAddressAdded(false)
  }

  const getSavedShippingAddressView = (
    address: CustomerContact,
    isPrimary?: boolean
  ): React.ReactNode => (
    <AddressDetailsView
      key={address?.id as number}
      radio={true}
      id={address?.id as number}
      isPrimary={isPrimary}
      firstName={address?.firstName as string}
      middleNameOrInitial={address?.middleNameOrInitial as string}
      lastNameOrSurname={address?.lastNameOrSurname as string}
      address1={address?.address?.address1 as string}
      address2={address?.address?.address2 as string}
      cityOrTown={address?.address?.cityOrTown as string}
      stateOrProvince={address?.address?.stateOrProvince as string}
      postalOrZipCode={address?.address?.postalOrZipCode as string}
      selected={selectedShippingAddressId?.toString()}
      handleRadioChange={handleAddressSelect}
    />
  )

  useEffect(() => {
    if (isNewAddressAdded)
      setSavedShippingAddresses(
        userGetters.getAllShippingAddresses(
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
          <Stack gap={2} width="100%">
            {defaultShippingAddress && (
              <>
                <Typography variant="h4" fontWeight={'bold'}>
                  {t('your-default-shipping-address')}
                </Typography>
                {getSavedShippingAddressView(defaultShippingAddress, true)}
              </>
            )}

            {previouslySavedShippingAddress?.length > 0 && (
              <>
                <Typography variant="h4" fontWeight={'bold'}>
                  {t('previously-saved-shipping-addresses')}
                </Typography>
                {previouslySavedShippingAddress?.map((address) => {
                  return address && getSavedShippingAddressView(address)
                })}
              </>
            )}

            <Button
              variant="contained"
              color="inherit"
              sx={{ width: { xs: '100%', sm: '50%' } }}
              onClick={handleAddNewAddress}
            >
              {t('add-new-address')}
            </Button>
          </Stack>
          {shippingMethods.length > 0 && (
            <ShippingMethod
              shipItems={shipItems}
              pickupItems={pickupItems}
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
              {t('cancel')}
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

export default StandardShippingStep
