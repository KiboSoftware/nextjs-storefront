import React, { useState } from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FacetList } from '@/components/product-listing'

import type { Facet as FacetType, FacetValue } from '@/lib/gql/types'

interface FilterOrdersProps {
  facetList?: FacetType[]
  appliedFilters: FacetValue[]
  onFilterApply: (selectedFilters: string) => void
  onFilterByClose: () => void
  onSelectedTileRemoval: (tile: string) => void
}

const styles = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
  navBarMainMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1rem',
  },
  closeIcon: {
    display: {
      md: 'none',
    },
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    boxShadow: 0,
    margin: '1rem 0',
  },
  viewResults: {
    width: '7.063rem',
    height: '2rem',
    textTransform: 'capitalize',
  },
  upperTotal: {
    typography: 'body2',
    color: 'grey.600',
    whiteSpace: 'nowrap',
  },
  lowerTotal: {
    display: 'flex',
    justifyContent: 'center',
    typography: 'body2',
    color: 'text.primary',
    fontWeight: 'bold',
  },
  headerSkeletonLoading: {
    height: { md: '1.75rem', xs: '1.5rem' },
    width: { md: '15.625rem', xs: '10.75rem' },
  },
}

const FilterOrders = (props: FilterOrdersProps) => {
  const { facetList, appliedFilters, onFilterApply, onFilterByClose, onSelectedTileRemoval } = props

  const { t } = useTranslation('common')
  const [selectedFacetItems, setSelectedFacetItems] = useState<string>('')

  const handleFilterByClose = () => onFilterByClose()
  const handleFilterApply = () => {
    selectedFacetItems && onFilterApply(selectedFacetItems)
    onFilterByClose()
  }
  const handleFacetItemSelection = (selectedItems: string) => setSelectedFacetItems(selectedItems)

  return (
    <Stack>
      <Stack sx={styles.wrapIcon} direction="row" gap={2} onClick={handleFilterByClose}>
        <ArrowBackIos fontSize="inherit" sx={styles.wrapIcon} />
        <Typography variant="body2">{t('order-history')}</Typography>
      </Stack>
      <Stack sx={{ py: '1.2rem' }}>
        <FacetList
          facetList={facetList}
          appliedFilters={appliedFilters}
          showSearchAndCount={false}
          shouldRouteUpdate={false}
          onFilterByClose={onFilterByClose}
          onSelectedTileRemoval={onSelectedTileRemoval}
          onFacetItemSelection={handleFacetItemSelection}
        />
        <Box sx={{ ...styles.buttons }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ ...styles.viewResults }}
            onClick={handleFilterApply}
          >
            {t('apply')}
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}

export default FilterOrders
