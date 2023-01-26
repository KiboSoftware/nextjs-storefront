import React, { useEffect, useState } from 'react'

import Add from '@mui/icons-material/Add'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Remove from '@mui/icons-material/Remove'
import { Box, Button, FormLabel, Typography, SxProps, Divider, styled } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { uiHelpers } from '@/lib/helpers'
import type { BreadCrumb as BreadCrumbType } from '@/lib/types'

import type { FacetValue, Maybe } from '@/lib/gql/types'

export interface CategoryFacetData {
  header?: string
  childrenCategories?: FacetValue[]
}
export type CategoryFacetProps = {
  initialItemsToShow?: number
  categoryFacet: CategoryFacetData
  breadcrumbs: BreadCrumbType[]
}

const styles = {
  linkContainer: {
    display: {
      xs: 'none',
      md: 'block',
    },
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
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0',
    cursor: 'pointer',
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

const StyledBackLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  ...styles.backButton,
  color: theme?.palette.text.primary,
  fontSize: theme?.typography.body2.fontSize,
}))

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  ...styles.link,
  color: theme?.palette.text.primary,
  fontSize: theme?.typography.body2.fontSize,
}))

const CategoryFacet = (props: CategoryFacetProps) => {
  const { initialItemsToShow = 5, categoryFacet, breadcrumbs } = props
  const { getCategoryLink } = uiHelpers()
  const { t } = useTranslation('common')

  const viewMore = t('view-more')
  const viewLess = t('view-less')

  const childrenLength = categoryFacet?.childrenCategories?.length || 0
  const isViewMoreVisible = childrenLength > initialItemsToShow

  const [buttonText, setButtonText] = useState<string>(viewMore)
  const [filteredValues, setFilteredValues] = useState<Maybe<FacetValue>[]>([])

  const handleViewMore = () => {
    setButtonText(() => (buttonText === viewMore ? viewLess : viewMore))
  }

  useEffect(() => {
    const noOfItemsToShow = buttonText === viewMore ? initialItemsToShow : childrenLength
    const sliced = categoryFacet.childrenCategories?.slice(0, noOfItemsToShow) || []

    setFilteredValues([...sliced])
  }, [isViewMoreVisible, viewMore, buttonText, categoryFacet])

  return (
    <Box sx={styles.linkContainer}>
      <Typography variant="subtitle1" sx={{ ...styles.header }}>
        {categoryFacet.header}
      </Typography>
      <Box sx={styles.childrenCategories}>
        {filteredValues?.map((child) => (
          <StyledLink key={child?.value} href={getCategoryLink(child?.value as string)} passHref>
            {child?.label}
            <FormLabel data-testid="count" aria-label={t('count')} sx={{ ...styles.formLabel }}>
              ({child?.count})
            </FormLabel>
          </StyledLink>
        ))}
        {isViewMoreVisible && (
          <Button
            variant="text"
            size="small"
            name="View More"
            aria-label={buttonText}
            sx={{ ...styles.viewMore }}
            startIcon={
              buttonText === viewMore ? <Add fontSize="small" /> : <Remove fontSize="small" />
            }
            onClick={() => handleViewMore()}
          >
            {buttonText}
          </Button>
        )}
        {breadcrumbs?.length >= 1 && (
          <StyledBackLink href={breadcrumbs[breadcrumbs?.length - 2]?.link || '/'} passHref>
            <ChevronLeft />
            {t('back')}
          </StyledBackLink>
        )}
      </Box>
      <Divider sx={{ borderColor: 'grey.500' }} />
    </Box>
  )
}

export default CategoryFacet
