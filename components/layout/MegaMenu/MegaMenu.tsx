import React, { useState, useEffect } from 'react'

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Toolbar,
} from '@mui/material'
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { useTranslation } from 'next-i18next'

import KiboImage from '@/components/common/KiboImage/KiboImage'
import DefaultImage from '@/public/product_placeholder.svg'

import { PrCategory } from '@/lib/gql/types'

const style = {
  listItem: {
    paddingInline: 1,
    paddingTop: 2.25,
    paddingBottom: 1.25,
    cursor: 'pointer',
    borderBottom: '4px solid transparent',
    '&:hover': {
      borderBottom: '4px solid',
      borderBottomColor: 'primary.main',
    },
  },
}
interface MegaMenuProps {
  categoryTree: PrCategory[]
  setIsBackdropOpen: (isOpen: boolean) => void
}

interface MenuItemProps {
  category: PrCategory
  setIsBackdropOpen: (isOpen: boolean) => void
}

const MegaMenu = (props: MegaMenuProps) => {
  const { categoryTree, setIsBackdropOpen } = props
  const [allCategories] = useState<PrCategory[]>(categoryTree?.filter((item) => item.isDisplayed))

  return (
    <>
      <Toolbar
        sx={{
          backgroundColor: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 59,
          display: 'flex',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: 'grey.300',
          paddingInline: 2,
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {allCategories?.map((category) => (
          <MegaMenuItem
            key={category.categoryCode}
            category={category}
            setIsBackdropOpen={setIsBackdropOpen}
          />
        ))}
      </Toolbar>
    </>
  )
}
export default MegaMenu

export const MegaMenuItem = (props: MenuItemProps) => {
  const { category, setIsBackdropOpen } = props
  const childrenCategories = category.childrenCategories as PrCategory[]

  const { t } = useTranslation('common')

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'megaMenu',
  })

  useEffect(() => {
    childrenCategories.length && setIsBackdropOpen(popupState.isOpen)
  }, [childrenCategories.length, popupState.isOpen, setIsBackdropOpen])

  return (
    <>
      <Box {...bindHover(popupState)} role="group" color="grey.900">
        <ListItem id="menuItem" sx={{ ...style.listItem }}>
          <ListItemText primary={category.content?.name} />
        </ListItem>
        {childrenCategories.length ? (
          <HoverPopover
            {...bindPopover(popupState)}
            PaperProps={{
              sx: {
                width: '92.5%',
                minHeight: 100,
                marginTop: 1.1,
                paddingInline: 3,
                borderRadius: 0,
                boxShadow: 'none',
                borderTop: '1px solid',
                borderTopColor: 'grey.300',
              },
            }}
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
                    <MegaMenuChildren
                      key={cat?.categoryCode}
                      title={cat?.content?.name as string}
                      categoryChildren={cat?.childrenCategories as PrCategory[]}
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
export const MegaMenuChildren = ({
  title,
  categoryChildren,
}: {
  title: string
  categoryChildren: PrCategory[]
}) => {
  const { t } = useTranslation('common')

  return (
    <Stack alignItems={'flex-start'}>
      <List dense>
        <ListItem>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
          />
        </ListItem>
        <ListItem sx={{ cursor: 'pointer' }}>
          <ListItemText primary={t('shop-all')} primaryTypographyProps={{ variant: 'subtitle2' }} />
        </ListItem>
        {categoryChildren?.map((cat) => (
          <ListItem key={cat.categoryId} sx={{ cursor: 'pointer' }}>
            <ListItemText
              primary={cat?.content?.name}
              primaryTypographyProps={{ variant: 'subtitle2' }}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
