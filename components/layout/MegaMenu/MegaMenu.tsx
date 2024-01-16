import React, { useState, useEffect } from 'react'

import { ExpandMore } from '@mui/icons-material'
import {
  Box,
  Divider,
  ListItem,
  Typography,
  Toolbar,
  styled,
  Container,
  Theme,
} from '@mui/material'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { KiboImage } from '@/components/common'
import { MegaMenuItem } from '@/components/layout'
import { uiHelpers } from '@/lib/helpers'
import DefaultImage from '@/public/product_placeholder.svg'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface MegaMenuProps {
  categoryTree: Maybe<PrCategory>[]
  onBackdropToggle: (isOpen: boolean) => void
}

interface MegaMenuCategoryProps {
  category: Maybe<PrCategory>
  activeCategory: string
  onBackdropToggle: (isOpen: boolean) => void
  setActiveCategory: (activeCategory: string) => void
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '&.MuiToolbar-root': {
    backgroundColor: 'inherit',
    position: 'relative',
    minHeight: 50,
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[300],
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.grey[300],
    paddingInline: 0,
    whiteSpace: 'nowrap',
    flex: 1,
    color: 'black',
    maxWidth: '100%',
  },
}))

const style = {
  listItem: {
    cursor: 'pointer',
    borderTop: '1px solid transparent',
    pt: 1.5,
    pb: 1.5,
    '&.Mui-selected': {
      transitionDuration: '.4s',
      borderTop: '1px solid',
      borderTopColor: 'info.main',
      borderTopColorOpacity: 0.5,
      background: 'transparent',
      '& .MuiTypography-root': {
        textShadow: '0.7px 0px',
      },
    },
  },
  popoverPaper: {
    width: '96.5vw',
    height: '25rem',
    borderRadius: 0,
    boxShadow: 'none',
    borderTop: '1px solid',
    borderTopColor: 'grey.300',
    position: 'relative',
    overflowY: 'scroll',
    marginTop: 0.5,
  },
}

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: theme?.palette.text.primary,
  fontSize: '13px',
  fontWeight: 800,
}))

const MegaMenuCategory = (props: MegaMenuCategoryProps) => {
  const { category, activeCategory, onBackdropToggle, setActiveCategory } = props
  const childrenCategories = category?.childrenCategories as PrCategory[]

  const { t } = useTranslation('common')

  const { getCategoryLink } = uiHelpers()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: category?.content?.name,
  })

  const closeBackDrop = () => {
    popupState.close()
  }

  useEffect(() => {
    childrenCategories?.length && onBackdropToggle(popupState.isOpen)
  }, [childrenCategories?.length, popupState.isOpen, onBackdropToggle])

  return (
    <Box {...bindHover(popupState)} role="group" color="text.primary">
      <ListItem
        sx={{ ...style.listItem }}
        onMouseOver={() => setActiveCategory(category?.categoryCode || '')}
        selected={popupState.isOpen && category?.categoryCode === activeCategory}
      >
        <StyledLink
          href={getCategoryLink(
            category?.categoryCode as string,
            category?.content?.slug as string
          )}
          passHref
          onClick={closeBackDrop}
        >
          <Box display={'flex'} alignItems={'center'} gap={0.5}>
            {category?.content?.name}
            {childrenCategories.length > 0 && <ExpandMore fontSize="small" color="disabled" />}
          </Box>
        </StyledLink>
      </ListItem>
      {childrenCategories?.length > 0 && (
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
          <Box display="flex" py={2} aria-label="megamenu-back-drop">
            <Box display="flex" flex={3} flexWrap={'wrap'}>
              {childrenCategories?.map((cat) => {
                return (
                  <MegaMenuItem
                    key={cat?.categoryCode}
                    title={cat?.content?.name as string}
                    categoryChildren={cat?.childrenCategories as PrCategory[]}
                    categoryCode={cat?.categoryCode as string}
                    seoFriendlyUrl={cat?.content?.slug as string}
                    onBackDropClose={closeBackDrop}
                  />
                )
              })}
            </Box>
            <Divider orientation="vertical" sx={{ minHeight: '20rem', height: '20rem' }} />
            <Box flex={1} px={4}>
              <Box width={'100%'}>
                <Typography variant="subtitle2" pt={0.5} fontWeight="bold">
                  {t('advertisement')}
                </Typography>
                <KiboImage
                  src={DefaultImage}
                  alt={t('advertisement')}
                  width={'100'}
                  height={'100'}
                />
              </Box>
            </Box>
          </Box>
        </HoverPopover>
      )}
    </Box>
  )
}

const MegaMenu = (props: MegaMenuProps) => {
  const { categoryTree = [], onBackdropToggle } = props

  const [activeCategory, setActiveCategory] = useState<string>('')

  return (
    <StyledToolbar data-testid="megamenu-container">
      <Container maxWidth="xl">
        <Tabs
          value={false}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { display: 'none' },
            },
          }}
        >
          {categoryTree?.map((category) => (
            <MegaMenuCategory
              key={category?.categoryCode}
              category={category}
              onBackdropToggle={onBackdropToggle}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </Tabs>
      </Container>
    </StyledToolbar>
  )
}
export default MegaMenu
