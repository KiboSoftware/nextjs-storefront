import React from 'react'

import { Box, Button, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FacetList } from '@/components/product-listing'

import type { Facet as FacetType } from '@/lib/gql/types'

interface CategoryFilterByMobileProps {
  facetList: FacetType[]
  header: string
  totalResults: number
  isLoading?: boolean
  onFilterByClose: () => void
}

const styles = {
  navBarMainMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 1rem 1rem',
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
  clearAll: {
    textTransform: 'capitalize',
    color: 'text.primary',
    boxShadow: 0,
    width: '7.063rem',
    height: '2rem',
  },
  viewResults: {
    width: '7.063rem',
    height: '2rem',
    textTransform: 'capitalize',
  },
  upperTotal: {
    typography: 'body2',
    color: 'grey.600',
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

// Component
const CategoryFilterByMobile = (props: CategoryFilterByMobileProps) => {
  const { facetList, totalResults, header, onFilterByClose, isLoading } = props

  const { t } = useTranslation(['product', 'common'])

  const headerPart = (
    <>
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
        {header}
      </Typography>
      <Box sx={{ ...styles.upperTotal }}>{t('results', { totalResults })}</Box>
    </>
  )

  const skeletonPart = (
    <>
      <Skeleton variant="rectangular" sx={{ ...styles.headerSkeletonLoading }} />
      <Skeleton variant="rectangular" height={23} width={74} />
    </>
  )

  return (
    <>
      <Box sx={{ display: { md: 'none' } }}>
        <Box sx={{ ...styles.navBarMainMobile }}>{!isLoading ? headerPart : skeletonPart}</Box>
        <FacetList facetList={facetList} onFilterByClose={onFilterByClose} />
        <Box sx={{ ...styles.buttons }}>
          <Button variant="contained" color="secondary" sx={{ ...styles.clearAll }}>
            {t('common:clear-all')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ ...styles.viewResults }}
            onClick={onFilterByClose}
          >
            {t('view-results')}
          </Button>
        </Box>
        <Box sx={{ ...styles.lowerTotal }}>
          {isLoading && <Skeleton variant="rectangular" height={23} width={74} />}
          {!isLoading && <Box>{t('results', { totalResults })}</Box>}
        </Box>
      </Box>
    </>
  )
}

export default CategoryFilterByMobile
