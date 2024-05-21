/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import {
  Stack,
  Button,
  Typography,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  NoSsr,
} from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { ShippingMethod } from '@/components/checkout'
import { AddressCard, AddressForm, KiboRadio } from '@/components/common'
import { InstantDeliveryDialog } from '@/components/dialogs'
import { useCheckoutStepContext, STEP_STATUS, useAuthContext, useModalContext } from '@/context'
import {
  useUpdateOrderShippingInfo,
  useGetShippingMethods,
  useValidateCustomerAddress,
  useCreateCustomerAddress,
  useUpdateOrder,
  useGetDeliveryRates,
} from '@/hooks'
import { DefaultId, AddressType, CountryCode, FulfillmentOptions } from '@/lib/constants'
import { cartGetters, orderGetters, userGetters } from '@/lib/getters'
import { actions, buildAddressParams, hasPermission } from '@/lib/helpers'
import type { ContactForm, Address } from '@/lib/types'

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
type Contact = {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  street: string
  city: string
  country: string
  state: string
  zipcode: string
}

const convertToContactForm = (contact: Contact): ContactForm => {
  return {
    firstName: contact.firstName as string,
    lastNameOrSurname: contact.lastName as string,
    address: {
      address1: contact.street,
      address2: '',
      cityOrTown: contact.city,
      countryCode: contact.country,
      isValidated: false,
      postalOrZipCode: contact.zipcode,
      stateOrProvince: contact.state,
    },
    phoneNumbers: {
      home: contact.phoneNumber as string,
    },
  }
}

