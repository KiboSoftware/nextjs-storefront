import React, { useEffect, useRef, useState } from 'react'

import { Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { ShippingMethod } from '@/components/checkout'
import {
  AddressDetailsView,
  AddressForm,
  KiboRadio,
  ProductItemWithAddressList,
} from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { useUpdateCheckoutShippingInfoMutation, useShippingMethodsQueries } from '@/hooks'
import { DefaultId } from '@/lib/constants'
import { orderGetters, userGetters } from '@/lib/getters'
import { buildCheckoutShippingParams, ShippingParams } from '@/lib/helpers'

import type { Order, CrOrderItem, Contact, CustomerContact } from '@/lib/gql/types'

const buttonStyle = {
  width: '100%',
  maxWidth: '421px',
  height: '42px',
  textTransform: 'none',
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

  const [shippingOption, setShippingOption] = useState<string>('')

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

  const handleSaveAddress = async ({ contact }: { contact: Contact }) => {
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

  const handleSaveShippingMethod = async (
    _shippingMethodName: string,
    shippingMethodCode: string
  ) => {
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
      const contact: Contact = {
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
  const shipOptions = [
    {
      value: 'ShipToHome',
      code: 'STH',
      name: 'Ship to Home',
      label: 'Ship to Home',
      shortName: 'SingleShip',
    },
    {
      value: 'ShipToMultiAddress',
      code: 'STMA',
      name: 'Ship to more than one address',
      label: 'Ship to more than one address',
      shortName: 'MultiShip',
    },
  ]
  const radioOptions = shipOptions.map((option) => ({
    value: option.value,
    name: option.name,
    label: <Typography variant="body2">{option.label}</Typography>,
  }))

  const onChangeShippingOption = (option: string) => setShippingOption(option)

  return (
    <Stack data-testid="checkout-shipping" gap={2} ref={shippingAddressRef}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {t('shipping')}
      </Typography>
      <KiboRadio
        radioOptions={radioOptions}
        selected={shippingOption}
        onChange={onChangeShippingOption}
      />
      {shippingOption === 'ShipToHome' && (
        <Stack>Ship to Home custom component to be implemented</Stack>
      )}
      {shippingOption === 'ShipToMultiAddress' && (
        <Stack>
          {/*  */}
          <ProductItemWithAddressList items={checkout?.items as CrOrderItem[]} />
        </Stack>
      )}
    </Stack>
  )
}

export default ShippingStep
