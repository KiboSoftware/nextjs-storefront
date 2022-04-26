import { useState, useEffect } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Box, List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'
import Link from 'next/link'

import HeaderAction from '@/components/common/HeaderAction/HeaderAction'
import { CategoryNestedNavigation } from '@/components/layout'

import { PrCategory } from '@/lib/gql/types'

interface NavLinkProps {
  text: string
  link: string
}
interface HamburgerMenuProps {
  categoryTree: PrCategory[]
  isDrawerOpen: boolean
  navLinks?: NavLinkProps[]
  marginTop?: number | string
  setIsDrawerOpen: (isDrawerOpen: boolean) => void
}

const HamburgerMenu = (props: HamburgerMenuProps) => {
  const { categoryTree, isDrawerOpen, marginTop = 7, setIsDrawerOpen, navLinks } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open)
    setIsDrawerOpen(open)
  }

  useEffect(() => {
    setIsOpen(isDrawerOpen)
  }, [isDrawerOpen])

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
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
        <Box maxHeight={'60%'} sx={{ overflowY: 'auto', width: '100%', flex: 1, pt: 2 }}>
          <CategoryNestedNavigation
            categoryTree={categoryTree}
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
          {navLinks?.map((nav) => (
            <Link key={nav.text} href={nav.link} passHref>
              <ListItem button>
                <ListItemText primary={nav.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default HamburgerMenu
