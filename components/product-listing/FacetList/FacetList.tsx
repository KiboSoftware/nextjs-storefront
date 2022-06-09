import React from 'react'

import { Close } from '@mui/icons-material'
import { Stack, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Facet } from '@/components/product-listing'

import type { Facet as FacetType } from '@/lib/gql/types'

// Interface
interface FacetListProps {
  facetList?: FacetType[]
  onFilterByClose: () => void
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
  const { facetList = [], onFilterByClose } = props

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Box
        sx={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'grey.500' }}
      >
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
      </Box>
      <Stack>
        {facetList
          .filter((facet) => facet?.facetType === 'Value' || facet?.facetType === 'RangeQuery')
          .map((facet, index) => (
            <Facet
              key={index}
              numberOfItemsToShow={6}
              label={facet?.label}
              values={facet?.values}
            />
          ))}
      </Stack>
    </>
  )
}

export default FacetList
