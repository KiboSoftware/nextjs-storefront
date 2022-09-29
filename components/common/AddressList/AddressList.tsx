import React, { useEffect, useState } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboRadio, AddressCard } from '@/components/common'

import type { CrAddress, CuAddress, CustomerContact } from '@/lib/gql/types'

interface AddressListProps {
  heading?: string
  subHeading?: string
  radio?: boolean
  addresses: CustomerContact[] | undefined
  selectedAddressId?: string
  onAddressSelection: (addressId: string) => void
}

interface KiboAddressListProps {
  addresses: CustomerContact[] | undefined
  heading?: string
  subHeading?: string
  selectedAddressId?: string
  onAddressSelect: (addressId: string) => void
}
const buildAddressProps = (address: CuAddress | CrAddress) => {
  const { address1, address2, cityOrTown, stateOrProvince, postalOrZipCode } = address
  return {
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
  }
}

const AddressList = (props: AddressListProps) => {
  const {
    addresses,
    heading,
    subHeading,
    radio = false,
    selectedAddressId,
    onAddressSelection,
  } = props
  const { t } = useTranslation('common')

  return (
    <Box maxWidth={'fit-content'}>
      {addresses?.length ? (
        radio ? (
          <KiboRadioAddressList
            addresses={addresses}
            heading={heading}
            subHeading={subHeading}
            selectedAddressId={selectedAddressId}
            onAddressSelect={(addressId) => onAddressSelection(addressId)}
          />
        ) : (
          <KiboAddressList addresses={addresses} heading={heading} onAddressSelection={() => ''} />
        )
      ) : (
        <Typography variant="h4" fontWeight={'bold'}>
          {t('no-saved-addresses-yet')}
        </Typography>
      )}
    </Box>
  )
}

const KiboAddressList = (props: AddressListProps) => {
  const { addresses, heading } = props
  const { t } = useTranslation('common')

  return (
    <>
      {heading && (
        <Typography variant="h4" fontWeight={'bold'}>
          {heading}
        </Typography>
      )}
      {addresses?.map((item: CustomerContact, index) => (
        <Box paddingY={1} key={item.id + 'address'}>
          <AddressCard
            title={index === 0 ? t('primary') : ''}
            {...buildAddressProps(item.address as CuAddress)}
          />
        </Box>
      ))}
    </>
  )
}

const KiboRadioAddressList = (props: KiboAddressListProps) => {
  const { addresses, selectedAddressId, heading, subHeading, onAddressSelect } = props
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressId)
  const { t } = useTranslation('common')
  const radioOptions = addresses?.reduce((arr: any, item: CustomerContact, index: number) => {
    if (item.id)
      arr.push({
        value: `${item.id}`,
        name: `${item.id}`,
        label: (
          <AddressCard
            title={index === 0 ? t('primary') : ''}
            {...buildAddressProps(item.address as CuAddress)}
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
