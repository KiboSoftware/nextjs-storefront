import React from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import StoreDetails from '../StoreDetails/StoreDetails'
import KiboRadio from '@/components/common/KiboRadio/KiboRadio'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

import type { Maybe, Location } from '@/lib/gql/types'

interface ViewStoreProps {
  spLocations: Maybe<Location>[]
  selectedStore: string
  radio: boolean
  handleSetStore: (selectedStore: string) => void
}

const ViewStore = (props: ViewStoreProps) => {
  const { spLocations, selectedStore, radio } = props
  const { t } = useTranslation('common')
  const [selectedRadio, setSelectedRadio] = React.useState('')

  const locations = storeLocationGetters.getLocations(spLocations)

  const handleChange = (value: string) => {
    setSelectedRadio(value)
  }
  const radioOptions = [
    {
      value: '',
      label: <StoreDetails {...location} />,
    },
  ]

  return (
    <Box maxWidth={'fit-content'}>
      {locations?.map((location) => (
        <Box key={location?.code}>
          {radio && (
            <KiboRadio
              radioOptions={radioOptions}
              selected={selectedRadio}
              sx={{ alignItems: 'flex-start' }}
              onChange={handleChange}
            />
          )}
          {!radio && <StoreDetails {...location} />}
        </Box>
      ))}
    </Box>
  )
}

export default ViewStore
