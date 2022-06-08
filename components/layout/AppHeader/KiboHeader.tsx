import React, { ReactNode, useState } from 'react'

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
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import SearchSuggestions from '../SearchSuggestions/SearchSuggestions'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import HeaderAction from '@/components/common/HeaderAction/HeaderAction'
import KiboLogo from '@/components/common/KiboLogo/KiboLogo'
import { HamburgerMenu } from '@/components/layout'
import MegaMenu from '@/components/layout/MegaMenu/MegaMenu'

import type { Maybe, PrCategory } from '@/lib/gql/types'
const StyledToolbarNav = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 50,
}))
const TopHeader = ({
  navLinks,
}: {
  navLinks: {
    link: string
    text: string
  }[]
}) => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        backgroundColor: 'common.black',
        height: 56,
        justifyContent: 'flex-end',
        paddingInline: 2,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
      >
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
interface HeaderActionsProps {
  headerState: {
    viewHamburgerMenu: boolean
    viewSearchPortal: boolean
  }
  setHeaderState: (val: any) => void
  isMobileViewport: boolean
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
const HeaderActions = (props: HeaderActionsProps) => {
  const { headerState, setHeaderState, isMobileViewport } = props
  const { t } = useTranslation('common')
  return (
    <Container maxWidth="xl" sx={headerActionsStyles.container}>
      <Box sx={headerActionsStyles.wrapper}>
        <Box position="relative" sx={headerActionsStyles.logoWrapper}>
          <KiboLogo />
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
              viewSearchPortal: !headerState.viewSearchPortal,
              viewHamburgerMenu: false,
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
            title={t('find-a-store')}
            subtitle={t('view-all')}
            icon={FmdGoodIcon}
            {...(isMobileViewport && { iconFontSize: 'medium' })}
          />
        </Box>
        {/* My account Icon */}
        <Box sx={headerActionsStyles.myAccountIconWrapper}>
          <HeaderAction
            title={t('my-account')}
            subtitle={t('log-in')}
            icon={AccountCircleIcon}
            {...(isMobileViewport && { iconFontSize: 'medium' })}
          />
        </Box>
        <Box sx={headerActionsStyles.cartIconWrapper}>
          <HeaderAction
            subtitle={t('cart')}
            icon={ShoppingCartIcon}
            badgeContent={3}
            {...(isMobileViewport && { iconFontSize: 'medium' })}
          />
        </Box>
      </Box>
    </Container>
  )
}
const StyledToolbar = styled(Toolbar)(() => ({
  alignItems: 'center',
  display: 'flex',
  '& .MuiToolbar-root': {
    minHeight: { xs: 55 },
  },
}))
interface KiboHeaderProps {
  navLinks: {
    link: string
    text: string
  }[]
  categoriesTree: Maybe<PrCategory>[]
  sticky?: boolean
  children?: ReactNode
}
export default function KiboHeader(props: KiboHeaderProps) {
  const { navLinks, categoriesTree, sticky, children } = props
  const [headerState, setHeaderState] = useState({
    viewSearchPortal: false,
    viewHamburgerMenu: false,
  })
  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false)
  const kiboTheme = useTheme()
  const isMobileViewport = useMediaQuery(kiboTheme.breakpoints.down('md'))
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
        sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <AppBar
          position={sticky ? 'sticky' : 'static'}
          color="inherit"
          data-testid="kibo header"
          sx={{
            boxShadow: 'none',
            height: {
              xs: 55,
              md: 124,
            },
            // zIndex: 1300,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              position: 'relative',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              height: '100%',
              backgroundColor: 'grey.300',
            }}
          >
            {/* Header Navigation */}
            <TopHeader navLinks={navLinks} />
            {/* Header actions */}
            <HeaderActions
              headerState={headerState}
              setHeaderState={setHeaderState}
              isMobileViewport={isMobileViewport}
            />
            <Collapse in={headerState.viewSearchPortal}>
              <Box
                position="static"
                sx={{
                  display: { md: 'none' },
                }}
              >
                <StyledToolbar
                  sx={{
                    backgroundColor: 'grey.300',
                    borderBottomColor: 'red',
                    display: { xs: 'flex' },
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
                  }}
                  data-testid="searchbar-container"
                >
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
        sx={{
          display: { xs: 'none', md: 'block' },
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: 'grey.300',
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: 'grey.300',
          width: '100%',
          position: 'relative',
        }}
        position={sticky ? 'sticky' : 'relative'}
      >
        <Backdrop open={isBackdropOpen} data-testid="backdrop" />
        <MegaMenu categoryTree={categoriesTree || []} onBackdropToggle={setIsBackdropOpen} />
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  )
}
