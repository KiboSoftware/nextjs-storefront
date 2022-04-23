import React, { useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
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

import { PrCategory } from '@/lib/gql/types'

interface CategoryNestedNavigationProps {
  categoryTree: PrCategory[]
  onCategoryClick: (category: PrCategory) => void
  onCloseMenu: (isOpen: boolean) => void
  children?: React.ReactNode
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

const CategoryNestedNavigation = ({
  categoryTree,
  onCategoryClick,
  onCloseMenu,
  children,
}: CategoryNestedNavigationProps) => {
  const [allCategories] = useState<PrCategory[]>(categoryTree?.filter((item) => item.isDisplayed))

  const [activeCategory, setActiveCategory] = useState<PrCategory[] | undefined>(allCategories)

  const { t } = useTranslation('common')

  const initialSubHeader = {
    backLink: t('back'),
    categoryCode: null,
    label: t('allDepartments'),
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

  const findParent = (
    items: PrCategory[],
    categoryCode?: string | null,
    parent: PrCategory | null = null
  ): PrCategory | null | undefined => {
    /* looping through all the categories to find the provided categoryCode.
      If a match is found and it's the root label, return null else return the immediate parent.
      findParent will be called recursively */
    for (const item of items) {
      const res: PrCategory | null | undefined =
        item.categoryCode === categoryCode
          ? parent
          : item.childrenCategories &&
            findParent(item.childrenCategories as PrCategory[], categoryCode, item)
      if (res || res === null) return res
    }
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
    const previousCategory = findParent(allCategories, subHeader.categoryCode)
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
        <Box display="flex" alignItems="center" p={1}>
          <IconButton size="small" aria-label="back-arrow-button" onClick={handleBackClick}>
            <ArrowBackIosIcon sx={{ ...styles.smallIcon }} />
          </IconButton>
          <ListSubheader component="div" sx={{ flex: 1 }}>
            {subHeader.backLink}
          </ListSubheader>
          <IconButton
            size="small"
            aria-label="close-button"
            sx={{ marginRight: 1 }}
            onClick={() => onCloseMenu(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      }
    >
      {children && (
        <ListItemButton sx={{ backgroundColor: 'grey.300', marginBlock: 1 }}>
          <ListItemText primary={children} />
        </ListItemButton>
      )}
      <ListItem>
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
              <ListItemButton onClick={() => handleCatgeoryClick(category)}>
                <ListItemText primary={category?.content?.name} sx={{ ...styles.listContent }} />
                {category?.childrenCategories?.length ? (
                  <ArrowForwardIcon fontSize="small" />
                ) : null}
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
