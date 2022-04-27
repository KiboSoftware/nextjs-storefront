import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box, Button, FormLabel, Link, Link as MuiLink, Typography } from '@mui/material'
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
  children: CategoryFacetChildren[]
}

interface CategoryFacetProps {
  initialItemsToShow: number
  categoryFacet: CategoryFacetData
  onCategoryChildrenSelection: (categoryCode: string | undefined | null) => void
  onBackButtonClick: () => void
}

const styles = {
  linkContainer: {
    pl: 1,
    pb: 0,
    display: {
      xs: 'none',
      md: 'block',
    },
  },
  childrenCategories: {
    pl: '0.438rem',
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.5rem 0.5rem 0.5rem 0',
  },
  formLabel: {
    typography: 'body2',
    color: 'grey.900',
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
  const { t } = useTranslation('common')
  const {
    initialItemsToShow = 5,
    categoryFacet,
    onCategoryChildrenSelection,
    onBackButtonClick,
  } = props
  const childrenLength = categoryFacet.children.length
  const isViewMoreVisible = childrenLength > initialItemsToShow

  const [isViewMoreButtonVisible, setIsViewMoreButtonVisible] = useState<boolean>(isViewMoreVisible)
  const [filteredValues, setFilteredValues] = useState<FacetValue[]>([])

  const handleCategoryLink = (categoryCode: string | undefined | null) => {
    onCategoryChildrenSelection(categoryCode)
  }

  const handleViewMore = () => {
    setIsViewMoreButtonVisible(!isViewMoreButtonVisible)
  }

  useEffect(() => {
    const noOfItemsToShow = isViewMoreButtonVisible ? initialItemsToShow : childrenLength
    const sliced = categoryFacet.children?.slice(0, noOfItemsToShow) || []

    setFilteredValues([...sliced])
  }, [isViewMoreButtonVisible])

  return (
    <Box sx={styles.linkContainer}>
      <Typography variant="subtitle1" sx={{ color: 'grey.900' }}>
        {categoryFacet.header}
      </Typography>
      <Box sx={styles.childrenCategories}>
        {filteredValues.map((child) => (
          <Link
            key={child.value}
            onClick={() => handleCategoryLink(child.value)}
            sx={{ ...styles.childrenLink }}
          >
            <MuiLink underline="none" variant="body2" color="text.primary" sx={styles.link}>
              {child?.label}
              <FormLabel data-testid="count" aria-label={t('count')} sx={{ ...styles.formLabel }}>
                ({child?.count})
              </FormLabel>
            </MuiLink>
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
