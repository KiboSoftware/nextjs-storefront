import React, { useEffect, useState } from 'react'

import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import SearchStore from '../SearchStore/SearchStore'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { useModalContext } from '@/context'
import { useStoreLocations } from '@/hooks'

import type { Location, Maybe } from '@/lib/gql/types'

interface StoreLocatorProps {
  isOpen: boolean
  isDialogCentered: boolean
  handleSetStore: () => void
}

// Component
const StoreLocatorDialog = (props: StoreLocatorProps) => {
  const { isOpen = true, isDialogCentered, handleSetStore } = props
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const {
    refetch,
    isError,
    data: storeLocations,
  } = useStoreLocations(searchTerm ? { filter: `geo near(${searchTerm},160934)` } : undefined)

  const locations =
    (Object.keys(storeLocations).length > 0 && !isError && (storeLocations as Maybe<Location>[])) ||
    []

  const handleStoreByCurrentLocation = () => {
    console.log('handleStoreByCurrentLocation')
  }

  useEffect(() => {
    if (searchTerm.trim()) {
      refetch()
    }
  }, [refetch, searchTerm])

  const DialogArgs = {
    isOpen: isOpen,
    Title: t('select-store'),
    Content: (
      <SearchStore
        locations={locations}
        handleSetStore={handleSetStore}
        onStoreByZipcode={setSearchTerm}
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
        <Button sx={{ width: '100%' }} variant="contained" onClick={handleSetStore}>
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
