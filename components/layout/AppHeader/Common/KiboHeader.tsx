import React, { Dispatch, SetStateAction, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import {
  Typography,
  Collapse,
  Box,
  AppBar,
  Backdrop,
  Container,
  useMediaQuery,
  useTheme,
  Slide,
  useScrollTrigger,
  Theme,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
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
  isSticky?: boolean
}

interface HeaderActionAreaProps {
  isHeaderSmall: boolean
  categoriesTree: Maybe<PrCategory>[]
  setIsBackdropOpen: Dispatch<SetStateAction<boolean>>
  onAccountIconClick: () => void
}

interface HideOnScrollProps {
  trigger: boolean
  children: React.ReactElement
}

const topHeaderStyles = {
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

const headerActionAreaStyles = {
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

const kiboHeaderStyles = {
  appBarStyles: {
    backgroundColor: 'grey.300',
    zIndex: (theme: any) => theme.zIndex.modal,
    scrollBehavior: 'smooth',
  },
  megaMenuStyles: {
    backgroundColor: 'common.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'grey.500',
  },
}

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: theme?.palette.common.white,
  fontSize: theme?.typography.body2.fontSize,
}))

const TopHeader = ({
  navLinks,
  isElementVisible,
}: {
  navLinks: NavigationLink[]
  isElementVisible: boolean
}) => {
  const { t } = useTranslation('common')

  return (
    <Box
      sx={{ ...topHeaderStyles.wrapper, ...(!isElementVisible && { display: 'none' }) }}
      data-testid="top-bar"
    >
      <Container maxWidth="xl" sx={{ ...topHeaderStyles.container }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={5}>
          {navLinks?.map((nav, index) => {
            return (
              <Box key={index}>
                <StyledLink href={nav.link} passHref>
                  {t(`${nav.text}`)}
                </StyledLink>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}

const HeaderActionArea = (props: HeaderActionAreaProps) => {
  const { isHeaderSmall, categoriesTree, setIsBackdropOpen, onAccountIconClick } = props
  const { headerState, toggleSearchBar } = useHeaderContext()
  const { isMobileSearchPortalVisible, isSearchBarVisible } = headerState
  const { t } = useTranslation('common')

  const showSearchBarInLargeHeader = !isHeaderSmall || isSearchBarVisible
  const shouldShowSearchIconInSmallHeader = isHeaderSmall && !isSearchBarVisible
  return (
    <Box sx={{ ...headerActionAreaStyles.wrapper }} data-testid="header-action-area">
      <Container
        maxWidth="xl"
        sx={{
          ...topHeaderStyles.container,
          justifyContent: 'space-between',
        }}
      >
        <Box
          position="relative"
          sx={{
            ...headerActionAreaStyles.logoWrapper,
            ...(isHeaderSmall && { top: 0 }),
          }}
        >
          <Link href="/" passHref>
            <KiboLogo small={isHeaderSmall} />
          </Link>
        </Box>
        {showSearchBarInLargeHeader && (
          <Box sx={headerActionAreaStyles.searchSuggestionsWrapper} data-testid="Search-container">
            <SearchSuggestions
              isViewSearchPortal={isMobileSearchPortalVisible}
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
        {shouldShowSearchIconInSmallHeader && (
          <Box maxWidth="calc(100% - 501px)" sx={{ backgroundColor: 'grey.300' }}>
            <MegaMenu categoryTree={categoriesTree} onBackdropToggle={setIsBackdropOpen} />
          </Box>
        )}
        <Box display="flex" gap={2}>
          {shouldShowSearchIconInSmallHeader && (
            <HeaderAction
              icon={SearchIcon}
              iconFontSize={isHeaderSmall ? 'medium' : 'large'}
              onClick={() => toggleSearchBar(true)}
            />
          )}
          <StoreFinderIcon size={isHeaderSmall ? 'medium' : 'large'} />
          <AccountIcon
            size={isHeaderSmall ? 'medium' : 'large'}
            onAccountIconClick={onAccountIconClick}
          />
          <CartIcon size={isHeaderSmall ? 'medium' : 'large'} />
        </Box>
      </Container>
    </Box>
  )
}

function HideOnScroll(props: HideOnScrollProps) {
  const { trigger, children } = props

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Box sx={{ ...(trigger && { height: 0 }) }}>{children}</Box>
    </Slide>
  )
}

const KiboHeader = (props: KiboHeaderProps) => {
  const { navLinks, categoriesTree: initialCategoryTree, isSticky } = props
  const { data: categoriesTree } = useCategoryTreeQueries(initialCategoryTree)
  const { headerState, toggleMobileSearchPortal, toggleHamburgerMenu } = useHeaderContext()
  const { isAuthenticated, setAuthError } = useAuthContext()
  const { showModal } = useModalContext()
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false)

  const { isHamburgerMenuVisible, isMobileSearchPortalVisible } = headerState
  const isCheckoutPage = router.pathname.includes('checkout')
  const isElementVisible = !isCheckoutPage && mdScreen && !trigger
  const { publicRuntimeConfig } = getConfig()
  const isMultiShipEnabled = publicRuntimeConfig.isMultiShipEnabled

  const handleAccountIconClick = () => {
    setAuthError('')
    isHamburgerMenuVisible && toggleHamburgerMenu()
    if (!isAuthenticated) {
      showModal({ Component: LoginDialog })
    } else {
      router.push('/my-account')
    }
  }

  const getSection = (): React.ReactNode => {
    if (isCheckoutPage) return <CheckoutHeader isMultiShipEnabled={isMultiShipEnabled} />

    if (!mdScreen) return <MobileHeader />

    return (
      <HeaderActionArea
        isHeaderSmall={trigger}
        categoriesTree={categoriesTree}
        setIsBackdropOpen={setIsBackdropOpen}
        onAccountIconClick={handleAccountIconClick}
      />
    )
  }

  return (
    <>
      <AppBar position={isSticky ? 'sticky' : 'static'} sx={kiboHeaderStyles.appBarStyles}>
        <Backdrop open={isBackdropOpen} data-testid="backdrop" />

        <HideOnScroll trigger={trigger}>
          <TopHeader navLinks={navLinks} isElementVisible={isElementVisible} />
        </HideOnScroll>
        <Box
          component={'section'}
          sx={{
            zIndex: (theme) => theme.zIndex.modal,
          }}
        >
          {getSection()}
        </Box>

        <HideOnScroll trigger={trigger}>
          <Box
            component={'section'}
            sx={{
              ...kiboHeaderStyles.megaMenuStyles,
              ...(!isElementVisible && { display: 'none' }),
            }}
            data-testid="mega-menu-container"
          >
            <MegaMenu categoryTree={categoriesTree} onBackdropToggle={setIsBackdropOpen} />
          </Box>
        </HideOnScroll>

        <Collapse in={isMobileSearchPortalVisible}>
          <Box p={1} height={'55px'} sx={{ display: { xs: 'block', md: 'none' } }}>
            <SearchSuggestions
              isViewSearchPortal={isMobileSearchPortalVisible}
              onEnterSearch={() => toggleMobileSearchPortal()}
            />
          </Box>
        </Collapse>
      </AppBar>

      <HamburgerMenu
        categoryTree={categoriesTree || []}
        isDrawerOpen={isHamburgerMenuVisible}
        setIsDrawerOpen={() => toggleHamburgerMenu()}
        navLinks={navLinks}
        onAccountIconClick={handleAccountIconClick}
      />
    </>
  )
}

export default KiboHeader
