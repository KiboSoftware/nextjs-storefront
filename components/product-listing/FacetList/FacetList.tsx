import React from 'react'

import { Close } from '@mui/icons-material'
import { Stack, Box, Typography, useMediaQuery, useTheme, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import FilterTiles from '@/components/common/FilterTiles/FilterTiles'
import FullWidthDivider from '@/components/FullWidthDivider'
import { Facet } from '@/components/product-listing'

import type { Facet as FacetType, FacetValue } from '@/lib/gql/types'

// Interface
interface FacetListProps {
  facetList?: FacetType[]
  initialItemsToShow?: number
  appliedFilters?: FacetValue[]
  onFilterByClose: () => void
  onRemoveSelectedTile: (tile: string) => void
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
    onFilterByClose,
    onRemoveSelectedTile,
    appliedFilters,
    initialItemsToShow = 6,
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
      <Box sx={{ display: { md: 'none' } }}>
        <FilterTiles appliedFilters={appliedFilters} onRemoveSelectedTile={onRemoveSelectedTile} />
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
            />
          ))}
      </Stack>
    </>
  )
}

export default FacetList
