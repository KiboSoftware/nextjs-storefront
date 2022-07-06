import React from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import StoreDetails from '../StoreDetails/StoreDetails'
import KiboRadio from '@/components/common/KiboRadio/KiboRadio'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

import type { Maybe, Location } from '@/lib/gql/types'

interface ViewStoreProps {
  spLocations: Maybe<Location>[]
  selectedStore?: string
  radio: boolean
  handleSetStore: (selectedStore: string) => void
}

const ViewStore = (props: ViewStoreProps) => {
  const { spLocations, radio, handleSetStore } = props
  const [selectedRadio, setSelectedRadio] = React.useState('')

  const locations = storeLocationGetters.getLocations(spLocations)
  const radioOptions = locations.map((location) => {
    return {
      value: location?.code,
      label: <StoreDetails {...location} />,
    }
  })

  const handleStoreSelection = (value: string) => {
    handleSetStore(value)
    setSelectedRadio(value)
  }

  return (
    <Box maxWidth={'fit-content'}>
      {radio && (
        <KiboRadio
          radioOptions={radioOptions}
          selected={selectedRadio}
          sx={{ alignItems: 'flex-start' }}
          onChange={handleStoreSelection}
        />
      )}
    </Box>
  )
}

export default ViewStore
