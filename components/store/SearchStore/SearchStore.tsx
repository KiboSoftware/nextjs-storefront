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

import ViewStore from '../ViewStore/ViewStore'
import SearchBar from '@/components/common/SearchBar/SearchBar'

import type { Maybe, Location } from '@/lib/gql/types'

interface SearchStoreProps {
  locations: Maybe<Location>[]
  handleSetStore: (selectedStore: string) => void
  onStoreSearchByZipcode: (userEnteredValue: string) => void
}

const SearchStore = (props: SearchStoreProps) => {
  const { locations, handleSetStore, onStoreSearchByZipcode } = props
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { t } = useTranslation('common')

  const handleSearch = (userEnteredValue: string) => setSearchTerm(userEnteredValue)
  const handleStoreSearchByZipcode = () => onStoreSearchByZipcode(searchTerm)

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
              onClick={handleStoreSearchByZipcode}
            >
              {t('search')}
            </Button>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link color="grey.900" sx={{ cursor: 'pointer', pt: 1.5 }} variant={'body2'}>
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
        {t('find-stores-within-100-miles')}
      </Typography>
      <Divider />
      <ViewStore
        spLocations={locations}
        selectedStore={''}
        radio={false}
        handleSetStore={handleSetStore}
      />
      <Divider />
    </Box>
  )
}

export default SearchStore
