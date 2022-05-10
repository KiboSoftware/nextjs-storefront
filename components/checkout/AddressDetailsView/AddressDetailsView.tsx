import React from 'react'

import { Box } from '@mui/material'

import AddressCard from '@/components/common/AddressCard/AddressCard'
import KiboRadio from '@/components/common/KiboRadio/KiboRadio'

import { CrAddress } from '@/lib/gql/types'

interface AddressDetailsViewProps extends CrAddress {
  radioGroupTitle?: string
  withoutRadioTitle?: string
  radio?: boolean
}

const AddressDetailsView = (props: AddressDetailsViewProps) => {
  const {
    radioGroupTitle,
    withoutRadioTitle,
    radio = false,
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
  } = props

  const radioOptions = [
    {
      value: `${address1},${address2},${cityOrTown},${stateOrProvince},${postalOrZipCode}`,
      label: (
        <AddressCard
          title="Primary" // check if primary address
          address1={address1}
          address2={address2}
          cityOrTown={cityOrTown}
          stateOrProvince={stateOrProvince}
          postalOrZipCode={postalOrZipCode}
        />
      ),
    },
  ]

  const [selectedRadio, setSelectedRadio] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio((event.target as HTMLInputElement).value)
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

      {!radio && (
        <AddressCard
          title={withoutRadioTitle}
          radio={radio}
          address1={address1}
          address2={address2}
          cityOrTown={cityOrTown}
          stateOrProvince={stateOrProvince}
          postalOrZipCode={postalOrZipCode}
        />
      )}
    </Box>
  )
}

export default AddressDetailsView
