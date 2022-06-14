import { useState, useEffect } from 'react'

import { AccountCircle } from '@mui/icons-material'
import { Box, Divider, List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('common')

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
                title={t('my-account')}
                subtitle={t('log-in')}
                icon={AccountCircle}
                mobileIconColor="black"
                iconFontSize="large"
                showTitleInMobile={true}
              />
            </Box>
          </CategoryNestedNavigation>
        </Box>
        <Box height={19} sx={{ backgroundColor: 'grey.300' }}></Box>
        <List sx={{ width: '100%', maxHeight: '40%', overflowY: 'auto', pt: 0 }}>
          {navLinks?.map((nav) => (
            <Box key={nav.text}>
              <Link href={nav.link} passHref>
                <ListItem button sx={{ paddingInline: 4 }}>
                  <ListItemText primary={nav.text} />
                </ListItem>
              </Link>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default HamburgerMenu
