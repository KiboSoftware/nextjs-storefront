import React, { ReactNode, useState } from 'react'

import { ArrowBackIos, ArrowForward, Close } from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Slide,
  Theme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { findParentNode } from '@/lib/helpers'

import { PrCategory } from '@/lib/gql/types'

interface CategoryNestedNavigationProps {
  categoryTree: PrCategory[]
  children?: ReactNode
  onCategoryClick: (category: PrCategory) => void
  onCloseMenu: (isOpen: boolean) => void
}

const styles = {
  floatRight: {
    marginLeft: 'auto',
  },
  smallIcon: {
    fontSize: (theme: Theme) => theme.typography.body2,
  },
  listHeader: {
    fontSize: (theme: Theme) => theme.typography.h3,
  },
  listContent: {
    fontSize: (theme: Theme) => theme.typography.subtitle2,
  },
}

const CategoryNestedNavigation = (props: CategoryNestedNavigationProps) => {
  const { categoryTree, children, onCategoryClick, onCloseMenu } = props
  const [allCategories] = useState<PrCategory[]>(categoryTree)

  const [activeCategory, setActiveCategory] = useState<PrCategory[] | undefined>(allCategories)

  const { t } = useTranslation('common')

  const initialSubHeader = {
    backLink: t('back'),
    categoryCode: null,
    label: t('all-departments'),
  }

  const [subHeader, setSubHeader] = useState<{
    label: string
    categoryCode?: string | null
    backLink?: string
  }>(initialSubHeader)

  const reset = () => {
    setActiveCategory(allCategories)
    setSubHeader(initialSubHeader)
  }

  const handleCatgeoryClick = (clickedCategory: PrCategory) => {
    if (clickedCategory.childrenCategories?.length) {
      const selectedCategory: PrCategory = activeCategory?.find(
        (category) => category.categoryCode === clickedCategory.categoryCode
      ) as PrCategory

      setActiveCategory(selectedCategory?.childrenCategories as [])

      setSubHeader({
        backLink: subHeader.label,
        label: selectedCategory?.content?.name as string,
        categoryCode: selectedCategory?.categoryCode,
      })
    } else {
      onCategoryClick(clickedCategory)
    }
  }

  const handleBackClick = () => {
    const previousCategory = findParentNode(allCategories, subHeader.categoryCode)
    if (previousCategory === null) {
      reset()
    } else if (!previousCategory) {
      onCloseMenu(false)
    } else {
      setActiveCategory(previousCategory?.childrenCategories as PrCategory[])
      setSubHeader({
        backLink: subHeader.label,
        label: previousCategory?.content?.name as string,
        categoryCode: previousCategory?.categoryCode,
      })
    }
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper', pb: 0 }}
      aria-labelledby="category-nested-list"
      role="list"
      subheader={
        <Box display="flex" alignItems="center" pl={4} pr={2} py={1}>
          <IconButton size="small" aria-label="back-arrow-button" onClick={handleBackClick}>
            <ArrowBackIos sx={{ ...styles.smallIcon }} />
          </IconButton>
          <ListSubheader component="div" sx={{ flex: 1, paddingX: 1 }}>
            {subHeader.backLink}
          </ListSubheader>
          <IconButton
            size="small"
            aria-label="close-button"
            sx={{ marginRight: 1 }}
            onClick={() => onCloseMenu(false)}
          >
            <Close />
          </IconButton>
        </Box>
      }
    >
      {children && (
        <ListItemButton sx={{ backgroundColor: 'grey.300', marginBlock: 1 }}>
          <ListItemText primary={children} />
        </ListItemButton>
      )}
      <ListItem sx={{ paddingInline: 4 }}>
        <ListItemText primary={subHeader.label} sx={{ ...styles.listHeader }} />
      </ListItem>
      <Divider />
      {activeCategory?.map((category: PrCategory) => {
        return (
          <Slide
            key={category.categoryId}
            direction="right"
            in={Boolean(activeCategory.length)}
            appear={true}
          >
            <Box>
              <ListItemButton
                onClick={() => handleCatgeoryClick(category)}
                sx={{ paddingInline: 4 }}
              >
                <ListItemText primary={category?.content?.name} sx={{ ...styles.listContent }} />
                {category?.childrenCategories?.length ? <ArrowForward fontSize="small" /> : null}
              </ListItemButton>
              <Divider />
            </Box>
          </Slide>
        )
      })}
    </List>
  )
}

export default CategoryNestedNavigation
