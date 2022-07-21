import React, { useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  Typography,
  Toolbar,
  Link,
  Grid,
  Collapse,
  Box,
  AppBar,
  useMediaQuery,
  useTheme,
  Backdrop,
  Container,
} from '@mui/material'
import { styled, SxProps, Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import LoginDialog from '../Login'
import { HeaderAction, KiboLogo } from '@/components/common'
import { MyStoreDialog, StoreLocatorDialog } from '@/components/dialogs'
import { MegaMenu, HamburgerMenu, SearchSuggestions } from '@/components/layout'
import { useAuthContext, useModalContext } from '@/context'
import { useCartQueries, useCategoryTree, usePurchaseLocation } from '@/hooks'
import { setPurchaseLocationCookie } from '@/lib/helpers'
import type { LocationCustom, NavigationLink } from '@/lib/types'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface KiboHeaderProps {
  navLinks: NavigationLink[]
  categoriesTree: Maybe<PrCategory>[]
  sticky?: boolean
}
interface HeaderState {
  viewHamburgerMenu: boolean
  viewSearchPortal: boolean
}
interface HeaderActionsProps {
  headerState: HeaderState
  isMobileViewport: boolean
  setHeaderState: (val: HeaderState) => void
}

const StyledToolbarNav = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 50,
}))

const StyledToolbar = styled(Toolbar)(() => ({
  alignItems: 'center',
  display: 'flex',
  backgroundColor: 'grey.300',
  borderBottomColor: 'grey.300',
  '& .MuiToolbar-root': {
    minHeight: { xs: 55 },
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: '31%',
    width: 10,
    height: 10,
    bgcolor: 'grey.300',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
}))

const TopHeaderStyles = {
  wrapper: {
    display: { xs: 'none', md: 'flex' },
    backgroundColor: 'common.black',
    height: 56,
    justifyContent: 'flex-end',
    paddingInline: 2,
  },
  container: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
}

const headerActionsStyles = {
  container: { paddingInline: { xs: 0, md: 3 } },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: { xs: 'common.black', md: 'grey.300' },
    boxShadow: 'none',
    height: {
      xs: 55,
      md: 68,
    },
  },
  logoWrapper: {
    order: { xs: 3, md: 1 },
    display: 'flex',
    top: { xs: 0, md: '-27px' },
  },
  hamburgerWrapper: {
    display: { xs: 'inline-flex', md: 'none' },
    order: { xs: 1 },
  },
  mobileSearchIconWrapper: {
    display: { xs: 'inline-flex', md: 'none' },
    order: { xs: 2 },
  },
  searchSuggestionsWrapper: {
    maxWidth: '40.6rem',
    flex: 1,
    display: { xs: 'none', md: 'inline-block' },
    alignItems: 'center',
    height: '100%',
    order: { md: 2 },
    pl: 4,
    pt: 2,
  },
  storeFinderWrapper: {
    order: { xs: 4, md: 3 },
    ml: { xs: 0, md: 'auto' },
  },
  myAccountIconWrapper: {
    display: { xs: 'none', md: 'inline-flex' },
    paddingInline: '3%',
    order: { md: 4 },
  },
  cartIconWrapper: {
    order: { xs: 5 },
  },
}

const KiboHeaderStyles = {
  appBarContainer: {
    top: 0,
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  },
  appBarWrapper: {
    boxShadow: 'none',
    height: {
      xs: 55,
      md: 124,
    },
  },
  topBarWrapper: {
    flexGrow: 1,
    position: 'relative',
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
    height: '100%',
    backgroundColor: 'grey.300',
  } as SxProps<Theme> | undefined,
  megaMenuContainer: {
    display: { xs: 'none', md: 'block' },
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'grey.300',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: 'grey.300',
    width: '100%',
    position: 'relative',
  } as SxProps<Theme> | undefined,
}

const TopHeader = ({ navLinks }: { navLinks: NavigationLink[] }) => {
  return (
    <Box sx={{ ...TopHeaderStyles.wrapper }}>
      <Container maxWidth="xl" sx={{ ...TopHeaderStyles.container }}>
        <StyledToolbarNav>
          {navLinks?.map((nav, index) => {
            return (
              <Box key={index}>
                <Link href={nav.link} underline="none" color="common.white">
                  <Typography variant="body2"> {nav.text}</Typography>
                </Link>
              </Box>
            )
          })}
        </StyledToolbarNav>
      </Container>
    </Box>
  )
}

