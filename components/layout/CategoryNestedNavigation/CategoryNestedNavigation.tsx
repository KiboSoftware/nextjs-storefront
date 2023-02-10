import React, { ReactNode, useEffect, useState } from 'react'

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
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { findParentNode } from '@/lib/helpers'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface CategoryNestedNavigationProps {
  categoryTree: Maybe<PrCategory>[]
  children?: ReactNode
  onCategoryClick: (categoryCode: string) => void
  onCloseMenu: (isOpen: boolean) => void
}

const styles = {
  floatRight: {
    marginLeft: 'auto',
  },
  smallIcon: {
    fontSize: (theme: Theme) => theme.typography.body2,
  },
  listHeader: { paddingLeft: 4, paddingRight: 4, paddingTop: 1.5, paddingBottom: 1.5 },
  listContent: {
    fontSize: (theme: Theme) => theme.typography.subtitle2,
  },
}

const CategoryNestedNavigation = (props: CategoryNestedNavigationProps) => {
  const { categoryTree, children, onCategoryClick, onCloseMenu } = props
  const { t } = useTranslation('common')
  const initialSubHeader = {
    backLink: t('back'),
    categoryCode: '',
    label: t('all-departments'),
  }

  const [subHeader, setSubHeader] = useState<typeof initialSubHeader>(initialSubHeader)
  const [activeCategory, setActiveCategory] = useState<Maybe<PrCategory>[]>(categoryTree)

  const reset = () => {
    setActiveCategory(categoryTree)
    setSubHeader(initialSubHeader)
  }

  const handleCategoryClick = (clickedCategory: Maybe<PrCategory>) => {
    if (clickedCategory?.childrenCategories?.length) {
      const selectedCategory: Maybe<PrCategory> = activeCategory?.find(
        (category) => category?.categoryCode === clickedCategory?.categoryCode
      ) as Maybe<PrCategory>

      setActiveCategory(selectedCategory?.childrenCategories as [])

      setSubHeader({
        backLink: subHeader.label,
        label: selectedCategory?.content?.name as string,
        categoryCode: selectedCategory?.categoryCode as string,
      })
    } else {
      onCategoryClick(clickedCategory?.categoryCode || '')
    }
  }

  const handleBackClick = () => {
    const previousCategory: Maybe<PrCategory | undefined | null> = findParentNode(
      categoryTree,
      subHeader.categoryCode
    )

    if (previousCategory === null) reset()
    if (previousCategory === undefined) onCloseMenu(false)
    if (previousCategory) {
      setActiveCategory(previousCategory?.childrenCategories as PrCategory[])
      const parentCategory: Maybe<PrCategory | undefined | null> = findParentNode(
        categoryTree,
        previousCategory?.categoryCode
      )

      setSubHeader({
        backLink: parentCategory ? (parentCategory?.content?.name as string) : t('all-departments'),
        label: previousCategory?.content?.name as string,
        categoryCode: previousCategory?.categoryCode as string,
      })
    }
  }

  useEffect(() => {
    if (categoryTree) setActiveCategory(categoryTree)
  }, [categoryTree])

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper', pb: 0 }}
      aria-labelledby="category-nested-list"
      role="list"
      subheader={
        <Box display="flex" alignItems="center" pl={3} pr={2} pt={'4px'}>
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
      {children && subHeader.label === initialSubHeader.label && (
        <ListItemButton sx={{ backgroundColor: 'grey.300', paddingBlock: '4px' }}>
          <ListItemText primary={children} />
        </ListItemButton>
      )}
      <ListItem sx={styles.listHeader}>
        <ListItemText primary={<Typography variant="h2">{subHeader.label}</Typography>} />
      </ListItem>
      <Divider />
      {activeCategory?.map((category: Maybe<PrCategory>) => {
        return (
          <Slide
            key={category?.categoryId}
            direction="right"
            in={Boolean(activeCategory.length)}
            appear={true}
          >
            <Box>
              <ListItemButton sx={{ paddingInline: 4 }}>
                <ListItemText
                  primary={category?.content?.name}
                  sx={{ ...styles.listContent }}
                  onClick={() => onCategoryClick(category?.categoryCode || '')}
                />
                {category?.childrenCategories?.length ? (
                  <ArrowForward fontSize="small" onClick={() => handleCategoryClick(category)} />
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
