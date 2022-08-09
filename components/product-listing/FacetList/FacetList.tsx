import React from 'react'

import { Close } from '@mui/icons-material'
import { Stack, Box, Typography, useMediaQuery, useTheme, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FilterTiles, FullWidthDivider } from '@/components/common'
import { Facet } from '@/components/product-listing'

import type { Facet as FacetType, FacetValue } from '@/lib/gql/types'

// Interface
interface FacetListProps {
  facetList?: FacetType[]
  initialItemsToShow?: number
  appliedFilters: FacetValue[]
  showSearchAndCount?: boolean
  shouldRouteUpdate?: boolean
  onFilterByClose: () => void
  onSelectedTileRemoval: (tile: string) => void
  onFacetItemSelection?: (selectedFacetItems: string) => void
}

const styles = {
  filterBy: {
    padding: { xs: '0 1rem', md: '0' },
    margin: '12px 0',
    typography: 'body2',
    fontWeight: 'bold',
    display: { xs: 'flex' },
    justifyContent: { xs: 'space-between' },
    alignItems: { xs: 'center' },
  },
  Close: {
    display: {
      md: 'none',
    },
    cursor: 'pointer',
    color: 'grey.600',
  },
}

// Component
const FacetList = (props: FacetListProps) => {
  const {
    facetList = [],
    appliedFilters,
    initialItemsToShow = 6,
    showSearchAndCount = true,
    shouldRouteUpdate = true,
    onFilterByClose,
    onSelectedTileRemoval,
    onFacetItemSelection,
  } = props

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Box sx={{ ...styles.filterBy }}>
        <Typography
          variant={mdScreen ? 'h3' : 'h2'}
          color="GrayText.primary"
          sx={{ fontWeight: 'bold' }}
        >
          {t('filter-by')}
        </Typography>
        <Close sx={{ ...styles.Close }} onClick={onFilterByClose} />
      </Box>
      <Box sx={{ display: { md: 'none' }, margin: '1rem 0 0 1rem' }}>
        <FilterTiles
          appliedFilters={appliedFilters}
          onSelectedTileRemoval={onSelectedTileRemoval}
        />
      </Box>
      {mdScreen ? <Divider sx={{ borderColor: 'grey.500' }} /> : <FullWidthDivider />}
      <Stack>
        {facetList
          .filter((facet) => facet?.facetType === 'Value' || facet?.facetType === 'RangeQuery')
          .map((facet, index) => (
            <Facet
              key={index}
              numberOfItemsToShow={initialItemsToShow}
              label={facet?.label}
              values={facet?.values}
              showSearchAndCount={showSearchAndCount}
              shouldRouteUpdate={shouldRouteUpdate}
              onFacetItemSelection={onFacetItemSelection}
            />
          ))}
      </Stack>
    </>
  )
}

export default FacetList