const HeaderActions = (props: HeaderActionsProps) => {
  const { headerState, setHeaderState, isMobileViewport } = props
  const { t } = useTranslation('common')
  const { isAuthenticated, user, setAuthError } = useAuthContext()
  const router = useRouter()
  const { data: cart } = useCartQueries({})
  const itemCount = cart?.items?.length || 0
  const { showModal, closeModal } = useModalContext()

  const { data: location } = usePurchaseLocation()

  const openLoginModal = () => {
    setAuthError('')
    if (!isAuthenticated) showModal({ Component: LoginDialog })
  }

  const gotoCart = () => {
    router.push('/cart')
  }

  const openStoreLocatorModal = () => {
    if (location.name) {
      showModal({
        Component: MyStoreDialog,
        props: {
          location,
        },
      })
    } else {
      showModal({
        Component: StoreLocatorDialog,
        props: {
          handleSetStore: async (selectedStore: LocationCustom) => {
            setPurchaseLocationCookie(selectedStore?.code as string)
            closeModal()
          },
        },
      })
    }
  }

  return (
    <Container maxWidth="xl" sx={headerActionsStyles.container}>
      <Box sx={headerActionsStyles.wrapper}>
        <Box position="relative" sx={headerActionsStyles.logoWrapper}>
          <Link href="/">
            <KiboLogo />
          </Link>
        </Box>
        {/* Hamburger Menu */}
        <Box sx={headerActionsStyles.hamburgerWrapper}>
          <HeaderAction
            icon={headerState.viewHamburgerMenu ? CloseIcon : MenuIcon}
            {...(isMobileViewport && { iconFontSize: 'medium' })}
            onClick={() =>
              setHeaderState({
                viewHamburgerMenu: !headerState.viewHamburgerMenu,
                viewSearchPortal: false,
              })
            }
          />
        </Box>
        {/* Mobile Search Icon */}
        <Box
          sx={headerActionsStyles.mobileSearchIconWrapper}
          onClick={() =>
            setHeaderState({
              viewHamburgerMenu: false,
              viewSearchPortal: !headerState.viewSearchPortal,
            })
          }
          data-testid="mobile-searchIcon-container"
        >
          <HeaderAction icon={SearchIcon} {...(isMobileViewport && { iconFontSize: 'medium' })} />
        </Box>
        <Box sx={headerActionsStyles.searchSuggestionsWrapper} data-testid="Search-container">
          <SearchSuggestions />
        </Box>
        {/* Store finder icon */}
        <Box sx={headerActionsStyles.storeFinderWrapper}>
          <HeaderAction
            title={location?.name ? location.name : t('find-a-store')}
            subtitle={
              location?.address?.cityOrTown && location?.address?.stateOrProvince
                ? `${location?.address?.cityOrTown}, ${location?.address?.stateOrProvince}`
                : t('view-all')
            }
            icon={FmdGoodIcon}
            {...(isMobileViewport && { iconFontSize: 'medium' })}
            onClick={openStoreLocatorModal}
          />
        </Box>
        {/* My account Icon */}
        <Box sx={headerActionsStyles.myAccountIconWrapper}>
          <HeaderAction
            title={t('my-account')}
            subtitle={isAuthenticated ? `${t('hi')}, ${user?.firstName}` : t('log-in')}
            icon={AccountCircleIcon}
            {...(isMobileViewport && { iconFontSize: 'medium' })}
            onClick={openLoginModal}
          />
        </Box>
        <Box sx={headerActionsStyles.cartIconWrapper}>
          <HeaderAction
            subtitle={t('cart')}
            icon={ShoppingCartIcon}
            badgeContent={itemCount}
            {...(isMobileViewport && { iconFontSize: 'medium' })}
            onClick={gotoCart}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default function KiboHeader(props: KiboHeaderProps) {
  const { navLinks, categoriesTree: initialCategoryTree, sticky } = props
  const { data: categoriesTree } = useCategoryTree(initialCategoryTree)
  const kiboTheme = useTheme()
  const isMobileViewport = useMediaQuery(kiboTheme.breakpoints.down('md'))

  const [headerState, setHeaderState] = useState<HeaderState>({
    viewSearchPortal: false,
    viewHamburgerMenu: false,
  })
  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false)

  const handleHamburgerMenu = (value: boolean) => {
    setHeaderState({
      ...headerState,
      viewHamburgerMenu: value,
    })
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        position={sticky ? 'sticky' : 'relative'}
        sx={{ ...KiboHeaderStyles.appBarContainer }}
      >
        <AppBar
          position={sticky ? 'sticky' : 'static'}
          color="inherit"
          data-testid="kibo header"
          sx={{ ...KiboHeaderStyles.appBarWrapper }}
        >
          <Box sx={{ ...KiboHeaderStyles.topBarWrapper }}>
            {/* Header Navigation */}
            <TopHeader navLinks={navLinks} />
            {/* Header actions */}
            <HeaderActions
              headerState={headerState}
              setHeaderState={setHeaderState}
              isMobileViewport={isMobileViewport}
            />
            <Collapse in={headerState.viewSearchPortal}>
              <Box position="static" sx={{ display: { md: 'none' } }}>
                <StyledToolbar data-testid="searchbar-container">
                  <SearchSuggestions />
                </StyledToolbar>
              </Box>
            </Collapse>
          </Box>
        </AppBar>
        <HamburgerMenu
          categoryTree={categoriesTree || []}
          isDrawerOpen={headerState.viewHamburgerMenu}
          setIsDrawerOpen={handleHamburgerMenu}
          navLinks={navLinks}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ ...KiboHeaderStyles.megaMenuContainer, border: 'none' }}
        position={sticky ? 'sticky' : 'relative'}
      >
        <Backdrop open={isBackdropOpen} data-testid="backdrop" />
        <MegaMenu categoryTree={categoriesTree} onBackdropToggle={setIsBackdropOpen} />
      </Grid>
    </Grid>
  )
}
