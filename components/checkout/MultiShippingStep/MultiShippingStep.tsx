import React, { useEffect, useRef, useState } from 'react'

import { Stack, Button, Typography, SxProps } from '@mui/material'
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
import AddressFormDialog from '@/components/dialogs/AddressFormDialog/AddressFormDialog'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useModalContext } from '@/context/ModalContext'
import {
  useUpdateCheckoutItemDestinationMutations,
  useUpdateCheckoutDestinationMutations,
} from '@/hooks'
import { DefaultId } from '@/lib/constants'
import { orderGetters, userGetters, checkoutGetters } from '@/lib/getters'

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
} as SxProps<Theme> | undefined

interface ShippingProps {
  setAutoFocus?: boolean
  checkout: Checkout
  userSavedShippingAddress?: CustomerContact[]
  isAuthenticated: boolean
  shippingMethods: CheckoutGroupRates[]
  checkoutId?: string
  isNewAddressAdded: boolean
  setIsNewAddressAdded: (params: boolean) => void
  createCheckoutDestination: any
  onUpdateCheckoutShippingMethod: (params: {
    shippingMethodGroup: CheckoutGroupRates
    shippingMethodCode: string
  }) => void
}

export interface CustomDestinationInput extends CrContact {
  destinationId?: string
  itemId: string
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

export type ShipOption = {
  value: string
  code: string
  name: string
  label: string
  shortName: string
}

const MultiShippingStep = (props: ShippingProps) => {
  const {
    checkout,
    userSavedShippingAddress: addresses,
    isAuthenticated,
    shippingMethods,
    isNewAddressAdded,
    setIsNewAddressAdded,
    createCheckoutDestination,
    onUpdateCheckoutShippingMethod,
  } = props
  const { publicRuntimeConfig } = getConfig()
  const { showModal, closeModal } = useModalContext()

  const checkoutShippingContact = orderGetters.getShippingContact(checkout)
  const checkoutShippingMethodCode = checkoutGetters.getShippingMethodCode(checkout)
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

  const [savedShippingAddresses, setSavedShippingAddresses] = useState<CustomerContact[]>(
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

  const multiShipAddresses = checkoutGetters.getMultiShipAddresses({
    checkout,
    savedShippingAddresses: userShippingAddress,
  })
  const isMultiShipPaymentStepValid = checkoutGetters.checkMultiShipPaymentValid(checkout)

  const { t } = useTranslation('common')
  const shippingAddressRef = useRef()
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
  const handleUpdateDestinationAddress = async ({
    contact,
  }: {
    contact: CustomDestinationInput
  }) => {
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

    for (const item of checkout?.items as CrOrderItem[]) {
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
        setIsNewAddressAdded(true)
        setStepStatusIncomplete()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveShippingMethod = async (
    _shippingMethodName: string,
    shippingMethodCode: string
  ) => {
    try {
      const groupingId = checkout?.groupings && (checkout?.groupings[0]?.id as string)
      const shippingMethodGroup = shippingMethods?.find(
        (shippingMethod: CheckoutGroupRates) => shippingMethod?.groupingId === groupingId
      )
      onUpdateCheckoutShippingMethod({
        shippingMethodGroup: shippingMethodGroup as CheckoutGroupRates,
        shippingMethodCode,
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

    if (!existingDestinationAddress?.id) {
      const destinationId = await handleCreateDestinationAddress(destinationIdOrAddressId)
      await updateSameDestinationForAllItems({ destinationId: destinationId as string })
    } else {
      await updateSameDestinationForAllItems({ destinationId: destinationIdOrAddressId as string })
    }
  }

  const handleAddNewAddress = () => {
    setShouldShowAddAddressButton(false)
    setIsNewAddressAdded(false)
  }

  const radioOptions = shipOptions.map((option: ShipOption) => ({
    value: option.value,
    name: option.name,
    label: <Typography variant="body2">{option.label}</Typography>,
  }))

  const onChangeShippingOption = async (option: string) => {
    const groupings = checkout?.groupings
    if (groupings && groupings?.length > 1 && option === shipOptions[0].value) {
      const defaultDestinationId = groupings && (groupings[0]?.destinationId as string)
      await updateSameDestinationForAllItems({ destinationId: defaultDestinationId as string })
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
        id={(destinationId as string) || (address?.id as number)}
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

    if (!existingDestinationAddress?.id) {
      const destinationId = await handleCreateDestinationAddress(value)
      await updateItemDestination({
        itemId: id,
        destinationId: destinationId as string,
        checkoutId: checkout?.id as string,
      })
    } else {
      await updateItemDestination({
        itemId: id,
        destinationId: existingDestinationAddress?.id as string,
        checkoutId: checkout?.id as string,
      })
    }
  }

  const createOrUpdateDestination = (params: { destinationInput: CustomDestinationInput }) => {
    // destination
    const { destinationInput } = params
    showModal({
      Component: AddressFormDialog,
      props: {
        isUserLoggedIn: false,
        formTitle: destinationInput?.destinationId ? 'Edit Address' : 'Add New Address',
        contact: destinationInput,
        isAddressFormValid: false,
        setAutoFocus: true,
        validateForm: false,
        onSaveAddress: handleUpdateDestinationAddress,
      },
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
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepStatus])

  useEffect(() => {
    isMultiShipPaymentStepValid ? setStepStatusValid() : setStepStatusIncomplete()
  }, [isMultiShipPaymentStepValid])

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

      {shippingOption === shipOptions[0].value && (
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
              {shippingMethods &&
                shippingMethods[0]?.shippingRates &&
                shippingMethods[0]?.shippingRates?.length > 0 && (
                  <ShippingMethod
                    shipItems={shipItems as CrOrderItem[]}
                    pickupItems={pickupItems as CrOrderItem[]}
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
      {shippingOption === shipOptions[1].value && ( //for more than one address
        <Stack>
          {showMultiShipContinueButton && (
            <>
              <ProductItemWithAddressList
                checkout={checkout}
                multiShipAddresses={multiShipAddresses}
                onUpdateDestinationAddress={createOrUpdateDestination}
                onSelectCreateOrSetDestinationAddress={handleCreateOrSetDestinationAddress}
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
