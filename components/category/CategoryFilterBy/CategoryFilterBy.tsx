import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/material'

import FacetList from '@/components/filter-by/FacetList/FacetList'

import type { Facet as FacetType } from '@/lib/gql/types'

interface CategoryFilterByProps {
  facetList: FacetType[]
  title: string
  onFilterByClick: () => void
}

const styles = {
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
    color: 'grey.600',
  },
}

// Component
const CategoryFilterBy = (props: CategoryFilterByProps) => {
  const { facetList, title, onFilterByClick } = props

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #c7c7c7' }}>
        <Box sx={{ ...styles.filterBy }}>
          <Box>{title}</Box>
          <CloseIcon sx={{ ...styles.closeIcon }} onClick={onFilterByClick} />
        </Box>
      </Box>
      <FacetList facetList={facetList} />
    </>
  )
}

export default CategoryFilterBy
