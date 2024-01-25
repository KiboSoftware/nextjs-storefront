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
} from '@mui/material'
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { headerActionAreaStyles, kiboHeaderStyles, topHeaderStyles } from './KiboHeader.styles'
import { KiboLogo } from '@/components/common'
import { AccountIcon, CartIcon, StoreFinderIcon } from '@/components/layout'
const HeaderAction = dynamic(() => import('@/components/common').then((mod) => mod.HeaderAction), {
  ssr: false,
})
const MegaMenu = dynamic(() => import('@/components/layout').then((mod) => mod.MegaMenu), {
  ssr: false,
})
const HamburgerMenu = dynamic(
  () => import('@/components/layout').then((mod) => mod.HamburgerMenu),
  {
    ssr: false,
  }
)
const SearchSuggestions = dynamic(
  () => import('@/components/layout').then((mod) => mod.SearchSuggestions),
  {
    ssr: false,
  }
)
const MobileHeader = dynamic(() => import('@/components/layout').then((mod) => mod.MobileHeader), {
  ssr: false,
})
const LoginDialog = dynamic(() => import('@/components/layout').then((mod) => mod.LoginDialog), {
  ssr: false,
})
const CheckoutHeader = dynamic(
  () => import('@/components/layout').then((mod) => mod.CheckoutHeader),
  {
    ssr: false,
  }
)
import { useAuthContext, useHeaderContext, useModalContext } from '@/context'
import { useGetCategoryTree } from '@/hooks'
import type { NavigationLink } from '@/lib/types'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface KiboHeaderProps {
  navLinks: NavigationLink[]
  categoriesTree: Maybe<PrCategory>[]
  isSticky?: boolean
}

interface HeaderActionAreaProps {
  isHeaderSmall: boolean
  isAuthenticated: boolean
  categoriesTree: Maybe<PrCategory>[]
  setIsBackdropOpen: Dispatch<SetStateAction<boolean>>
  onAccountIconClick: () => void
}

const HeaderActionArea = (props: HeaderActionAreaProps) => {
  const { isHeaderSmall, isAuthenticated, categoriesTree, setIsBackdropOpen, onAccountIconClick } =
    props
  const { headerState, toggleSearchBar } = useHeaderContext()
  const { isMobileSearchPortalVisible, isSearchBarVisible } = headerState
  const { t } = useTranslation('common')

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
        <Box
          component={'section'}
          sx={{
            ...kiboHeaderStyles.logoStyles,
          }}
        >
          <Link href="/">
            <KiboLogo />
          </Link>
        </Box>

        <Box display="flex" flex={1} justifyContent={'flex-end'} gap={2}>
          {shouldShowSearchIconInSmallHeader && (
            <HeaderAction
              icon={SearchIcon}
              iconFontSize={isHeaderSmall ? 'small' : 'medium'}
              onClick={() => toggleSearchBar(true)}
            />
          )}
          <StoreFinderIcon size={isHeaderSmall ? 'small' : 'medium'} />
          <AccountIcon
            size={isHeaderSmall ? 'small' : 'medium'}
            onAccountIconClick={onAccountIconClick}
          />
          <CartIcon size={isHeaderSmall ? 'small' : 'medium'} />
        </Box>
      </Container>
    </Box>
  )
}

const KiboHeader = (props: KiboHeaderProps) => {
  const { navLinks, categoriesTree: initialCategoryTree, isSticky = true } = props
  const { data: categoriesTree } = useGetCategoryTree(initialCategoryTree)
  const { headerState, toggleMobileSearchPortal, toggleHamburgerMenu } = useHeaderContext()
  const { isAuthenticated } = useAuthContext()
  const { showModal } = useModalContext()
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false)

  const { isHamburgerMenuVisible, isMobileSearchPortalVisible } = headerState
  const isCheckoutPage = router.pathname.includes('checkout')
  const { publicRuntimeConfig } = getConfig()
  const isMultiShipEnabled = publicRuntimeConfig.isMultiShipEnabled

  const handleAccountIconClick = () => {
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
        isHeaderSmall={false}
        isAuthenticated={isAuthenticated}
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

        <Box component={'section'} sx={{ ...kiboHeaderStyles.topBarStyles }}>
          {getSection()}
        </Box>

        <Box
          component={'section'}
          sx={{
            ...kiboHeaderStyles.megaMenuStyles,
          }}
          data-testid="mega-menu-container"
        >
          {!isCheckoutPage && (
            <MegaMenu categoryTree={categoriesTree} onBackdropToggle={setIsBackdropOpen} />
          )}
        </Box>

        <Collapse in={isMobileSearchPortalVisible}>
          <Box
            height={'55px'}
            minHeight={'55px'}
            sx={{ display: { xs: 'block', md: 'none' }, px: { xs: 3, md: 1 }, mt: 1 }}
          >
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
