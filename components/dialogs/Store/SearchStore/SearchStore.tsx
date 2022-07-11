import React from 'react'

import {
  Typography,
  Box,
  InputLabel,
  Button,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Link,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { StoreDetails } from '..'
import { FullWidthDivider, KiboRadio } from '@/components/common'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'
import { LocationCustom } from '@/lib/types'

import type { Maybe, Location } from '@/lib/gql/types'

interface SearchStoreProps {
  spLocations: Maybe<Location>[]
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
    return {
      value: location?.code || '',
      label: <StoreDetails {...location} />,
    }
  })

  const handleStoreSelection = (value: string) => {
    const selectedLocation = locations.find((location) => location.code === value)
    setSelectedStore(selectedLocation as LocationCustom)
  }
  return (
    <>
      <Stack spacing={2} py={1}>
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
          <FormGroup>
            <FormControlLabel
              color="grey.900"
              componentsProps={{ typography: { variant: 'body2' } }}
              control={<Checkbox />}
              label={t('show-stores-with-availability')}
            />
          </FormGroup>
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
          <FullWidthDivider />
        </Box>
      )}
    </>
  )
}

export default SearchStore
