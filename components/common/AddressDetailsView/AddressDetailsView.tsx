import React from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressCard, KiboRadio } from '@/components/common'

import type { CrAddress } from '@/lib/gql/types'

interface AddressDetailsViewProps extends CrAddress {
  id?: number | string
  firstName?: string
  middleNameOrInitial?: string
  lastNameOrSurname?: string
  address1?: string
  address2?: string
  cityOrTown?: string
  stateOrProvince?: string
  postalOrZipCode?: string
  withoutRadioTitle?: string
  radio?: boolean
  isPrimary?: boolean
  selected?: string | number
  handleRadioChange?: (value: string) => void
}

const AddressDetailsView = (props: AddressDetailsViewProps) => {
  const {
    id,
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
    isPrimary,
    selected,
    handleRadioChange,
  } = props

  const { t } = useTranslation('common')

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
      value: String(id),
      name: `${address1},${address2},${cityOrTown},${stateOrProvince},${postalOrZipCode}`,
      label: <AddressCard {...addressCardProps} />,
    },
  ]

  return (
    <Box maxWidth={'fit-content'}>
      {radio && (
        <KiboRadio
          optionIndicator={isPrimary ? t('primary') : ''}
          radioOptions={radioOptions}
          selected={String(selected)}
          align="flex-start"
          onChange={(value) => handleRadioChange && handleRadioChange(value)}
        />
      )}

      {!radio && <AddressCard title={withoutRadioTitle} {...addressCardProps} />}
    </Box>
  )
}

export default AddressDetailsView
