import AccountCircle from '@mui/icons-material/AccountCircle'
import { Box, SwipeableDrawer } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { CategoryNestedNavigation } from '@/components/layout'
import { MyAccountTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import type { NavigationLink } from '@/lib/types'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface HamburgerMenuProps {
  categoryTree: Maybe<PrCategory>[]
  isDrawerOpen?: boolean
  navLinks?: NavigationLink[]
  marginTop?: number | string
  setIsDrawerOpen: (isDrawerOpen: boolean) => void
  onAccountIconClick: () => void
}

const styles = {
  container: {
    width: '100vw',
    position: 'relative',
    height: '-webkit-fill-available',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  menuList: {
    overflowY: 'auto',
    width: '100%',
  },
  spacer: {
    backgroundColor: 'grey.300',
    height: 19,
  },
  navLinksList: {
    width: '100%',
    // maxHeight: '40%',
    // overflowY: 'auto',
    pt: 0,
  },
}

const HamburgerMenu = (props: HamburgerMenuProps) => {
  const {
    categoryTree,
    isDrawerOpen,
    marginTop = 7,
    setIsDrawerOpen,
    navLinks,
    onAccountIconClick,
  } = props
  const { t } = useTranslation('common')
  const { isAuthenticated, user } = useAuthContext()
  const router = useRouter()

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open)
  }

  const handleCategoryClick = (categoryCode: string) => {
    toggleDrawer(false)
    router.push('/category/' + categoryCode)
  }

  const handleNavLinks = (link: string) => {
    toggleDrawer(false)
    router.push(link)
  }

  return (
    <>
      <SwipeableDrawer
        anchor={'left'}
        open={isDrawerOpen || false}
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
                  title={isAuthenticated ? `${t('hi')}, ${user?.firstName}` : t('my-account')}
                  subtitle={isAuthenticated ? t('go-to-my-account') : t('log-in')}
                  icon={AccountCircle}
                  mobileIconColor="black"
                  iconFontSize="large"
                  showTitleInMobile={true}
                  onClick={onAccountIconClick}
                />
              </Box>
            </CategoryNestedNavigation>
          </Box>

          <MyAccountTemplate />
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default HamburgerMenu
