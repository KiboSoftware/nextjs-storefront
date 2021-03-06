import React, { useState } from 'react'

import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

import { KiboDialog } from '@/components/common'
import { SearchStore } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useStoreLocations, useCurrentLocation } from '@/hooks'
import { LocationCustom } from '@/lib/types'

import type { Location, Maybe } from '@/lib/gql/types'

interface StoreLocatorProps {
  isOpen: boolean
  isDialogCentered: boolean
  handleSetStore: (selectedStore: LocationCustom) => void
}

// Component
const StoreLocatorDialog = (props: StoreLocatorProps) => {
  const { isOpen = true, isDialogCentered, handleSetStore } = props

  const { t } = useTranslation('common')
  const { closeModal } = useModalContext()
  const { publicRuntimeConfig } = getConfig()
  const { getCurrentLocation } = useCurrentLocation()

  const [searchParams, setSearchParams] = useState<{ filter: string }>({ filter: '' })
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedStore, setSelectedStore] = React.useState<LocationCustom>({})
  const { isError, data: locations } = useStoreLocations(searchParams)

  const initialState = Boolean(!searchParams.filter)

  const handleSearchByCurrentLocation = async () => {
    const { longitude, latitude } = await getCurrentLocation()
    const param = {
      filter: `geo near(${latitude},${longitude},${publicRuntimeConfig.storeLocator.defaultRange})`,
    }
    setSearchParams(param)
    setSearchTerm('')
  }
  const handleSearchByInput = (inputValue: string) => {
    const param = {
      filter: `geo near(${inputValue},${publicRuntimeConfig.storeLocator.defaultRange})`,
    }
    setSearchParams(param)
  }

  const DialogArgs = {
    isOpen: isOpen,
    Title: t('select-store'),
    Content: (
      <SearchStore
        spLocations={!isError ? (locations as Maybe<Location>[]) : []}
        searchTerm={searchTerm}
        initialState={initialState}
        selectedStore={selectedStore?.code as string}
        setSearchTerm={setSearchTerm}
        setSelectedStore={setSelectedStore}
        onStoreByZipcode={handleSearchByInput}
        onStoreByCurrentLocation={handleSearchByCurrentLocation}
      />
    ),
    showContentTopDivider: true,
    showContentBottomDivider: true,
    Actions: (
      <Box
        sx={{
          width: '100%',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: '0 2%',
        }}
      >
        <Button
          sx={{ width: '100%', marginBottom: 1 }}
          variant="contained"
          color="secondary"
          onClick={closeModal}
        >
          {t('cancel')}
        </Button>
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          onClick={() => handleSetStore(selectedStore)}
        >
          {t('set-store')}
        </Button>
      </Box>
    ),
    isDialogCentered: isDialogCentered,
    customMaxWidth: '34.19rem',
    onClose: closeModal,
  }

  return <KiboDialog {...DialogArgs} />
}
export default StoreLocatorDialog
