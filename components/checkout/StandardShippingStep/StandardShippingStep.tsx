/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import { Stack, Button, Typography, Grid, Box, FormControlLabel, Checkbox } from '@mui/material'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { useReCaptcha } from 'next-recaptcha-v3'

const ShippingMethod = dynamic(() =>
  import('@/components/checkout').then((mod) => mod.ShippingMethod)
)

import { AddressCard, AddressForm, KiboRadio } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS, useSnackbarContext, useAuthContext } from '@/context'
import {
  useUpdateOrderShippingInfo,
  useGetShippingMethods,
  useValidateCustomerAddress,
  useCreateCustomerAddress,
} from '@/hooks'
import { DefaultId } from '@/lib/constants'
import { AddressType } from '@/lib/constants'
import { orderGetters, userGetters } from '@/lib/getters'
import { buildAddressParams } from '@/lib/helpers'
import { Address } from '@/lib/types'

import type {
  CrOrder,
  CrContact,
  CustomerContact,
  CustomerContactCollection,
  CuAddress,
} from '@/lib/gql/types'

interface ShippingProps {
  setAutoFocus?: boolean
  checkout: CrOrder
  savedUserAddressData?: CustomerContactCollection
  isAuthenticated: boolean
}

const StandardShippingStep = (props: ShippingProps) => {
  const { checkout, savedUserAddressData: addresses, isAuthenticated } = props
  const { executeRecaptcha } = useReCaptcha()
  const { showSnackbar } = useSnackbarContext()
  const { user } = useAuthContext()
  const checkoutShippingContact = orderGetters.getShippingContact(checkout)
  const checkoutShippingMethodCode = orderGetters.getShippingMethodCode(checkout)
  // getting shipping address from all addresses returned from server
  const userShippingAddress = isAuthenticated
    ? userGetters.getUserShippingAddress(addresses?.items as CustomerContact[])
    : []
  if (checkoutShippingContact && checkoutShippingContact.id === null) {
    checkoutShippingContact.id = DefaultId.ADDRESSID
  }
  const shipItems = orderGetters.getShipItems(checkout)
  const pickupItems = orderGetters.getPickupItems(checkout)

  const [isAddressSavedToAccount, setIsAddressSavedToAccount] = useState<boolean>(false)
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
  const shippingAddressRef = useRef<HTMLDivElement>(null)

  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()
  const { updateOrderShippingInfo } = useUpdateOrderShippingInfo()
  const { data: shippingMethods } = useGetShippingMethods(
    checkoutId,
    isNewAddressAdded,
    selectedShippingAddressId
  )
  const { validateCustomerAddress } = useValidateCustomerAddress()
  const { createCustomerAddress } = useCreateCustomerAddress()

  const handleAddressValidationAndSave = () => setValidateForm(true)

  const handleSaveAddressToAccount = async (contact: CrContact) => {
    const address = {
      contact: {
        ...contact,
        email: user?.emailAddress as string,
      },
    } as Address

    const params = buildAddressParams({
      accountId: user?.id as number,
      address,
      isDefaultAddress: false,
      addressType: AddressType.SHIPPING,
    })

    await createCustomerAddress.mutateAsync(params)
    setIsAddressSavedToAccount(false)
  }

  const handleSaveAddressToCheckout = async ({ contact }: { contact: CrContact }) => {
    try {
      await validateCustomerAddress.mutateAsync({
        addressValidationRequestInput: { address: contact?.address as CuAddress },
      })
      if (isAddressSavedToAccount) {
        await handleSaveAddressToAccount(contact)
      }
      await updateOrderShippingInfo.mutateAsync({ checkout, contact })
      setCheckoutId(checkout?.id)
      setSelectedShippingAddressId((contact?.id as number) || DefaultId.ADDRESSID)
      setShouldShowAddAddressButton(true)
      setValidateForm(false)
      setIsNewAddressAdded(true)
      setStepStatusIncomplete()
    } catch (error: any) {
      setValidateForm(false)
      console.error(error)
    }
  }

  const submitFormWithRecaptcha = ({ contact }: { contact: CrContact }) => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
      fetch('/api/captcha', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contact,
          gRecaptchaToken: gReCaptchaToken,
        }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          if (res?.status === 'success') {
            await handleSaveAddressToCheckout({ contact })
          } else {
            showSnackbar(res.message, 'error')
          }
        })
    })
  }

  const handleSaveShippingMethod = async (shippingMethodCode: string) => {
    const shippingMethodName = shippingMethods.find(
      (method) => method.shippingMethodCode === shippingMethodCode
    )?.shippingMethodName as string

    try {
      await updateOrderShippingInfo.mutateAsync({
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
      handleSaveAddressToCheckout({ contact })
    }
  }

  const handleAddNewAddress = () => {
    setValidateForm(false)
    setShouldShowAddAddressButton(false)
    setIsNewAddressAdded(false)
  }

  useEffect(() => {
    setSavedShippingAddresses(
      userGetters.getAllShippingAddresses(
        checkoutShippingContact,
        userShippingAddress as CustomerContact[]
      )
    )
  }, [
    JSON.stringify(checkoutShippingContact),
    JSON.stringify(userShippingAddress),
    isNewAddressAdded,
  ])

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

  useEffect(() => {
    if (!shipItems.length) setStepStatusValid()
  }, [shipItems.length])

  if (!shipItems.length) {
    return (
      <>
        <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
          {t('pickup')}
        </Typography>
        <ShippingMethod
          showTitle={false}
          shipItems={shipItems}
          pickupItems={pickupItems}
          orderShipmentMethods={[...shippingMethods]}
          selectedShippingMethodCode={checkoutShippingMethodCode}
          onShippingMethodChange={handleSaveShippingMethod}
          onStoreLocatorClick={handleStoreLocatorClick}
        />
      </>
    )
  }

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
                <KiboRadio
                  radioOptions={[
                    {
                      value: String(defaultShippingAddress.id),
                      name: String(defaultShippingAddress.id),
                      optionIndicator: t('primary'),
                      label: (
                        <AddressCard
                          firstName={defaultShippingAddress?.firstName as string}
                          middleNameOrInitial={
                            defaultShippingAddress?.middleNameOrInitial as string
                          }
                          lastNameOrSurname={defaultShippingAddress?.lastNameOrSurname as string}
                          address1={defaultShippingAddress?.address?.address1 as string}
                          address2={defaultShippingAddress?.address?.address2 as string}
                          cityOrTown={defaultShippingAddress?.address?.cityOrTown as string}
                          stateOrProvince={
                            defaultShippingAddress?.address?.stateOrProvince as string
                          }
                          postalOrZipCode={
                            defaultShippingAddress?.address?.postalOrZipCode as string
                          }
                        />
                      ),
                    },
                  ]}
                  selected={selectedShippingAddressId?.toString()}
                  align="flex-start"
                  onChange={handleAddressSelect}
                />
              </>
            )}

            {previouslySavedShippingAddress?.length > 0 && (
              <>
                <Typography variant="h4" fontWeight={'bold'}>
                  {t('previously-saved-shipping-addresses')}
                </Typography>
                <KiboRadio
                  radioOptions={previouslySavedShippingAddress?.map((address, index) => {
                    return {
                      value: String(address.id),
                      name: String(address.id),
                      label: (
                        <AddressCard
                          firstName={address?.firstName as string}
                          middleNameOrInitial={address?.middleNameOrInitial as string}
                          lastNameOrSurname={address?.lastNameOrSurname as string}
                          address1={address?.address?.address1 as string}
                          address2={address?.address?.address2 as string}
                          cityOrTown={address?.address?.cityOrTown as string}
                          stateOrProvince={address?.address?.stateOrProvince as string}
                          postalOrZipCode={address?.address?.postalOrZipCode as string}
                        />
                      ),
                    }
                  })}
                  selected={selectedShippingAddressId?.toString()}
                  align="flex-start"
                  onChange={handleAddressSelect}
                />
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
            onSaveAddress={submitFormWithRecaptcha}
            onFormStatusChange={handleFormStatusChange}
          />

          {isAuthenticated && (
            <FormControlLabel
              label={t('save-address-to-account')}
              control={
                <Checkbox
                  sx={{ marginLeft: '0.5rem' }}
                  inputProps={{
                    'aria-label': t('save-address-to-account'),
                  }}
                  onChange={() => setIsAddressSavedToAccount(!isAddressSavedToAccount)}
                />
              }
            />
          )}

          <Box m={1} maxWidth={'872px'} data-testid="address-form">
            <Grid container>
              <Grid item xs={6} gap={2} display={'flex'} direction={'column'}>
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
                  style={{ textTransform: 'none' }}
                  onClick={handleAddressValidationAndSave}
                  {...(!isAddressFormValid && { disabled: true })}
                >
                  {t('save-shipping-address')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Stack>
  )
}

export default StandardShippingStep
