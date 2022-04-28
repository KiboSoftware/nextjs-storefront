import React, { useState } from 'react'

import {
  Backdrop,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'

import KiboImage from '@/components/common/KiboImage/KiboImage'
import DefaultImage from '@/public/product_placeholder.svg'

import { PrCategory } from '@/lib/gql/types'

interface MegaMenuProps {
  categoryTree: PrCategory[]
  onPopupOpen: (isOpen: boolean) => void
}

interface MenuItemProps {
  category: PrCategory
  onPopupOpen: (isOpen: boolean) => void
}

const MegaMenu = (props: MegaMenuProps) => {
  const { categoryTree } = props
  const [allCategories] = useState<PrCategory[]>(categoryTree?.filter((item) => item.isDisplayed))

  const [open, setOpen] = useState<boolean>(false)
  const handlePopupOpen = (isOpen: boolean) => isOpen && setOpen(isOpen)
  const handlePopupClose = () => setOpen(false)

  return (
    <>
      <Box
        display={'flex'}
        gap={3}
        height="100%"
        sx={{
          height: 59,
          // display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: 'grey.300',
          paddingInline: 2,
          background: 'white',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1500,
        }}
      >
        {allCategories?.map((category) => (
          <MegaMenuItem
            key={category.categoryCode}
            category={category}
            onPopupOpen={handlePopupOpen}
          />
        ))}
      </Box>
      <Backdrop open={open} onClick={handlePopupClose} data-testid="backdrop"></Backdrop>
    </>
  )
}
export default MegaMenu

export const MegaMenuItem = (props: MenuItemProps) => {
  const { category, onPopupOpen } = props
  const childrenCategories = category.childrenCategories as PrCategory[]
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'megaMenu',
  })

  if (popupState.isOpen) {
    onPopupOpen(popupState.isOpen)
  }
  return (
    <>
      <Box {...bindHover(popupState)} role="group">
        <ListItem id="menuItem" sx={{ paddingInline: 1, cursor: 'pointer' }}>
          <ListItemText primary={category.content?.name} />
        </ListItem>
        {childrenCategories.length ? (
          <HoverPopover
            {...bindPopover(popupState)}
            PaperProps={{
              sx: {
                width: '90%',
                minHeight: 100,
                marginTop: 1,
                paddingInline: 3,
                borderRadius: 0,
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
              <Divider orientation="vertical" />
              <Box flex={1}>
                <Box width={'100%'}>
                  <Typography variant="subtitle2" pt={2} fontWeight="bold">
                    Advertisment
                  </Typography>
                  <KiboImage
                    src={DefaultImage}
                    alt={'Advertisment'}
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
          <ListItemText primary={'Shop All'} primaryTypographyProps={{ variant: 'subtitle2' }} />
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
