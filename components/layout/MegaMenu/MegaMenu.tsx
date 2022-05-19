import React, { useState, useEffect } from 'react'

import { Box, Divider, ListItem, ListItemText, Typography, Toolbar, styled } from '@mui/material'
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { useTranslation } from 'next-i18next'

import MegaMenuItem from '../MegaMenuItem/MegaMenuItem'
import KiboImage from '@/components/common/KiboImage/KiboImage'
import DefaultImage from '@/public/product_placeholder.svg'

import { PrCategory } from '@/lib/gql/types'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '&.MuiToolbar-root': {
    backgroundColor: theme.palette.common.white,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 59,
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[300],
    paddingInline: 2,
    flexWrap: 'wrap',
    gap: 3,
  },
}))

const style = {
  listItem: {
    paddingInline: 1,
    paddingTop: 2.25,
    paddingBottom: 1.25,
    cursor: 'pointer',
    borderBottom: '4px solid transparent',
    '&.Mui-selected': {
      borderBottom: '4px solid',
      borderBottomColor: 'primary.main',
      background: 'transparent',
    },
  },
  popoverPaper: {
    width: '92.5%',
    minHeight: 100,
    marginTop: 1.1,
    paddingInline: 3,
    borderRadius: 0,
    boxShadow: 'none',
    borderTop: '1px solid',
    borderTopColor: 'grey.300',
  },
}
interface MegaMenuProps {
  categoryTree: PrCategory[]
  setIsBackdropOpen: (isOpen: boolean) => void
}

interface MegaMenuCategoryProps {
  category: PrCategory
  setIsBackdropOpen: (isOpen: boolean) => void
  activeCategory: string
  setActiveCategory: (activeCategory: string) => void
}

const MegaMenuCategory = (props: MegaMenuCategoryProps) => {
  const { category, setIsBackdropOpen, activeCategory, setActiveCategory } = props
  const childrenCategories = category.childrenCategories as PrCategory[]

  const { t } = useTranslation('common')

  const popupState = usePopupState({
    variant: 'popover',
    popupId: category.content?.name,
  })

  useEffect(() => {
    childrenCategories.length && setIsBackdropOpen(popupState.isOpen)
  }, [childrenCategories.length, popupState.isOpen, setIsBackdropOpen])

  return (
    <>
      <Box {...bindHover(popupState)} role="group" color="grey.900">
        <ListItem
          id="menuCategory"
          sx={{ ...style.listItem }}
          onMouseOver={() => setActiveCategory(category.content?.name || '')}
          selected={popupState.isOpen && category.content?.name === activeCategory}
        >
          <ListItemText primary={category.content?.name} />
        </ListItem>
        {childrenCategories.length ? (
          <HoverPopover
            {...bindPopover(popupState)}
            PaperProps={{ sx: { ...style.popoverPaper } }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box display="flex">
              <Box display="flex" flex={3} flexWrap={'wrap'}>
                {childrenCategories?.map((cat) => {
                  return (
                    <MegaMenuItem
                      key={cat?.categoryCode}
                      title={cat?.content?.name as string}
                      categoryChildren={cat?.childrenCategories as PrCategory[]}
                      categoryCode={cat?.categoryCode as string}
                    />
                  )
                })}
              </Box>
              <Divider orientation="vertical" sx={{ minHeight: '20rem', height: '20rem' }} />
              <Box flex={1} px={4}>
                <Box width={'100%'}>
                  <Typography variant="subtitle2" pt={2} fontWeight="bold">
                    {t('advertisment')}
                  </Typography>
                  <KiboImage
                    src={DefaultImage}
                    alt={t('advertisment')}
                    width={'100%'}
                    height={'100%'}
                  />
                </Box>
              </Box>
            </Box>
          </HoverPopover>
        ) : null}
      </Box>
    </>
  )
}

const MegaMenu = (props: MegaMenuProps) => {
  const { categoryTree, setIsBackdropOpen } = props
  const [allCategories] = useState<PrCategory[]>(categoryTree?.filter((item) => item.isDisplayed))

  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    document.getElementById('menuCategory')
  }, [activeCategory])

  return (
    <>
      <StyledToolbar data-testid="megamenu-container">
        {allCategories?.map((category) => (
          <MegaMenuCategory
            key={category.categoryCode}
            category={category}
            setIsBackdropOpen={setIsBackdropOpen}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </StyledToolbar>
    </>
  )
}
export default MegaMenu
