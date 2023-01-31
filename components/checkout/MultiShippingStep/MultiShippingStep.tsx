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
import { AddressFormDialog } from '@/components/dialogs'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useModalContext } from '@/context/ModalContext'
import {
  useUpdateCheckoutItemDestinationMutations,
  useUpdateCheckoutDestinationMutations,
} from '@/hooks'
import { userGetters, checkoutGetters } from '@/lib/getters'
import type { CustomDestinationInput, MultiShipAddress, ShipOption } from '@/lib/types'

import type {
  CrOrderItem,
  CrContact,
  CustomerContact,
  Checkout,
  CheckoutGroupRates,
} from '@/lib/gql/types'

const buttonStyle = {
  width: '100%',
  maxWidth: '421px',
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
  textTransform: 'none',
} as SxProps<Theme> | undefined

interface MultiShippingStepProps {
  setAutoFocus?: boolean
  checkout: Checkout
  userSavedShippingAddress?: CustomerContact[]
  isAuthenticated: boolean
  shippingMethods: CheckoutGroupRates[]
  checkoutId?: string
  createCheckoutDestination: any
  onUpdateCheckoutShippingMethod: (params: {
    shippingMethodCode: string
    shippingMethodGroup: CheckoutGroupRates
  }) => Promise<void>
}

interface UpdateItemDestinationParams {
  itemId: string
  destinationId: string
  checkoutId: string
}
interface ShippingDestination {
  destinationId: string
  address: CrContact
}

interface CustomDestinationContact {
  contact: CustomDestinationInput
}

