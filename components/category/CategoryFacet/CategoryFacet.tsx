import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box, Button, FormLabel, Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import type { FacetValue } from '@/lib/gql/types'

interface CategoryFacetChildren {
  label: string
  count: number
  value: string
  filterValue: string
  isDisplayed: boolean
}

interface CategoryFacetData {
  header: string
  childrenCategories: CategoryFacetChildren[]
}

interface CategoryFacetProps {
  initialItemsToShow?: number
  categoryFacet: CategoryFacetData
  onCategoryChildrenSelection: (categoryCode: string) => void
  onBackButtonClick: () => void
}

const styles = {
  linkContainer: {
    display: {
      xs: 'none',
      md: 'block',
    },
    borderBottom: '1px solid #c7c7c7',
  },
  childrenCategories: {
    pl: '0.438rem',
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.5rem 0.5rem 0.5rem 0',
    cursor: 'pointer',
  },
  formLabel: {
    typography: 'body2',
    color: 'grey.900',
    cursor: 'pointer',
  },
  backButton: {
    textDecoration: 'underline',
    color: 'grey.900',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0',
  },
  childrenLink: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  viewMore: {
    textTransform: 'capitalize',
    color: 'grey.900',
    pl: 0,
  },
}

const CategoryFacet = (props: CategoryFacetProps) => {
  const {
    initialItemsToShow = 5,
    categoryFacet,
    onCategoryChildrenSelection,
    onBackButtonClick,
  } = props
  const { t } = useTranslation('common')
  const childrenLength = categoryFacet.childrenCategories.length
  const isViewMoreVisible = childrenLength > initialItemsToShow

  const [isViewMoreButtonVisible, setIsViewMoreButtonVisible] = useState<boolean>(isViewMoreVisible)
  const [filteredValues, setFilteredValues] = useState<FacetValue[]>([])

  const handleCategoryLink = (categoryCode: string) => {
    onCategoryChildrenSelection(categoryCode)
  }

  const handleViewMore = () => {
    setIsViewMoreButtonVisible(!isViewMoreButtonVisible)
  }

  useEffect(() => {
    const noOfItemsToShow = isViewMoreButtonVisible ? initialItemsToShow : childrenLength
    const sliced = categoryFacet.childrenCategories?.slice(0, noOfItemsToShow) || []

    setFilteredValues([...sliced])
  }, [isViewMoreButtonVisible])

  return (
    <Box sx={styles.linkContainer}>
      <Typography variant="subtitle1" sx={{ color: 'grey.900', marginTop: '0.5rem' }}>
        {categoryFacet.header}
      </Typography>
      <Box sx={styles.childrenCategories}>
        {filteredValues.map((child) => (
          <Link
            key={child.value}
            underline="none"
            variant="body2"
            color="text.primary"
            sx={styles.link}
            onClick={() => handleCategoryLink(child.value as string)}
          >
            {child?.label}
            <FormLabel data-testid="count" aria-label={t('count')} sx={{ ...styles.formLabel }}>
              ({child?.count})
            </FormLabel>
          </Link>
        ))}
        {isViewMoreButtonVisible && (
          <Button
            variant="text"
            size="small"
            name="View More"
            aria-label={t('view-more')}
            sx={{ ...styles.viewMore }}
            startIcon={<AddIcon fontSize="small" />}
            onClick={() => handleViewMore()}
          >
            {t('view-more')}
          </Button>
        )}
        <Link
          component="button"
          aria-label={t('back')}
          onClick={onBackButtonClick}
          sx={{ ...styles.backButton }}
        >
          <ChevronLeftIcon />
          {t('back')}
        </Link>
      </Box>
    </Box>
  )
}

export default CategoryFacet
