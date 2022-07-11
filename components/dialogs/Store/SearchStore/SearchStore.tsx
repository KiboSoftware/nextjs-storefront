import React from 'react'

import {
  Typography,
  Box,
  Divider,
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
import { KiboRadio } from '@/components/common'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

import type { Maybe, Location } from '@/lib/gql/types'

interface SearchStoreProps {
  spLocations: Maybe<Location>[]
  searchTerm: string
  initialState: boolean
  selectedRadio: string
  setSelectedRadio: (selectedStore: string) => void
  setSearchTerm: (value: string) => void
  onStoreByZipcode: (userEnteredValue: string) => void
  onStoreByCurrentLocation: () => void
}

const SearchStore = (props: SearchStoreProps) => {
  const {
    spLocations,
    searchTerm,
    initialState,
    selectedRadio,
    setSearchTerm,
    setSelectedRadio,
    onStoreByZipcode,
    onStoreByCurrentLocation,
  } = props
  const { t } = useTranslation('common')
  const handleStoreByZipcode = () => onStoreByZipcode(searchTerm)
  const handleStoreByCurrentLocation = () => onStoreByCurrentLocation()

  const locations = storeLocationGetters.getLocations(spLocations)
  const radioOptions = locations.map((location) => {
    return {
      value: location?.code,
      label: <StoreDetails {...location} />,
    }
  })

  const handleStoreSelection = (value: string) => {
    setSelectedRadio(value)
  }
  return (
    <Box>
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
            sx={{ cursor: 'pointer', pt: 1.5 }}
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
              label={t('show-stores-with-availability') as string}
            />
          </FormGroup>
        </Box>
      </Stack>
      <Divider />
      <Typography variant="body2" py={2} textAlign="center">
        {initialState
          ? t('find-stores-within-miles')
          : t('stores-within-miles', { count: locations?.length })}
      </Typography>
      {locations.length > 0 && (
        <Box>
          <Divider />
          <Box maxWidth={'fit-content'}>
            <KiboRadio
              radioOptions={radioOptions}
              selected={selectedRadio}
              sx={{ alignItems: 'flex-start' }}
              onChange={handleStoreSelection}
            />
          </Box>
          <Divider />
        </Box>
      )}
    </Box>
  )
}

export default SearchStore