const MultiShippingStep = (props: MultiShippingStepProps) => {
  const {
    checkout,
    userSavedShippingAddress: addresses,
    isAuthenticated,
    shippingMethods,
    createCheckoutDestination,
    onUpdateCheckoutShippingMethod,
  } = props

  const { showModal, closeModal } = useModalContext()
  const { t } = useTranslation('common')
  const shippingAddressRef = useRef()

  const { publicRuntimeConfig } = getConfig()
  const shipOptions = publicRuntimeConfig.shipOptions

  const checkoutShippingMethodCode = checkoutGetters.getShippingMethodCode({ ...checkout })
  const userShippingAddress = isAuthenticated
    ? userGetters.getUserShippingAddress(addresses as CustomerContact[])
    : []
  const shipItems = checkoutGetters.getShipItems(checkout)
  const pickupItems = checkoutGetters.getPickupItems(checkout)
  const initialShippingOption = checkoutGetters?.getInitialShippingOption(checkout, shipOptions)
  const multiShipAddresses = checkoutGetters.getMultiShipAddresses({
    checkout,
    savedShippingAddresses: userShippingAddress as CrContact[],
  })
  const isMultiShipPaymentStepValid = checkoutGetters.checkMultiShipPaymentValid(checkout)

  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isAddressFormValid, setIsAddressFormValid] = useState<boolean>(false)
  const [shouldShowAddAddressButton, setShouldShowAddAddressButton] = useState<boolean>(true)
  const [shippingOption, setShippingOption] = useState<string>(initialShippingOption)
  const [showMultiShipContinueButton, setShowMultiShipContinueButton] = useState<boolean>(true)

  const shipToHome = shipOptions[0]?.value
  const shipToMultiAddress = shipOptions[1]?.value

  // hooks
  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()

  const updateCheckoutItemDestination = useUpdateCheckoutItemDestinationMutations()
  const updateCheckoutDestination = useUpdateCheckoutDestinationMutations()
  // end hooks

  const handleAddressValidationAndSave = () => setValidateForm(true)
  const handleUpdateDestinationAddress = async ({ contact }: CustomDestinationContact) => {
    const { destinationId, itemId, ...rest } = contact
    closeModal()
    if (destinationId)
      await updateCheckoutDestination.mutateAsync({
        checkoutId: checkout?.id as string,
        destinationId,
        destinationInput: { id: destinationId, destinationContact: rest },
      })
    else {
      const destination = await createCheckoutDestination.mutateAsync({
        checkoutId: checkout?.id as string,
        destinationInput: {
          destinationContact: rest,
        },
      })

      await updateCheckoutItemDestination.mutateAsync({
        itemId,
        destinationId: destination?.id as string,
        checkoutId: checkout?.id as string,
      })
    }
  }

  const updateItemDestination = async (params: UpdateItemDestinationParams) => {
    const { itemId, destinationId, checkoutId } = params
    await updateCheckoutItemDestination.mutateAsync({
      itemId,
      destinationId,
      checkoutId,
    })
  }
  const updateSameDestinationForAllItems = async (params: { destinationId: string }) => {
    const { destinationId } = params
    const checkoutId = checkout?.id as string

    for (const item of shipItems) {
      const itemId = item?.id as string
      await updateItemDestination({
        itemId,
        destinationId,
        checkoutId,
      })
    }
  }

  const handleSaveAddress = async ({ contact }: { contact: CrContact }) => {
    try {
      const destination = await createCheckoutDestination.mutateAsync({
        checkoutId: checkout?.id as string,
        destinationInput: {
          destinationContact: contact,
        },
      })

      if (destination?.id) {
        await updateSameDestinationForAllItems({ destinationId: destination?.id as string })

        setShouldShowAddAddressButton(true)
        setValidateForm(false)
        if (!isMultiShipPaymentStepValid) setStepStatusIncomplete()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveShippingMethod = async (shippingMethodCode: string) => {
    try {
      const groupingId = checkout?.groupings && (checkout?.groupings[0]?.id as string)
      const shippingMethodGroup = shippingMethods?.find(
        (shippingMethod: CheckoutGroupRates) => shippingMethod?.groupingId === groupingId
      )

      await onUpdateCheckoutShippingMethod({
        shippingMethodCode,
        shippingMethodGroup: shippingMethodGroup as CheckoutGroupRates,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleStoreLocatorClick = () => {
    /* to remove */
  }

  const handleFormStatusChange = (status: boolean) => setIsAddressFormValid(status)

  const handleAddressSelect = async (destinationIdOrAddressId: string) => {
    const existingDestinationAddress = checkout?.destinations?.find(
      (destination) => destination?.id === destinationIdOrAddressId
    )

    const destinationId = existingDestinationAddress?.id
      ? destinationIdOrAddressId
      : await handleCreateDestinationAddress(destinationIdOrAddressId)

    await updateSameDestinationForAllItems({ destinationId })
  }

  const handleAddNewAddress = () => setShouldShowAddAddressButton(false)

  const radioOptions = shipOptions.map((option: ShipOption) => ({
    value: option.value,
    name: option.name,
    label: <Typography variant="body2">{option.label}</Typography>,
  }))

  const onChangeShippingOption = async (option: string) => {
    const groupings = checkout?.groupings
    if (groupings && groupings?.length > 1 && option === shipToHome) {
      const defaultDestinationId = groupings[0]?.destinationId as string
      await updateSameDestinationForAllItems({ destinationId: defaultDestinationId })
    }

    setShippingOption(option)
  }

  const getSavedShippingAddressView = (
    contact: ShippingDestination,
    isPrimary?: boolean
  ): React.ReactNode => {
    const { destinationId, address } = contact
    const selectedDestinationId = checkout?.groupings && checkout?.groupings[0]?.destinationId
    return (
      <AddressDetailsView
        key={destinationId + address?.id}
        radio={true}
        id={destinationId || (address?.id as number)}
        isPrimary={isPrimary}
        firstName={address?.firstName as string}
        middleNameOrInitial={address?.middleNameOrInitial as string}
        lastNameOrSurname={address?.lastNameOrSurname as string}
        address1={address?.address?.address1 as string}
        address2={address?.address?.address2 as string}
        cityOrTown={address?.address?.cityOrTown as string}
        stateOrProvince={address?.address?.stateOrProvince as string}
        postalOrZipCode={address?.address?.postalOrZipCode as string}
        selected={selectedDestinationId as string}
        handleRadioChange={handleAddressSelect}
      />
    )
  }

  const handleCreateDestinationAddress = async (shippingAddressId: string) => {
    const existingAddress = userShippingAddress?.find(
      (shippingAddress) => shippingAddress?.id?.toString() === shippingAddressId
    ) as CustomerContact

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accountId, types, ...rest } = existingAddress

    const newDestination = await createCheckoutDestination.mutateAsync({
      checkoutId: checkout?.id as string,
      destinationInput: {
        destinationContact: rest,
      },
    })

    return newDestination?.id
  }

  const handleCreateOrSetDestinationAddress = async (id: string, value: string) => {
    const existingDestinationAddress = checkout?.destinations?.find(
      (destination) => destination?.id === value
    )

    const destinationId = existingDestinationAddress?.id
      ? existingDestinationAddress?.id
      : await handleCreateDestinationAddress(value)

    await updateItemDestination({
      itemId: id,
      destinationId: destinationId as string,
      checkoutId: checkout?.id as string,
    })
  }

  const createOrUpdateDestination = (params: { destinationInput: CustomDestinationInput }) => {
    // destination
    const { destinationInput } = params
    showModal({
      Component: AddressFormDialog,
      props: {
        isUserLoggedIn: false,
        formTitle: destinationInput?.destinationId ? t('edit-address') : t('add-new-address'),
        contact: destinationInput,
        isAddressFormValid: false,
        setAutoFocus: true,
        validateForm: false,
        onSaveAddress: handleUpdateDestinationAddress,
      },
    })
  }

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepStatus])

  useEffect(() => {
    isMultiShipPaymentStepValid ? setStepStatusValid() : setStepStatusIncomplete()
  }, [isMultiShipPaymentStepValid, checkout])

  return (
    <Stack data-testid="checkout-shipping" gap={2} ref={shippingAddressRef}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {!showMultiShipContinueButton ? t('shipping-address') : t('shipping')}
      </Typography>
      {showMultiShipContinueButton && (
        <KiboRadio
          radioOptions={radioOptions}
          selected={shippingOption}
          onChange={onChangeShippingOption}
        />
      )}

      {shippingOption === shipToHome && (
        <>
          {shouldShowAddAddressButton && (
            <>
              <Stack gap={2} width="100%">
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
              {shippingMethods[0]?.shippingRates &&
                shippingMethods[0]?.shippingRates?.length > 0 && (
                  <ShippingMethod
                    shipItems={shipItems}
                    pickupItems={pickupItems}
                    orderShipmentMethods={[...shippingMethods[0]?.shippingRates]}
                    selectedShippingMethodCode={checkoutShippingMethodCode as string}
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
      {shippingOption === shipToMultiAddress && ( //for more than one address
        <Stack>
          {showMultiShipContinueButton && (
            <>
              <ProductItemWithAddressList
                checkout={checkout}
                multiShipAddresses={multiShipAddresses as MultiShipAddress[]}
                onUpdateDestinationAddress={createOrUpdateDestination}
                onSelectCreateOrSetDestinationAddress={handleCreateOrSetDestinationAddress}
              />

              <Box paddingY={2}>
                <ShippingMethod
                  pickupItems={pickupItems}
                  showTitle={false}
                  onStoreLocatorClick={handleStoreLocatorClick}
                />
              </Box>
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
              shippingMethods={shippingMethods}
              onClickEditMultiShippingDetails={() => setShowMultiShipContinueButton(true)}
              onUpdateCheckoutShippingMethod={onUpdateCheckoutShippingMethod}
            />
          )}
        </Stack>
      )}
    </Stack>
  )
}

export default MultiShippingStep
