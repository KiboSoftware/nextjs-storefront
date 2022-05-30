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

const StyledToolbar = styled(Toolbar)(() => ({
  alignItems: 'center',
  display: 'flex',
  '& .MuiToolbar-root': {
    minHeight: { xs: 55 },
  },
}))

const StyledToolbarNav = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 50,
}))

interface KiboHeaderProps {
  navLinks: {
    link: string
    text: string
  }[]
  sticky?: boolean
  children?: ReactNode
}

export default function KiboHeader(props: KiboHeaderProps) {
  const { navLinks, sticky, children } = props
  const [headerState, setHeaderState] = useState({
    viewSearchPortal: false,
    viewHamburgerMenu: false,
  })
  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false)

  const { t } = useTranslation('common')
  const kiboTheme = useTheme()
  const isMobileViewport = useMediaQuery(kiboTheme.breakpoints.down('md'))

  const categories = categoryTreeDataMock.categoriesTree.items?.filter((item) => item.isDisplayed)

  const handleHamburgerMenu = (value: boolean) => {
    setHeaderState({
      ...headerState,
      viewHamburgerMenu: value,
    })
  }
  const handleSearch = () => {
    return ''
  }

  return (
    <Grid container>
      <Grid item xs={12} position={sticky ? 'sticky' : 'relative'} sx={{ top: 0, zIndex: 1300 }}>
        <AppBar
          position={sticky ? 'sticky' : 'static'}
          color="inherit"
          data-testid="kibo header"
          sx={{
            boxShadow: 'none',
            backgroundColor: 'transparent',
            height: {
              xs: 55,
              md: 124,
            },
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              position: 'relative',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              height: '100%',
            }}
          >
            {/* Desktop Logo */}
            <Box
              sx={{
                position: 'absolute',
                left: '2%',
                top: '12%',
                display: {
                  xs: 'none',
                  md: 'flex',
                },
                zIndex: (theme) => theme.zIndex.appBar,
              }}
            >
              <KiboLogo />
            </Box>
            {/* Header Navigation */}
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
                maxWidth="lg"
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
            {/* Header actions */}
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  backgroundColor: { xs: 'common.black', md: 'common.white' },
                  boxShadow: 'none',
                  // borderWidth: { xs: 0, md: 1 },
                  // borderStyle: { xs: 'none', md: 'solid' },
                  // borderColor: 'grey.300',
                  height: {
                    xs: 55,
                    md: 68,
                  },
                  minHeight: {
                    xs: 55,
                    md: 68,
                  },
                }}
              >
                <Box
                  sx={{
                    order: { xs: 3, md: 0 },
                    display: {
                      xs: 'flex',
                      md: 'none',
                    },
                  }}
                >
                  <KiboLogo />
                </Box>
                <Box
                  sx={{
                    display: { xs: 'inline-flex', md: 'none' },
                    order: { xs: 1 },
                  }}
                >
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
                <Box
                  sx={{
                    display: { xs: 'inline-flex', md: 'none' },
                    order: { xs: 2 },
                  }}
                  onClick={() =>
                    setHeaderState({
                      viewSearchPortal: !headerState.viewSearchPortal,
                      viewHamburgerMenu: false,
                    })
                  }
                  data-testid="mobile-searchIcon-container"
                >
                  <HeaderAction
                    icon={SearchIcon}
                    {...(isMobileViewport && { iconFontSize: 'medium' })}
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'inline-block' },
                    order: { md: 1 },
                    // pl: { xs: 0, md: 14 },
                    // pt: 4,
                    alignItems: 'center',
                    boxSizing: 'content-box',
                    pl: { sm: 14, lg: 10, xl: 0 },
                  }}
                  data-testid="Search-container"
                >
                  <SearchSuggestions />
                </Box>
                <Box
                  sx={{
                    order: { xs: 4, md: 2 },
                    ml: { xs: 0, md: 'auto' },
                  }}
                >
                  <HeaderAction
                    title={t('find-a-store')}
                    subtitle={t('view-all')}
                    icon={FmdGoodIcon}
                    {...(isMobileViewport && { iconFontSize: 'medium' })}
                  />
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    order: { md: 4 },
                  }}
                >
                  <HeaderAction
                    title={t('my-account')}
                    subtitle={t('log-in')}
                    icon={AccountCircleIcon}
                    {...(isMobileViewport && { iconFontSize: 'medium' })}
                  />
                </Box>
                <Box
                  sx={{
                    order: { xs: 5 },
                  }}
                >
                  <HeaderAction
                    subtitle={t('cart')}
                    icon={ShoppingCartIcon}
                    badgeContent={3}
                    {...(isMobileViewport && { iconFontSize: 'medium' })}
                  />
                </Box>
              </Box>
            </Container>
            {/* Megamenu section */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                height: 59,
                backgroundColor: 'common.white',
                borderWidth: { xs: 0, md: 1 },
                borderStyle: { xs: 'none', md: 'solid' },
                borderColor: 'grey.300',
              }}
              data-testid="megamenu-container"
            ></Box>
            {/* Mobile searchbar section */}
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
          categoryTree={categories}
          isDrawerOpen={headerState.viewHamburgerMenu}
          setIsDrawerOpen={handleHamburgerMenu}
          navLinks={navLinks}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: { xs: 'none', md: 'block' }, top: { xs: 55, md: 124 } }}
        position={sticky ? 'sticky' : 'relative'}
      >
        <Backdrop open={isBackdropOpen} data-testid="backdrop" />
        <MegaMenu categoryTree={categories} onBackdropToggle={setIsBackdropOpen} />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: { xs: '3rem', md: '8rem' } }}>
        {children}
      </Grid>
    </Grid>
  )
}
