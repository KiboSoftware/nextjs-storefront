import React, { useState } from 'react'

import FmdGoodIcon from '@mui/icons-material/FmdGood'
import { Box, Button, Typography } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { SearchStore } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useGetStoreLocations, useCurrentLocation, useGetProductInventory } from '@/hooks'
import { storeLocationGetters } from '@/lib/getters'
import type { LocationCustom, ProductCustom } from '@/lib/types'

import type { Location, Maybe } from '@/lib/gql/types'

interface StoreLocatorProps {
  isOpen: boolean
  isDialogCentered: boolean
  title?: string
  showProductAndInventory?: boolean
  product?: ProductCustom
  quantity?: number
  handleSetStore: (selectedStore: LocationCustom) => void
}

// Component
const StoreLocatorDialog = (props: StoreLocatorProps) => {
  const {
    isOpen = true,
    isDialogCentered,
    title,
    showProductAndInventory = false,
    product,
    quantity,
    handleSetStore,
  } = props

  const { t } = useTranslation('common')
  const { closeModal } = useModalContext()
  const { publicRuntimeConfig } = getConfig()
  const { getCurrentLocation } = useCurrentLocation()

  const [searchParams, setSearchParams] = useState<{ filter: string }>({ filter: '' })
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedStore, setSelectedStore] = React.useState<LocationCustom>({})

  const { isError, data: locations } = useGetStoreLocations(searchParams)
  const locationCodes: string = storeLocationGetters.getLocationCodes(
    locations as Maybe<Location>[]
  )
  const { data: locationInventory } = useGetProductInventory(
    (product?.variationProductCode || product?.productCode) as string,
    locationCodes
  )

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
    Title: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FmdGoodIcon sx={{ color: 'primary.main' }} />
        <Typography ml={1} fontWeight={700} variant="h3">
          {title || t('select-store')}
        </Typography>
      </Box>
    ),
    Content: (
      <SearchStore
        spLocations={!isError ? (locations as Maybe<Location>[]) : []}
        showProductAndInventory={showProductAndInventory}
        product={product}
        locationInventory={locationInventory}
        quantity={quantity}
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
          disabled={
            !selectedStore.code || (showProductAndInventory && locationInventory?.length === 0)
          }
          onClick={() => {
            handleSetStore(selectedStore)
            closeModal()
          }}
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
