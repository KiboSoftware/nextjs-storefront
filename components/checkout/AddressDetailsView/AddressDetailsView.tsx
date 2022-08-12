import React from 'react'

import { Box } from '@mui/material'

import AddressCard from '@/components/common/AddressCard/AddressCard'
import KiboRadio from '@/components/common/KiboRadio/KiboRadio'

import type { CrAddress } from '@/lib/gql/types'

interface AddressDetailsViewProps extends CrAddress {
  firstName?: string
  middleNameOrInitial?: string
  lastNameOrSurname?: string
  radioGroupTitle?: string
  withoutRadioTitle?: string
  radio?: boolean
}

const AddressDetailsView = (props: AddressDetailsViewProps) => {
  const {
    radioGroupTitle,
    withoutRadioTitle,
    radio = false,
    firstName,
    middleNameOrInitial,
    lastNameOrSurname,
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
  } = props

  const addressCardProps = {
    firstName: firstName,
    middleNameOrInitial: middleNameOrInitial,
    lastNameOrSurname: lastNameOrSurname,
    address1: address1,
    address2: address2,
    cityOrTown: cityOrTown,
    stateOrProvince: stateOrProvince,
    postalOrZipCode: postalOrZipCode,
  }

  const radioOptions = [
    {
      value: `${address1},${address2},${cityOrTown},${stateOrProvince},${postalOrZipCode}`,
      name: `${address1},${address2},${cityOrTown},${stateOrProvince},${postalOrZipCode}`,
      label: (
        <AddressCard
          title="Primary" // check if primary address,
          {...addressCardProps}
        />
      ),
    },
  ]

  const [selectedRadio, setSelectedRadio] = React.useState('')

  const handleChange = (value: string) => {
    setSelectedRadio(value)
  }

  return (
    <Box maxWidth={'fit-content'}>
      {radio && (
        <KiboRadio
          title={radioGroupTitle}
          radioOptions={radioOptions}
          selected={selectedRadio}
          onChange={handleChange}
        />
      )}

      {!radio && <AddressCard title={withoutRadioTitle} {...addressCardProps} />}
    </Box>
  )
}

export default AddressDetailsView
