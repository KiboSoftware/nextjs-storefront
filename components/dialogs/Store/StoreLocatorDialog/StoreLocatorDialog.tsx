import React, { useState } from 'react'

import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

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

  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { publicRuntimeConfig } = getConfig()
  const { getCurrentLocation } = useCurrentLocation()

  const [searchParams, setSearchParams] = useState<any>({})
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { isError, data: locations } = useStoreLocations(searchParams)

  const initialState = Object.keys(searchParams).length === 0

  const handleSearchByCurrentLocation = async () => {
    const { longitude, latitude } = await getCurrentLocation()
    const param = {
      filter: `geo near(${latitude},${longitude})`,
    }
    setSearchParams(param)
    setSearchTerm('')
  }
  const handleSearchByInput = (inputValue: string) => {
    const param = {
      filter: `geo near(${inputValue},${publicRuntimeConfig.defaultRange})`,
    }
    setSearchParams(param)
  }

  const handleSetStoreClick = async () => {
    console.log('handleSetStoreClick')
  }

  const DialogArgs = {
    isOpen: isOpen,
    Title: t('select-store'),
    Content: (
      <SearchStore
        spLocations={!isError ? (locations as Maybe<Location>[]) : []}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        initialState={initialState}
        handleSetStore={handleSetStore}
        onStoreByZipcode={handleSearchByInput}
        onStoreByCurrentLocation={handleSearchByCurrentLocation}
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
