import React, { Dispatch, SetStateAction, useState } from 'react'

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

import { ViewStore } from '..'
import SearchBar from '@/components/common/SearchBar/SearchBar'

import type { Maybe, Location } from '@/lib/gql/types'

interface SearchStoreProps {
  locations: Maybe<Location>[]
  initialState: boolean
  handleSetStore: (selectedStore: string) => void
  onStoreByZipcode: (userEnteredValue: string) => void
  onStoreByCurrentLocation: () => void
}

const SearchStore = (props: SearchStoreProps) => {
  const { locations, initialState, handleSetStore, onStoreByZipcode, onStoreByCurrentLocation } =
    props
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { t } = useTranslation('common')

  const handleSearch = (userEnteredValue: string) => setSearchTerm(userEnteredValue)
  const handleStoreByZipcode = () => onStoreByZipcode(searchTerm)
  const handleStoreByCurrentLocation = () => onStoreByCurrentLocation()

  return (
    <Box>
      <Stack spacing={2} py={1}>
        <Box>
          <InputLabel shrink>{t('zip-code')}</InputLabel>
          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <SearchBar searchTerm={searchTerm} onSearch={handleSearch} showClearButton />
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
          ? t('find-stores-within-100-miles')
          : locations && locations?.length > 0
          ? t('stores-within-100-miles', { seletedStore: locations?.length })
          : t('no-stores-within-100-miles')}
      </Typography>
      <Divider />

      <ViewStore
        spLocations={locations as Maybe<Location>[]}
        radio={true}
        handleSetStore={handleSetStore}
      />
      <Divider />
    </Box>
  )
}

export default SearchStore
