import * as React from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Box, List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'

import { categoryTreeDataMock } from '../../../__mocks__/categoryTreeDataMock'
import CategoryNestedNavigation from '../CategoryNestedNavigation'
import HeaderAction from '@/components/common/HeaderAction'

interface HamburgerMenuProps {
  isDrawerOpen: boolean
  marginTop: number | string
  setIsDrawerOpen: (isDrawerOpen: boolean) => void
}

const HamburgerMenu = (props: HamburgerMenuProps) => {
  const { isDrawerOpen, marginTop = 7, setIsDrawerOpen } = props

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setIsDrawerOpen(open)
  }

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      data-testid="hamburger-menu"
    >
      <Box
        sx={{
          width: '80vw',
          marginTop: marginTop,
          position: 'relative',
          height: '-webkit-fill-available',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        role="presentation"
      >
        <Box maxHeight={'60%'} sx={{ overflowY: 'auto', width: '100%', flex: 1 }}>
          <CategoryNestedNavigation
            categoryTree={categoryTreeDataMock.categoriesTree.items}
            onCloseMenu={toggleDrawer}
            onCategoryClick={() => toggleDrawer(false)}
          >
            <Box width="100%">
              <HeaderAction
                title="My Account"
                subtitle="Login"
                icon={AccountCircleIcon}
                mobileIconColor="black"
                iconFontSize="large"
                showTitleInMobile={true}
              />
            </Box>
          </CategoryNestedNavigation>
        </Box>
        <Box height={19} sx={{ backgroundColor: 'grey.300' }}></Box>
        <List sx={{ width: '100%', maxHeight: '40%', overflowY: 'auto' }}>
          {['Order Status', 'Wishlist', 'Nav Link 3', 'Nav Link 4'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default HamburgerMenu
