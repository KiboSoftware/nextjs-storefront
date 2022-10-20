import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import {
  Typography,
  Link as MuiLink,
  Collapse,
  Box,
  AppBar,
  Backdrop,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { HeaderAction, KiboLogo } from '@/components/common'
import {
  MegaMenu,
  SearchSuggestions,
  MobileHeader,
  StoreFinderIcon,
  AccountIcon,
  CartIcon,
  HamburgerMenu,
  LoginDialog,
  CheckoutHeader,
} from '@/components/layout'
import { useAuthContext, useHeaderContext, useModalContext } from '@/context'
import { useCategoryTreeQueries } from '@/hooks'
import type { NavigationLink } from '@/lib/types'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface KiboHeaderProps {
  navLinks: NavigationLink[]
  categoriesTree: Maybe<PrCategory>[]
  sticky?: boolean
}

interface HeaderActionAreaProps {
  isHeaderSmall: boolean
  categoriesTree: Maybe<PrCategory>[]
  setIsBackdropOpen: Dispatch<SetStateAction<boolean>>
  handleAccountIconClick: () => void
}

const TopHeaderStyles = {
  wrapper: {
    display: 'flex',
    backgroundColor: 'common.black',
    height: 56,
    justifyContent: 'flex-end',
    zIndex: (theme: any) => theme.zIndex.modal,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}

const HeaderActionAreaStyles = {
  wrapper: {
    display: 'flex',
    backgroundColor: 'grey.300',
    height: 56,
  },
  container: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  searchSuggestionsWrapper: {
    maxWidth: '65%',
    flex: 1,
    display: { xs: 'none', md: 'inline-flex' },
    alignItems: 'flex-start',
    height: '100%',
    pl: 4,
    pt: 1.3,
  },
  logoWrapper: {
    order: 0,
    top: '-27px',
  },
}

const TopHeader = ({ navLinks }: { navLinks: NavigationLink[] }) => {
  const { t } = useTranslation('common')

  return (
    <Box sx={{ ...TopHeaderStyles.wrapper }} data-testid="top-bar">
      <Container maxWidth="xl" sx={{ ...TopHeaderStyles.container }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={5}>
          {navLinks?.map((nav, index) => {
            return (
              <Box key={index}>
                <Link href={nav.link} passHref>
                  <MuiLink underline="none" color="common.white">
                    <Typography variant="body2"> {t(`${nav.text}`)}</Typography>
                  </MuiLink>
                </Link>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}

const HeaderActionArea = (props: HeaderActionAreaProps) => {
  const { isHeaderSmall, categoriesTree, setIsBackdropOpen, handleAccountIconClick } = props
  const { headerState, toggleSearchBar } = useHeaderContext()
  const { t } = useTranslation('common')

  return (
    <Box sx={{ ...HeaderActionAreaStyles.wrapper }} data-testid="header-action-area">
      <Container
        maxWidth="xl"
        sx={{
          ...TopHeaderStyles.container,
          justifyContent: 'space-between',
        }}
      >
        <Box
          position="relative"
          sx={{
            ...HeaderActionAreaStyles.logoWrapper,
            ...(isHeaderSmall && { top: 0 }),
          }}
        >
          <Link href="/" passHref>
            <MuiLink>
              <KiboLogo small={isHeaderSmall} />
            </MuiLink>
          </Link>
        </Box>
        {(!isHeaderSmall || headerState.isSearchBarVisible) && (
          <Box sx={HeaderActionAreaStyles.searchSuggestionsWrapper} data-testid="Search-container">
            <SearchSuggestions
              isViewSearchPortal={headerState.isMobileSearchPortalVisible}
              onEnterSearch={() => toggleSearchBar(false)}
            />
            {isHeaderSmall && (
              <Box p={1} pt={0.7}>
                <Typography
                  color="text.primary"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => toggleSearchBar(false)}
                >
                  {t('cancel')}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        {isHeaderSmall && !headerState.isSearchBarVisible && (
          <Box maxWidth="calc(100% - 501px)" sx={{ backgroundColor: 'grey.300' }}>
            <MegaMenu categoryTree={categoriesTree} onBackdropToggle={setIsBackdropOpen} />
          </Box>
        )}
        <Box display="flex" gap={2}>
          {isHeaderSmall && !headerState.isSearchBarVisible && (
            <HeaderAction
              icon={SearchIcon}
              iconFontSize={isHeaderSmall ? 'medium' : 'large'}
              onClick={() => toggleSearchBar(true)}
            />
          )}
          <StoreFinderIcon size={isHeaderSmall ? 'medium' : 'large'} />
          <AccountIcon
            size={isHeaderSmall ? 'medium' : 'large'}
            handleAccountIconClick={handleAccountIconClick}
          />
          <CartIcon size={isHeaderSmall ? 'medium' : 'large'} />
        </Box>
      </Container>
    </Box>
  )
}

const KiboHeader = (props: KiboHeaderProps) => {
  const { navLinks, categoriesTree: initialCategoryTree, sticky } = props
  const { data: categoriesTree } = useCategoryTreeQueries(initialCategoryTree)
  const { headerState, toggleMobileSearchPortal, toggleHamburgerMenu } = useHeaderContext()
  const { isAuthenticated, setAuthError } = useAuthContext()
  const { showModal } = useModalContext()
  const router = useRouter()
  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false)

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const [isHeaderSmall, setIsHeaderSmall] = useState(false)
  const isCheckoutPage = router.pathname.includes('checkout')

  const isSectionVisible = () => !isHeaderSmall && mdScreen && !isCheckoutPage

  const handleAccountIconClick = () => {
    setAuthError('')
    headerState.isHamburgerMenuVisible && toggleHamburgerMenu()
    if (!isAuthenticated) {
      showModal({ Component: LoginDialog })
    } else {
      router.push('/my-account')
    }
  }

  const getSection = () => {
    if (isCheckoutPage) return <CheckoutHeader isDesktop={mdScreen} />

    if (!mdScreen) return <MobileHeader />

    return (
      <HeaderActionArea
        isHeaderSmall={isHeaderSmall}
        categoriesTree={categoriesTree}
        setIsBackdropOpen={setIsBackdropOpen}
        handleAccountIconClick={handleAccountIconClick}
      />
    )
  }

  useEffect(() => {
    const handler = () => {
      setIsHeaderSmall((isHeaderSmall) => {
        if (
          !isHeaderSmall &&
          (document.body.scrollTop > 0.1 || document.documentElement.scrollTop > 0.1)
        ) {
          return true
        }

        if (
          isHeaderSmall &&
          document.body.scrollTop < 0.1 &&
          document.documentElement.scrollTop < 0.1
        ) {
          return false
        }

        return isHeaderSmall
      })
    }

    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [isHeaderSmall])

  return (
    <>
      <AppBar
        position={sticky ? 'sticky' : 'static'}
        sx={{
          backgroundColor: 'grey.300',
          zIndex: (theme) => theme.zIndex.modal,
          scrollBehavior: 'smooth',
        }}
      >
        <Backdrop open={isBackdropOpen} data-testid="backdrop" />

        <Collapse in={isSectionVisible()} timeout={1000}>
          <TopHeader navLinks={navLinks} />
        </Collapse>
        <Box
          component={'section'}
          sx={{
            zIndex: (theme) => theme.zIndex.modal,
          }}
        >
          {getSection()}
        </Box>
        <Collapse in={isSectionVisible()} timeout={1000}>
          <Box
            component={'section'}
            sx={{
              backgroundColor: 'common.white',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'grey.500',
            }}
            data-testid="mega-menu-container"
          >
            <MegaMenu categoryTree={categoriesTree} onBackdropToggle={setIsBackdropOpen} />
          </Box>
        </Collapse>

        <Collapse in={headerState.isMobileSearchPortalVisible}>
          <Box p={1} height={'55px'} sx={{ display: { xs: 'block', md: 'none' } }}>
            <SearchSuggestions
              isViewSearchPortal={headerState.isMobileSearchPortalVisible}
              onEnterSearch={() => toggleMobileSearchPortal()}
            />
          </Box>
        </Collapse>
      </AppBar>

      <HamburgerMenu
        categoryTree={categoriesTree || []}
        isDrawerOpen={headerState.isHamburgerMenuVisible}
        setIsDrawerOpen={() => toggleHamburgerMenu()}
        navLinks={navLinks}
        handleAccountIconClick={handleAccountIconClick}
      />
    </>
  )
}

export default KiboHeader
