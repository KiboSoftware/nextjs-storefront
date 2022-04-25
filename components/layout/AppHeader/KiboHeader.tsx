import React, { useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Typography, Toolbar, Link, Grid, Collapse, Box, AppBar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import HeaderAction from '@/components/common/HeaderAction/HeaderAction'
import KiboLogo from '@/components/common/KiboLogo/KiboLogo'
import SearchBar from '@/components/common/SearchBar/SearchBar'

const StyledToolbar = styled(Toolbar)(() => ({
  alignItems: 'center',
  display: 'flex',
}))

const StyledToolbarNav = styled(Toolbar)(() => ({
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
  children?: React.ReactNode
}

export default function KiboHeader(props: KiboHeaderProps) {
  const { navLinks, sticky, children } = props
  const [headerState, setHeaderState] = useState({
    viewSearchPortal: false,
    viewHamburgerMenu: false,
  })
  const { t } = useTranslation('common')

  // Should be included after code merge with Hamburger Menu ticket
  // const handleHamburgerMenu = (value: boolean) => {
  //   setHeaderState({
  //     ...headerState,
  //     viewHamburgerMenu: value,
  //   })
  // }

  const handleSearch = () => {
    return ''
  }

  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <AppBar
          position={sticky ? 'sticky' : 'static'}
          color="transparent"
          data-testid="kibo header"
          sx={{
            height: {
              xs: 55,
              md: 183,
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
              }}
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
            </Box>

            {/* Header actions */}
            <Box
              sx={{
                boxShadow: 'none',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'grey.300',
                backgroundColor: 'common.white',
              }}
            >
              <StyledToolbar
                sx={{
                  justifyContent: 'space-between',
                  backgroundColor: { xs: 'common.black', md: 'common.white' },
                  position: 'relative',
                  overflow: 'hidden',
                  height: {
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
                    marginLeft: 'auto',
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
                    marginLeft: 'auto',
                  }}
                  onClick={() =>
                    setHeaderState({
                      viewSearchPortal: !headerState.viewSearchPortal,
                      viewHamburgerMenu: false,
                    })
                  }
                  data-testid="mobile-searchIcon-container"
                >
                  <HeaderAction icon={SearchIcon} />
                </Box>
                <Box
                  flex={1}
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'inline-flex',
                    },
                    order: { md: 1 },
                    pl: { md: '10%' },
                    maxWidth: 650,
                  }}
                >
                  <SearchBar searchTerm="" onSearch={handleSearch} showClearButton />
                </Box>
                <Box
                  sx={{
                    order: { xs: 4, md: 2 },
                    marginLeft: 'auto',
                  }}
                >
                  <HeaderAction
                    title={t('find-a-store')}
                    subtitle={t('view-all')}
                    icon={FmdGoodIcon}
                  />
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    order: { md: 4 },
                    marginLeft: 'auto',
                  }}
                >
                  <HeaderAction
                    title={t('my-account')}
                    subtitle={t('log-in')}
                    icon={AccountCircleIcon}
                  />
                </Box>
                <Box
                  sx={{
                    order: { xs: 5 },
                    marginLeft: 'auto',
                  }}
                >
                  <HeaderAction subtitle={t('cart')} icon={ShoppingCartIcon} badgeContent={3} />
                </Box>
              </StyledToolbar>
            </Box>

            {/* Megamenu section */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                height: 59,
                backgroundColor: 'common.white',
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
                  <SearchBar searchTerm="" onSearch={handleSearch} showClearButton />
                </StyledToolbar>
              </Box>
            </Collapse>
          </Box>
        </AppBar>
        {/* Should be <HamburgerMenu
          isDrawerOpen={headerState.viewHamburgerMenu}
          setIsDrawerOpen={handleHamburgerMenu}
          navLinks={navLinks}
        /> after code merge with hamburger menu ticket*/}
        {children}
      </Grid>
    </Grid>
  )
}
