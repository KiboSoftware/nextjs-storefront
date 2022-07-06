import React, { useEffect, useState } from 'react'

import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { SearchStore } from '..'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { useModalContext } from '@/context'
import { useStoreLocations } from '@/hooks'
import { useCurrentLocation } from '@/hooks/custom/useCurrentLocation/useCurrentLocation'

import type { Location, Maybe } from '@/lib/gql/types'

interface StoreLocatorProps {
  isOpen: boolean
  isDialogCentered: boolean
  handleSetStore: (selectedStore: string) => void
}

// Component
const StoreLocatorDialog = (props: StoreLocatorProps) => {
  const { isOpen = true, isDialogCentered, handleSetStore } = props
  const [zipcode, setZipcode] = useState<string>('')

  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { currentLocation, getCurrentLocation } = useCurrentLocation()
  const {
    refetch,
    isError,
    data: spLocations,
  } = useStoreLocations(zipcode, currentLocation, '160934')
  const initialState = !(zipcode && currentLocation) && Object.keys(spLocations).length === 0

  const handleStoreByCurrentLocation = async () => {
    getCurrentLocation()
    setZipcode('')
  }

  const handleSetStoreClick = async () => {
    console.log('handleSetStoreClick')
  }

  useEffect(() => {
    if (zipcode.trim() || currentLocation) {
      refetch()
    }
  }, [refetch, zipcode, currentLocation])

  const DialogArgs = {
    isOpen: isOpen,
    Title: t('select-store'),
    Content: (
      <SearchStore
        locations={!isError ? (spLocations as Maybe<Location>[]) : []}
        initialState={initialState}
        handleSetStore={handleSetStore}
        onStoreByZipcode={setZipcode}
        onStoreByCurrentLocation={handleStoreByCurrentLocation}
      />
    ),
    showContentTopDivider: true,
    showContentBottomDivider: false,
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
        <Button sx={{ width: '100%' }} variant="contained" onClick={handleSetStoreClick}>
          {t('set-store')}
        </Button>
      </Box>
    ),
    isDialogCentered: isDialogCentered,
    customMaxWidth: '32.375rem',
    onClose: closeModal,
  }

  return <KiboDialog {...DialogArgs} />
}
export default StoreLocatorDialog
