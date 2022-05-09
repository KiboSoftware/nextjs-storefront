import React from 'react'

import { Box, Button, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import CategoryFilterBy from '../CategoryFilterBy/CategoryFilterBy'

import type { Facet as FacetType } from '@/lib/gql/types'

interface CategoryFilterByMobileProps {
  facetList: FacetType[]
  header: string
  totalResults: string
  isLoading?: boolean
  onFilterByClick: () => void
}

const styles = {
  navBarMainMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 1rem 1rem',
  },
  filterBy: {
    padding: { xs: '0 1rem', md: '0' },
    margin: '12px 0',
    typography: 'body2',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    display: { xs: 'flex' },
    justifyContent: { xs: 'space-between' },
    alignItems: { xs: 'center' },
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
    backgroundColor: 'grey.50',
    border: '1px solid #cdcdcd',
    color: 'grey.900',
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
    color: 'grey.900',
    fontWeight: 'bold',
  },
}

// Component
const CategoryFilterByMobile = (props: CategoryFilterByMobileProps) => {
  const { facetList, totalResults, header, onFilterByClick, isLoading } = props

  const { t } = useTranslation('common')

  return (
    <>
      <Box sx={{ display: { md: 'none' } }}>
        {!isLoading && (
          <Box sx={{ ...styles.navBarMainMobile }}>
            <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
              {header}
            </Typography>
            <Box sx={{ ...styles.upperTotal }}>
              {totalResults}
              {t('results')}
            </Box>
          </Box>
        )}
        {isLoading && (
          <Box sx={{ ...styles.navBarMainMobile }}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: { md: '1.75rem', xs: '1.5rem' },
                width: { md: '15.625rem', xs: '10.75rem' },
              }}
            />
            <Skeleton variant="rectangular" height={23} width={74} />
          </Box>
        )}
        <CategoryFilterBy
          facetList={facetList}
          title="Filter By"
          onFilterByClick={onFilterByClick}
        />
        <Box sx={{ ...styles.buttons }}>
          <Button variant="contained" sx={{ ...styles.clearAll }}>
            {t('clear-all')}
          </Button>
          <Button variant="contained" sx={{ ...styles.viewResults }} onClick={onFilterByClick}>
            {t('view-results')}
          </Button>
        </Box>
        <Box sx={{ ...styles.lowerTotal }}>
          {isLoading && <Skeleton variant="rectangular" height={23} width={74} />}
          {!isLoading && (
            <Box>
              {totalResults}
              {t('results')}
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default CategoryFilterByMobile
