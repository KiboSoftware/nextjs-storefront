import { AccountCircle } from '@mui/icons-material'
import { Box, Divider, List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import HeaderAction from '@/components/common/HeaderAction/HeaderAction'
import { CategoryNestedNavigation } from '@/components/layout'
import type { NavigationLink } from '@/lib/types'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface HamburgerMenuProps {
  categoryTree: Maybe<PrCategory>[]
  isDrawerOpen: boolean
  navLinks?: NavigationLink[]
  marginTop?: number | string
  setIsDrawerOpen: (isDrawerOpen: boolean) => void
}

const styles = {
  container: {
    width: '80vw',
    position: 'relative',
    height: '-webkit-fill-available',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '60%',
  },
  menuList: {
    overflowY: 'auto',
    width: '100%',
    flex: 1,
    pt: 2,
  },
  spacer: {
    backgroundColor: 'grey.300',
    height: 19,
  },
  navLinksList: {
    width: '100%',
    maxHeight: '40%',
    overflowY: 'auto',
    pt: 0,
  },
}

const HamburgerMenu = (props: HamburgerMenuProps) => {
  const { categoryTree, isDrawerOpen, marginTop = 7, setIsDrawerOpen, navLinks } = props
  const { t } = useTranslation('common')
  const router = useRouter()

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open)
  }

  const handleCategoryClick = (categoryCode: string) => {
    toggleDrawer(false)
    router.push('/product/' + categoryCode)
  }

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      data-testid="hamburger-menu"
    >
      <Box sx={{ ...styles.container, marginTop: marginTop }} role="presentation">
        <Box sx={{ ...styles.menuList }}>
          <CategoryNestedNavigation
            categoryTree={categoryTree}
            onCloseMenu={toggleDrawer}
            onCategoryClick={handleCategoryClick}
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
        <Box sx={{ ...styles.spacer }}></Box>
        <List sx={{ ...styles.navLinksList }}>
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