const StandardShippingStep = (props: ShippingProps) => {
  const { checkout, savedUserAddressData: addresses, isAuthenticated } = props

  // Use this to submit the form with reCaptcha: Don't delete this code
  // const { executeRecaptcha } = useReCaptcha()
  // const { showSnackbar } = useSnackbarContext()
  const { publicRuntimeConfig } = getConfig()
  const allowInvalidAddresses = publicRuntimeConfig.allowInvalidAddresses

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
  const digitalItems = orderGetters.getDigitalItems(checkout)
  const deliveryItems = orderGetters.getDeliveryItems(checkout)

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
  const [deliveryRatesPayload, setDeliveryRatesPayload] = useState<any>()
  const { data: deliveryFee, isLoading, isSuccess } = useGetDeliveryRates(deliveryRatesPayload)
  const { showModal, closeModal } = useModalContext()
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

    return createCustomerAddress.mutateAsync(params)
  }
  const { updateOrder } = useUpdateOrder()
  const handleSaveAddressToCheckout = async ({ contact }: { contact: CrContact }) => {
    try {
      if (!allowInvalidAddresses && contact?.address?.countryCode === CountryCode.US) {
        await validateCustomerAddress.mutateAsync({
          addressValidationRequestInput: { address: contact?.address as CuAddress },
        })
      }
      const deliveryAddressDateAndWindow =
        typeof localStorage !== 'undefined' &&
        JSON.parse(localStorage.getItem('instant-delivery') as string)
      const filterOrderItems = checkout?.items?.filter(
        (orderItem: any) =>
          orderItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
      )
      const data = {
        dropoffTime: {
          startsAt:
            deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.startsAt.toString(),
          endsAt:
            deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.endsAt.toString(),
        },
        pickupTime: {
          startsAt:
            deliveryAddressDateAndWindow?.window?.confirmedWindow?.pickupTime?.startsAt.toString(),
        },
        deliveryInstructions: '',
        pickupInstructions: '',
        tips: 0,
        deliveryContact: {
          notifySms: deliveryAddressDateAndWindow?.notification?.isSendSMS,
          notifyEmail: deliveryAddressDateAndWindow?.notification?.isSendEmail,
        },
        packages: [cartGetters.getPackagesDetails(filterOrderItems)],
      }
      if (isAddressSavedToAccount) {
        const customerSavedAddress = await handleSaveAddressToAccount(contact)
        const { accountId: _, types: __, ...customerContact } = customerSavedAddress
        await updateOrderShippingInfo.mutateAsync({ checkout, contact: customerContact, data })
        setSelectedShippingAddressId(customerSavedAddress?.id as number)
      } else {
        await updateOrderShippingInfo.mutateAsync({
          checkout,
          contact,
          data,
        })
        setSelectedShippingAddressId((contact?.id as number) || DefaultId.ADDRESSID)
      }
      setIsAddressSavedToAccount(false)
      setCheckoutId(checkout?.id)
      setShouldShowAddAddressButton(true)
      setValidateForm(false)
      setIsNewAddressAdded(true)

      setStepStatusValid()
    } catch (error: any) {
      setValidateForm(false)
      console.error(error)
    }
  }

  // Use this function to submit the form with reCaptcha: Don't delete this code
  // This code is commented out because we are not using reCaptcha for now
  // In order to use this you need to pass this function to AddressForm component as a onSaveAddress
  // const submitFormWithRecaptcha = ({ contact }: { contact: CrContact }) => {
  //   if (!executeRecaptcha) {
  //     console.log('Execute recaptcha not yet available')
  //     return
  //   }
  //   executeRecaptcha('enquiryFormSubmit').then(async (gReCaptchaToken) => {
  //     const captcha = await validateGoogleReCaptcha(gReCaptchaToken)

  //     if (captcha?.status === 'success') {
  //       await handleSaveAddressToCheckout({ contact })
  //     } else {
  //       showSnackbar(captcha.message, 'error')
  //     }
  //   })
  // }

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
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    if (
      (selectedShippingAddressId && checkoutShippingMethodCode && shouldShowAddAddressButton) ||
      (!shipItems.length && (pickupItems.length || digitalItems.length))
    ) {
      setStepStatusValid()
    } else {
      if (checkout?.fulfillmentInfo?.fulfillmentContact) {
        setStepStatusValid()
      } else {
        setStepStatusIncomplete()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShippingAddressId, checkout, shouldShowAddAddressButton])

  const isAllItemsDigital = checkout.items?.every(
    (item) => item?.fulfillmentMethod === FulfillmentOptions.DIGITAL
  )

  const handleDigitalProductShipping = async () => {
    const address = {
      addressType: 'Residential',
      countryCode: 'US',
      isValidated: false,
      postalOrZipCode: 'n/a',
      stateOrProvince: 'n/a',
      cityOrTown: 'n/a',
      address1: 'n/a',
    }

    await updateOrderShippingInfo.mutateAsync({
      checkout,
      contact: {
        address,
        firstName: '',
        lastNameOrSurname: '',
        phoneNumbers: { home: '' },
      },
    })

    setStepStatusValid()
  }
  const updateFulfillmentLocationCode = (items: any, deliveryAddressDateAndWindow: any) => {
    items.forEach((item: any) => {
      if (item.fulfillmentMethod === 'Delivery') {
        item.fulfillmentLocationCode = deliveryAddressDateAndWindow?.window?.confirmedStoreId
      }
    })
    return items
  }
  const [updateOrderResponse, setUpdateOrderResponse] = useState<any>()
  const [updateDeliveryDateAndWindow, setUpdateDeliveryDateAndWindow] = useState<any>()
  const [editAddressId, setEditAddressId] = useState()
  const handleUpdateOrderItemPriceAndFulfillmentInfo = async () => {
    const deliveryItem = updateOrderResponse?.items?.find(
      (item: any) =>
        item?.product?.productType === publicRuntimeConfig?.instantDelivery?.productType
    )
    const updateOrderItemPriceVariables = {
      params: {
        orderId: updateOrderResponse?.id,
        orderItemId: deliveryItem?.id,
        price: deliveryFee,
      },
    }
    const response = await fetch('/api/update-order-item-price', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateOrderItemPriceVariables),
    })
    const updateOrderItemPriceResponse = await response.json()
    const filterUpdatedOrderItems = updateOrderItemPriceResponse?.items?.filter(
      (orderItem: any) =>
        orderItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
    )
    await updateOrderShippingInfo.mutateAsync({
      checkout: { ...updateOrderItemPriceResponse },
      contact: {
        firstName: updateDeliveryDateAndWindow?.address?.firstName,
        lastNameOrSurname: updateDeliveryDateAndWindow?.address?.lastName,
        id: editAddressId,
        phoneNumbers: {
          home: updateDeliveryDateAndWindow?.address?.phoneNumber,
        },
        address: {
          address1: updateDeliveryDateAndWindow?.address?.street,
          cityOrTown: updateDeliveryDateAndWindow?.address?.city,
          stateOrProvince: updateDeliveryDateAndWindow?.address?.state,
          countryCode: updateDeliveryDateAndWindow?.address?.country,
          postalOrZipCode: updateDeliveryDateAndWindow?.address?.zipcode,
        },
      },
      data: {
        dropoffTime: {
          startsAt:
            updateDeliveryDateAndWindow?.window?.confirmedWindow?.dropoffTime?.startsAt.toString(),
          endsAt:
            updateDeliveryDateAndWindow?.window?.confirmedWindow?.dropoffTime?.endsAt.toString(),
        },
        pickupTime: {
          startsAt:
            updateDeliveryDateAndWindow?.window?.confirmedWindow?.pickupTime?.startsAt.toString(),
        },
        deliveryInstructions: '',
        pickupInstructions: '',
        tips: 0,
        deliveryContact: {
          notifySms: updateDeliveryDateAndWindow?.notification?.isSendSMS,
          notifyEmail: updateDeliveryDateAndWindow?.notification?.isSendEmail,
        },
        packages: [cartGetters.getPackagesDetails(filterUpdatedOrderItems)],
      },
    })
  }
  const handleEditAddress = (address: any) => {
    showModal({
      Component: InstantDeliveryDialog,
      props: {
        instantDelivery: {
          address: {
            firstName: address?.firstName,
            lastName: address?.lastNameOrSurname,
            phoneNumber: address?.phoneNumbers?.home,
            street: address?.address?.address1,
            city: address?.address?.cityOrTown,
            state: address?.address?.stateOrProvince,
            country: address?.address?.countryCode,
            zipcode: address?.address?.postalOrZipCode,
          },
        },
        handleInstantDelivery: async (deliveryAddressDateAndWindow: any) => {
          const filterOrderItems = checkout?.items?.filter(
            (orderItem: any) =>
              orderItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
          )
          const params = {
            orderId: checkout?.id as string,
            orderInput: {
              ...checkout,
              items: updateFulfillmentLocationCode(checkout?.items, deliveryAddressDateAndWindow),
            },
          }
          const updateOrderResponseAPI = await updateOrder.mutateAsync(params)
          const updateOrderFilterItems = updateOrderResponseAPI?.items?.filter(
            (orderItem: any) =>
              orderItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
          )
          setDeliveryRatesPayload(
            cartGetters.getNormalizedDataForRates(
              updateOrderFilterItems,
              deliveryAddressDateAndWindow
            )
          )
          // if (deliveryFee && isSuccess) {
          //   const deliveryItem = updateOrderResponse?.items?.find(
          //     (item: any) =>
          //       item?.product?.productType === publicRuntimeConfig?.instantDelivery?.productType
          //   )
          //   const updateOrderItemPriceVariables = {
          //     params: {
          //       orderId: updateOrderResponse?.id,
          //       orderItemId: deliveryItem?.id,
          //       price: deliveryFee,
          //     },
          //   }
          //   const updateOrderItemPriceResponse = await fetch('/api/update-order-item-price', {
          //     method: 'POST',
          //     headers: {
          //       Accept: 'application/json, text/plain, */*',
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(updateOrderItemPriceVariables),
          //   })
          // await updateOrderShippingInfo.mutateAsync({
          //   checkout,
          //   contact: {
          //     firstName: deliveryAddressDateAndWindow?.address?.firstName,
          //     lastNameOrSurname: deliveryAddressDateAndWindow?.address?.lastName,
          //     id: address?.id,
          //     phoneNumbers: {
          //       home: deliveryAddressDateAndWindow?.address?.phoneNumber,
          //     },
          //     address: {
          //       address1: deliveryAddressDateAndWindow?.address?.street,
          //       cityOrTown: deliveryAddressDateAndWindow?.address?.city,
          //       stateOrProvince: deliveryAddressDateAndWindow?.address?.state,
          //       countryCode: deliveryAddressDateAndWindow?.address?.country,
          //       postalOrZipCode: deliveryAddressDateAndWindow?.address?.zipcode,
          //     },
          //   },
          // })
          // }
          setUpdateOrderResponse(updateOrderResponseAPI)
          setUpdateDeliveryDateAndWindow(deliveryAddressDateAndWindow)
          setEditAddressId(address?.id)

          // await updateOrder.mutateAsync(params)
          closeModal()
        },
      },
    })
  }
  useEffect(() => {
    if (isSuccess) {
      handleUpdateOrderItemPriceAndFulfillmentInfo()
    }
  }, [isSuccess, deliveryFee])

  useEffect(() => {
    if (isAllItemsDigital || !shipItems.length)
      if (isAllItemsDigital) {
        handleDigitalProductShipping()
      } else {
        setStepStatusValid()
      }
  }, [checkout.email, isAllItemsDigital, shipItems.length])

  if (checkout.items?.every((item) => item?.fulfillmentMethod === FulfillmentOptions.DIGITAL)) {
    return <Typography variant="subtitle2">{t('digital-products-shipping-text')}</Typography>
  }

  if (!shipItems.length && pickupItems.length) {
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

  // Instant Delivery
  const instantDelivery = localStorage.getItem('instant-delivery') as string
  const instantDeliveryObj = JSON.parse(instantDelivery)
  const deliveryAddress = instantDeliveryObj?.address
  const contact = convertToContactForm(deliveryAddress)

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
                <Typography variant="subtitle2" fontWeight={'bold'}>
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
                <Typography variant="subtitle2" fontWeight={'bold'}>
                  {t('previously-saved-shipping-addresses')}
                </Typography>
                <KiboRadio
                  radioOptions={previouslySavedShippingAddress?.map((address, index) => {
                    return {
                      value: String(address.id),
                      name: String(address.id),
                      label: (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
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
                          {!isAuthenticated && (
                            <Typography
                              variant="body2"
                              sx={{ cursor: 'pointer' }}
                              data-testid={`address-edit`}
                              onClick={() => handleEditAddress(address)}
                            >
                              {t('edit')}
                            </Typography>
                          )}
                        </Box>
                      ),
                    }
                  })}
                  selected={selectedShippingAddressId?.toString()}
                  align="flex-start"
                  onChange={handleAddressSelect}
                  sx={{ width: '100%' }}
                />
              </>
            )}
            <NoSsr>
              {hasPermission(actions.CREATE_CONTACTS) && (
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ width: { xs: '100%', sm: '50%' } }}
                  onClick={handleAddNewAddress}
                >
                  {t('add-new-address')}
                </Button>
              )}
            </NoSsr>
          </Stack>

          <ShippingMethod
            shipItems={shipItems}
            pickupItems={pickupItems}
            deliveryItems={deliveryItems}
            orderShipmentMethods={[...shippingMethods]}
            selectedShippingMethodCode={checkoutShippingMethodCode}
            onShippingMethodChange={handleSaveShippingMethod}
            onStoreLocatorClick={handleStoreLocatorClick}
          />
        </>
      )}
      {!shouldShowAddAddressButton && (
        <>
          <AddressForm
            contact={contact}
            isUserLoggedIn={false}
            saveAddressLabel={t('save-shipping-address')}
            setAutoFocus={true}
            validateForm={validateForm}
            onSaveAddress={handleSaveAddressToCheckout}
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
