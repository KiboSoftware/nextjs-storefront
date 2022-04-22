import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box, Button, FormLabel, Link, Link as MuiLink, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import type { FacetValue, Maybe } from '@/lib/gql/types'

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
  categoryFacet: CategoryFacetData
  onCategoryChildrenSelection: (option: string) => void
  goBackToPreviousRoute: () => void
  handleViewMoreClick: () => void
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
    color: '#2b2b2b',
    pl: 0,
  },
}

const CategoryFacet = (props: CategoryFacetProps) => {
  const { t } = useTranslation('category-page')
  const { categoryFacet, onCategoryChildrenSelection, goBackToPreviousRoute, handleViewMoreClick } =
    props
  const initialItemsToShow = 5
  const valuesLength = categoryFacet.children.length
  const isVisible = valuesLength > initialItemsToShow

  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(isVisible)
  const [filteredValues, setFilteredValues] = useState<Maybe<FacetValue>[]>([])

  const handleCategoryLink = (categoryCode?: Maybe<string>) => {
    onCategoryChildrenSelection(`/c/${categoryCode}`)
  }

  const handleViewMore = () => {
    setIsButtonVisible(!isButtonVisible)
    handleViewMoreClick()
  }

  useEffect(() => {
    const noOfItemsToShow = isButtonVisible ? initialItemsToShow : valuesLength
    const filtered = categoryFacet.children
    const sliced = filtered?.slice(0, noOfItemsToShow) || []

    setFilteredValues([...sliced])
  }, [isButtonVisible])

  return (
    <Box sx={styles.linkContainer}>
      <Typography variant="subtitle1" sx={{ color: 'grey.900' }}>
        {categoryFacet.header}
      </Typography>
      <Box sx={styles.childrenCategories}>
        {filteredValues.map((child) => {
          return (
            <Link
              key={child?.value}
              onClick={() => handleCategoryLink(child?.value)}
              sx={{ ...styles.childrenLink }}
            >
              <MuiLink underline="none" variant="body2" color="text.primary" sx={styles.link}>
                {child?.label}
                <FormLabel
                  data-testid="count"
                  aria-label="facet-item-label"
                  sx={{ ...styles.formLabel }}
                >
                  ({child?.count})
                </FormLabel>
              </MuiLink>
            </Link>
          )
        })}
        {isButtonVisible && (
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
        <Link component="button" onClick={goBackToPreviousRoute} sx={{ ...styles.backButton }}>
          <ChevronLeftIcon />
          {t('back')}
        </Link>
      </Box>
    </Box>
  )
}

export default CategoryFacet
