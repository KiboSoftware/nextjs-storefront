import React from 'react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box, FormLabel, Link, Link as MuiLink, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'

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
}

const styles = {
  linkContainer: {
    pl: 1,
    pb: 0,
  },
  childrenCategories: {
    pl: 2,
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.5rem 0.5rem 0.5rem 0',
  },
  formLabel: {
    typography: 'body2',
    color: `${grey[900]}`,
  },
  backButton: {
    color: `${grey[900]}`,
    display: 'flex',
    alignItems: 'center',
    textDecorationColor: `${grey[900]}`,
  },
  childrenLink: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
}

const CategoryFacet = (props: CategoryFacetProps) => {
  const { t } = useTranslation('category-page')
  const { categoryFacet, onCategoryChildrenSelection, goBackToPreviousRoute } = props

  const handleCategoryLink = (categoryCode: string) => {
    onCategoryChildrenSelection(`/c/${categoryCode}`)
  }

  return (
    <Box sx={styles.linkContainer}>
      <Typography variant="subtitle1" sx={{ color: `${grey[900]}` }}>
        {categoryFacet.header}
      </Typography>
      <Box sx={styles.childrenCategories}>
        {categoryFacet.children.map((child) => {
          return (
            <Link
              key={child.value}
              onClick={() => handleCategoryLink(child.value)}
              sx={{ ...styles.childrenLink }}
            >
              <MuiLink underline="none" variant="body2" color="text.primary" sx={styles.link}>
                {child.label}
                <FormLabel
                  data-testid="count"
                  aria-label="facet-item-label"
                  sx={{ ...styles.formLabel }}
                >
                  ({child.count})
                </FormLabel>
              </MuiLink>
            </Link>
          )
        })}
        <Link component="button" onClick={goBackToPreviousRoute} sx={{ ...styles.backButton }}>
          <ChevronLeftIcon />
          {t('back')}
        </Link>
      </Box>
    </Box>
  )
}

export default CategoryFacet
