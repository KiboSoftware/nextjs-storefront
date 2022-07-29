import React, { useEffect, useState } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import AddressCard from '@/components/common/AddressCard/AddressCard'
import KiboRadio from '@/components/common/KiboRadio/KiboRadio'

import type { CrAddress, CuAddress, CustomerContact } from '@/lib/gql/types'

interface AddressListProps {
  radioGroupTitle?: string
  withoutRadioTitle?: string
  heading?: string
  subHeading?: string
  radio?: boolean
  addresses: CustomerContact[] | undefined
  selectedAddressId?: string
  onAddressSelection: (addressId: string) => any
}

interface KiboAddressListProps {
  addresses: CustomerContact[] | undefined
  radioGroupTitle?: string
  heading?: string
  subHeading?: string
  selectedAddressId?: string
  onAddressSelect: (addressId: string) => any
}

const buildAddressProps = (address: CrAddress | CuAddress | any) => {
  const { address1, address2, cityOrTown, stateOrProvince, postalOrZipCode } = address
  const addressCardProps = {
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
  }
  return addressCardProps
}

const AddressList = (props: AddressListProps) => {
  const {
    radioGroupTitle,
    withoutRadioTitle,
    addresses,
    heading,
    subHeading,
    radio = false,
    selectedAddressId,
    onAddressSelection,
  } = props
  const { t } = useTranslation(['common'])

  return (
    <Box maxWidth={'fit-content'}>
      {addresses?.length ? (
        radio ? (
          <KiboRadioAddressList
            addresses={addresses}
            radioGroupTitle={radioGroupTitle}
            heading={heading}
            subHeading={subHeading}
            selectedAddressId={selectedAddressId}
            onAddressSelect={(addressId) => onAddressSelection(addressId)}
          />
        ) : (
          <KiboAddressList
            addresses={addresses}
            withoutRadioTitle={withoutRadioTitle}
            onAddressSelection={() => ''}
          />
        )
      ) : (
        <Typography variant="h4" fontWeight={'bold'}>
          {t('common:no-saved-addresses-yet')}
        </Typography>
      )}
    </Box>
  )
}

const KiboAddressList = (props: AddressListProps) => {
  const { addresses, withoutRadioTitle } = props
  return (
    <>
      {addresses?.map((item: CustomerContact) => (
        <Box paddingY={1} key={item.id + 'address'}>
          <AddressCard title={withoutRadioTitle} {...buildAddressProps(item.address)} />
        </Box>
      ))}
    </>
  )
}

const KiboRadioAddressList = (props: KiboAddressListProps) => {
  const { addresses, selectedAddressId, heading, subHeading, onAddressSelect } = props
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressId)
  const { t } = useTranslation(['common'])
  const radioOptions = addresses?.reduce((arr: any, item: CustomerContact, index: number) => {
    if (item.id)
      arr.push({
        value: `${item.id}`,
        label: (
          <AddressCard
            title={index === 0 ? t('common:primary') : ''}
            {...buildAddressProps(item.address)}
          />
        ),
      })
    return arr
  }, [])

  useEffect(() => {
    if (!!selectedAddress) onAddressSelect(selectedAddress)
  }, [selectedAddress])

  return (
    <Stack gap={1} width="100%">
      {heading && (
        <Typography variant="h4" fontWeight={'bold'}>
          {heading}
        </Typography>
      )}
      <Box>
        <KiboRadio
          radioOptions={radioOptions?.slice(0, 1)}
          selected={selectedAddress}
          onChange={(id) => setSelectedAddress(id)}
        />
      </Box>
      {subHeading && (
        <Typography variant="h4" fontWeight={'bold'}>
          {subHeading}
        </Typography>
      )}
      <KiboRadio
        radioOptions={radioOptions?.slice(1)}
        selected={selectedAddress}
        onChange={(id) => setSelectedAddress(id)}
      />
    </Stack>
  )
}

export default AddressList
