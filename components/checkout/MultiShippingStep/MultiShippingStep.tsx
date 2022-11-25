import React, { useEffect, useRef, useState } from 'react'

import { Stack, Button, Typography, SxProps, Box } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

import { ShippingMethod } from '@/components/checkout'
import {
  AddressDetailsView,
  AddressForm,
  KiboRadio,
  ProductItemWithAddressList,
  ShippingGroupsWithMethod,
} from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useUpdateCheckoutItemDestinationMutations } from '@/hooks'
import { DefaultId } from '@/lib/constants'
import { orderGetters, userGetters, checkoutGetters } from '@/lib/getters'

import type { CrOrderItem, Contact, CustomerContact, Checkout } from '@/lib/gql/types'

const buttonStyle = {
  width: '100%',
  maxWidth: '421px',
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

interface ShippingProps {
  setAutoFocus?: boolean
  checkout: Checkout
  userShippingAddress?: CustomerContact[]
  isAuthenticated: boolean
  updateCheckoutShippingInfo: (params: any) => void
  shippingMethods: any
  checkoutId?: string
  isNewAddressAdded: boolean
  selectedShippingAddressId: string
  setCheckoutId: (params: any) => void
  setIsNewAddressAdded: (params: any) => void
  setSelectedShippingAddressId: (params: any) => void
  createCheckoutDestination: any
}

const MultiShippingStep = (props: ShippingProps) => {
  const {
    checkout,
    userShippingAddress: addresses,
    isAuthenticated,
    updateCheckoutShippingInfo,
    shippingMethods,
    isNewAddressAdded,
    selectedShippingAddressId,
    setCheckoutId,
    setIsNewAddressAdded,
    setSelectedShippingAddressId,

    createCheckoutDestination,
  } = props
  const { publicRuntimeConfig } = getConfig()

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
  const [isAddressFormValid, setIsAddressFormValid] = useState<boolean>(false)

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
  const shipOptions = publicRuntimeConfig.shipOptions
  const initialShippingOption = checkoutGetters?.getInitialShippingOption(checkout, shipOptions)
  const [shippingOption, setShippingOption] = useState<string>(initialShippingOption)

  const [showMultiShipContinueButton, setShowMultiShipContinueButton] = useState<boolean>(true)

  // const defaultShippingAddress = userGetters.getDefaultShippingAddress(
  //   savedShippingAddresses as CustomerContact[]
  // )
  // const previouslySavedShippingAddress = userGetters.getOtherShippingAddress(
  //   savedShippingAddresses as CustomerContact[],
  //   defaultShippingAddress?.id as number
  // )

  const multiShipAddresses = checkoutGetters.getMultiShipAddresses({
    checkout,
    savedShippingAddresses: userShippingAddress,
  })

  const { t } = useTranslation('common')
  const shippingAddressRef = useRef()

  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()

  const handleAddressValidationAndSave = () => setValidateForm(true)

  const handleSaveAddress = async ({ contact }: { contact: Contact }) => {
    try {
      await updateCheckoutShippingInfo({ checkout, contact })

      setCheckoutId(checkout?.id)
      setSelectedShippingAddressId((contact?.id as number) || DefaultId.ADDRESSID) // set Selected MultiShipaddress
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
      (method: any) => method.shippingMethodCode === shippingMethodCode
    )?.shippingMethodName as string

    try {
      await updateCheckoutShippingInfo({
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
    /* to remove */
  }

  const handleFormStatusChange = (status: boolean) => setIsAddressFormValid(status)

  const handleAddressSelect = (destinationIdOrAddressId: string) => {
    checkout?.items?.forEach((item) => {
      handleCreateOrSetDestinationAddress(
        item?.id?.toString(),
        destinationIdOrAddressId?.toString()
      )
    })
  }

  const handleAddNewAddress = () => {
    setShouldShowAddAddressButton(false)
    setIsNewAddressAdded(false)
  }

  const radioOptions = shipOptions.map((option: any) => ({
    value: option.value,
    name: option.name,
    label: <Typography variant="body2">{option.label}</Typography>,
  }))

  const onChangeShippingOption = (option: string) => {
    if (checkout?.groupings?.length > 1 && option === shipOptions[0].value) {
      const defaultDestinationId = checkout?.groupings[0]?.destinationId

      checkout?.items?.forEach((item) => {
        handleCreateOrSetDestinationAddress(item?.id?.toString(), defaultDestinationId)
      })
    }

    setShippingOption(option)
  }

  const getSavedShippingAddressView = (contact: any, isPrimary?: boolean): React.ReactNode => {
    const { destinationId, address } = contact
    return (
      <AddressDetailsView
        key={destinationId || address?.id}
        radio={true}
        id={destinationId || address?.id}
        isPrimary={isPrimary}
        firstName={address?.firstName as string}
        middleNameOrInitial={address?.middleNameOrInitial as string}
        lastNameOrSurname={address?.lastNameOrSurname as string}
        address1={address?.address?.address1 as string}
        address2={address?.address?.address2 as string}
        cityOrTown={address?.address?.cityOrTown as string}
        stateOrProvince={address?.address?.stateOrProvince as string}
        postalOrZipCode={address?.address?.postalOrZipCode as string}
        selected={checkout?.groupings[0]?.destinationId as string}
        handleRadioChange={handleAddressSelect}
      />
    )
  }

  const updateCheckoutItemDestination = useUpdateCheckoutItemDestinationMutations()

  const handleCreateOrSetDestinationAddress = async (id: string, value: string) => {
    const existingDestinationAddress = checkout?.destinations?.find(
      (destination) => destination?.id === value
    )
    let destinationId = existingDestinationAddress?.id

    if (!existingDestinationAddress?.id) {
      const existingAddress = userShippingAddress?.find(
        (shippingAddress) => shippingAddress?.id?.toString() === value
      )

      const { accountId, types, ...rest } = existingAddress

      const newDestination = await createCheckoutDestination.mutateAsync({
        checkoutId: checkout?.id as string,
        destinationInput: {
          destinationContact: rest,
        },
      })
      destinationId = newDestination?.id
    }

    await updateCheckoutItemDestination.mutateAsync({
      itemId: id,
      destinationId: destinationId as string,
      checkoutId: checkout?.id as string,
    })
  }

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
        {!showMultiShipContinueButton ? t('shipping-address') : t('shipping')}
      </Typography>
      {/* Options ship to home / multi ship */}
      {showMultiShipContinueButton && (
        <KiboRadio
          radioOptions={radioOptions}
          selected={shippingOption}
          onChange={onChangeShippingOption}
        />
      )}

      {/* Ship to Home / standard shipping in multishipping  */}
      {shippingOption === 'ShipToHome' && (
        <>
          {shouldShowAddAddressButton && (
            <>
              <Stack gap={2} width="100%">
                {/* {defaultShippingAddress && (
                  <>
                    <Typography variant="h4" fontWeight={'bold'}>
                      {t('your-default-shipping-address')}
                    </Typography>
                    {getSavedShippingAddressView(defaultShippingAddress, true)}
                  </>
                )} */}

                {multiShipAddresses?.length > 0 && (
                  <>
                    <Typography variant="h4" fontWeight={'bold'}>
                      {t('previously-saved-shipping-addresses')}
                    </Typography>
                    {multiShipAddresses?.map((address) => {
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
              {shippingMethods && shippingMethods[0]?.shippingRates.length > 0 && (
                <ShippingMethod
                  shipItems={shipItems as CrOrderItem[]}
                  pickupItems={pickupItems as CrOrderItem[]}
                  orderShipmentMethods={[...shippingMethods[0].shippingRates]}
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
        </>
      )}
      {/* End Ship to Home / standard shipping in multishipping  */}

      {/* Muti Ship  Section */}
      {shippingOption === 'ShipToMultiAddress' && (
        <Stack>
          {showMultiShipContinueButton && (
            <>
              <ProductItemWithAddressList
                checkout={checkout}
                multiShipAddresses={multiShipAddresses}
                createOrSetDestinationAddress={handleCreateOrSetDestinationAddress}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ maxWidth: '421px', width: '100%' }}
                onClick={() => setShowMultiShipContinueButton(false)}
              >
                {t('continue')}
              </Button>
            </>
          )}
          {!showMultiShipContinueButton && (
            <ShippingGroupsWithMethod
              checkout={checkout}
              onClickEdit={() => setShowMultiShipContinueButton(true)}
            />
          )}
        </Stack>
      )}
      {/* End of Muti Ship Section */}
    </Stack>
  )
}

export default MultiShippingStep
