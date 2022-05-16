import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Button, FormLabel, Link, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
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
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'grey.500',
  } as SxProps<Theme> | undefined,
  header: {
    color: 'text.primary',
    marginTop: '0.5rem',
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
    color: 'text.primary',
    cursor: 'pointer',
  },
  backButton: {
    textDecoration: 'underline',
    color: 'text.primary',
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
    color: 'text.primary',
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
  const { t } = useTranslation(['category-page', 'common'])
  const viewMore = t('common:view-more')
  const viewLess = t('common:view-less')

  const childrenLength = categoryFacet.childrenCategories.length
  const isViewMoreVisible = childrenLength > initialItemsToShow

  const [isViewMoreButtonVisible, setIsViewMoreButtonVisible] = useState<boolean>(isViewMoreVisible)
  const [buttonText, setButtonText] = useState<string>(viewMore)
  const [filteredValues, setFilteredValues] = useState<FacetValue[]>([])

  const handleCategoryLink = (categoryCode: string) => {
    onCategoryChildrenSelection(categoryCode)
  }

  const handleViewMore = () => {
    // setIsViewMoreButtonVisible(!isViewMoreButtonVisible)
    setButtonText(() => (buttonText === viewMore ? viewLess : viewMore))
  }

  useEffect(() => {
    const noOfItemsToShow = buttonText === viewMore ? initialItemsToShow : childrenLength
    const sliced = categoryFacet.childrenCategories?.slice(0, noOfItemsToShow) || []

    setFilteredValues([...sliced])
  }, [isViewMoreButtonVisible, viewMore, buttonText])

  return (
    <Box sx={styles.linkContainer}>
      <Typography variant="subtitle1" sx={{ ...styles.header }}>
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
            aria-label={buttonText}
            sx={{ ...styles.viewMore }}
            startIcon={
              buttonText === viewMore ? (
                <AddIcon fontSize="small" />
              ) : (
                <RemoveIcon fontSize="small" />
              )
            }
            onClick={() => handleViewMore()}
          >
            {buttonText}
          </Button>
        )}
        <Link
          component="button"
          aria-label={t('back')}
          onClick={onBackButtonClick}
          sx={{ ...styles.backButton }}
        >
          <ChevronLeftIcon />
          {t('common:back')}
        </Link>
      </Box>
    </Box>
  )
}

export default CategoryFacet
