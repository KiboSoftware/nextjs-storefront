import React from 'react'

import { Typography, Box, InputLabel, Button, Stack, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FullWidthDivider, KiboRadio, ProductItem, SearchBar } from '@/components/common'
import { StoreDetails } from '@/components/dialogs'
import { productGetters } from '@/lib/getters'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'
import type { LocationCustom, ProductCustom } from '@/lib/types'

import type { Maybe, Location, LocationInventory } from '@/lib/gql/types'

interface SearchStoreProps {
  spLocations: Maybe<Location>[]
  showProductAndInventory?: boolean
  product?: ProductCustom
  locationInventory?: LocationInventory[]
  quantity?: number
  searchTerm: string
  initialState: boolean
  selectedStore: string
  setSelectedStore: (selectedStore: LocationCustom) => void
  setSearchTerm: (value: string) => void
  onStoreByZipcode: (userEnteredValue: string) => void
  onStoreByCurrentLocation: () => void
}

const SearchStore = (props: SearchStoreProps) => {
  const {
    spLocations,
    showProductAndInventory = false,
    product,
    locationInventory = [],
    quantity,
    searchTerm = '',
    initialState,
    selectedStore,
    setSearchTerm,
    setSelectedStore,
    onStoreByZipcode,
    onStoreByCurrentLocation,
  } = props
  const { t } = useTranslation('common')
  const handleStoreByZipcode = () => onStoreByZipcode(searchTerm)
  const handleStoreByCurrentLocation = () => onStoreByCurrentLocation()

  const locations = storeLocationGetters.getLocations(spLocations)
  const storeOptions = locations?.map((location) => {
    const inventory = locationInventory?.find(
      (inventory) => inventory?.locationCode === location.code
    )
    return {
      value: location?.code || '',
      name: location?.name as string,
      label: (
        <StoreDetails
          location={location}
          showProductAndInventory={showProductAndInventory}
          inventory={inventory}
        />
      ),
      disabled: showProductAndInventory && !inventory,
    }
  })

  const handleStoreSelection = (value: string) => {
    const selectedLocation = locations.find((location) => location.code === value)
    setSelectedStore(selectedLocation as LocationCustom)
  }

  return (
    <>
      <Stack spacing={2} py={1}>
        {showProductAndInventory && (
          <Box>
            <ProductItem
              image={productGetters.getCoverImage(product as ProductCustom)}
              name={productGetters.getName(product as ProductCustom)}
              price={productGetters.getPrice(product as ProductCustom).regular?.toString()}
              salePrice={productGetters.getPrice(product as ProductCustom).special?.toString()}
              qty={quantity}
            />
          </Box>
        )}
        <Box>
          <InputLabel shrink>{t('zip-code')}</InputLabel>
          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} showClearButton />
            </Box>
            <Button
              variant="contained"
              name={t('search')}
              aria-label={t('search')}
              onClick={handleStoreByZipcode}
            >
              {t('search')}
            </Button>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link
            component="button"
            color="grey.900"
            sx={{ cursor: 'pointer' }}
            variant={'body2'}
            onClick={handleStoreByCurrentLocation}
          >
            {t('use-current-location')}
          </Link>
        </Box>
      </Stack>
      <FullWidthDivider />
      <Typography variant="body2" py={2} textAlign="center">
        {initialState
          ? t('find-stores-within-miles')
          : t('stores-within-miles', { count: locations?.length || 0 })}
      </Typography>
      {locations && locations?.length > 0 && (
        <Box>
          <FullWidthDivider />
          <Box maxWidth={'fit-content'}>
            <KiboRadio
              radioOptions={storeOptions}
              selected={selectedStore}
              sx={{ alignItems: 'flex-start' }}
              onChange={handleStoreSelection}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default SearchStore
