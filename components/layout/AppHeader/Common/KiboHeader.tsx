import React, { useEffect, useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  Typography,
  Link as MuiLink,
  Collapse,
  Box,
  AppBar,
  Backdrop,
  Container,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { HeaderAction, KiboLogo } from '@/components/common'
import { MyStoreDialog, StoreLocatorDialog } from '@/components/dialogs'
import { MegaMenu, SearchSuggestions, LoginDialog } from '@/components/layout'
import { useAuthContext, useModalContext } from '@/context'
import { useHeaderContext } from '@/context/HeaderContext'
import { useCartQueries, useCategoryTreeQueries, usePurchaseLocationQueries } from '@/hooks'
import { cartGetters } from '@/lib/getters'
import { setPurchaseLocationCookie } from '@/lib/helpers'
import type { LocationCustom, NavigationLink } from '@/lib/types'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface KiboHeaderProps {
  navLinks: NavigationLink[]
  categoriesTree: Maybe<PrCategory>[]
  sticky?: boolean
}

const TopHeaderStyles = {
  wrapper: {
    display: { xs: 'none', md: 'flex' },
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
    order: { xs: 3, md: 0 },
    // display: 'flex',
    top: { xs: 0, md: '-27px' },
  },
}

const TopHeader = ({ navLinks }: { navLinks: NavigationLink[] }) => {
  const { t } = useTranslation('common')

  return (
    <Box sx={{ ...TopHeaderStyles.wrapper }}>
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

const StoreFinderIcon = () => {
  const { toggleStoreLocator, headerState } = useHeaderContext()
  const { data: location } = usePurchaseLocationQueries()
  const { showModal, closeModal } = useModalContext()
  const { t } = useTranslation('common')

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
  const handleClick = () => {
    toggleStoreLocator()
    openStoreLocatorModal()
  }

  return (
    <HeaderAction
      title={location?.name ? location.name : t('find-a-store')}
      subtitle={
        location?.address?.cityOrTown && location?.address?.stateOrProvince
          ? `${location?.address?.cityOrTown}, ${location?.address?.stateOrProvince}`
          : t('view-all')
      }
      icon={FmdGoodIcon}
      onClick={handleClick}
    />
  )
}

const AccountIcon = () => {
  const { isAuthenticated, user, setAuthError } = useAuthContext()
  const { showModal } = useModalContext()
  const { toggleHamburgerMenu, headerState } = useHeaderContext()
  const router = useRouter()
  const { t } = useTranslation('common')

  const openLoginModal = () => {
    setAuthError('')
    headerState.isHamburgerMenuVisible && toggleHamburgerMenu()
    if (!isAuthenticated) {
      showModal({ Component: LoginDialog })
    } else {
      router.push('/my-account')
    }
  }

  return (
    <HeaderAction
      title={isAuthenticated ? `${t('hi')}, ${user?.firstName}` : t('my-account')}
      subtitle={isAuthenticated ? t('go-to-my-account') : t('log-in')}
      icon={AccountCircleIcon}
      onClick={openLoginModal}
    />
  )
}

const CartIcon = () => {
  const { t } = useTranslation('common')
  const { data: cart } = useCartQueries({})
  const itemCount = cartGetters.getCartItemCount(cart)
  const router = useRouter()
  const gotoCart = () => {
    router.push('/cart')
  }

  return (
    <HeaderAction
      subtitle={t('cart')}
      icon={ShoppingCartIcon}
      badgeContent={itemCount}
      onClick={gotoCart}
    />
  )
}

const HeaderActionArea = (props: any) => {
  const { isHeaderSmall, categoriesTree, setIsBackdropOpen } = props
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)

  return (
    <Box sx={{ ...HeaderActionAreaStyles.wrapper }}>
      <Container
        maxWidth="xl"
        sx={{
          ...TopHeaderStyles.container,
          justifyContent: isHeaderSmall ? 'flex-start' : 'space-between',
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
        {(!isHeaderSmall || isSearchBarVisible) && (
          <Box sx={HeaderActionAreaStyles.searchSuggestionsWrapper} data-testid="Search-container">
            <SearchSuggestions />
            {isHeaderSmall && (
              <Box p={1} pt={0.7}>
                <Typography color="text.primary" onClick={() => setIsSearchBarVisible(false)}>
                  Cancel
                </Typography>
              </Box>
            )}
          </Box>
        )}
        {isHeaderSmall && !isSearchBarVisible && (
          <MegaMenu
            categoryTree={categoriesTree}
            onBackdropToggle={setIsBackdropOpen}
            backgroundColor="grey.300"
          />
        )}
        <Box display="flex" gap={2}>
          {isHeaderSmall && !isSearchBarVisible && (
            <HeaderAction icon={SearchIcon} onClick={() => setIsSearchBarVisible(true)} />
          )}
          <StoreFinderIcon />
          <AccountIcon />
          <CartIcon />
        </Box>
      </Container>
    </Box>
  )
}

const KiboHeader = (props: KiboHeaderProps) => {
  const { navLinks, categoriesTree: initialCategoryTree, sticky } = props
  const { data: categoriesTree } = useCategoryTreeQueries(initialCategoryTree)

  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false)
  const [isHeaderSmall, setIsHeaderSmall] = useState(false)

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

        <Collapse in={!isHeaderSmall} timeout={1000}>
          <Box>
            <TopHeader navLinks={navLinks} />
          </Box>
        </Collapse>
        <Box
          component={'section'}
          sx={{
            zIndex: (theme) => theme.zIndex.modal,
          }}
        >
          <HeaderActionArea
            isHeaderSmall={isHeaderSmall}
            categoriesTree={categoriesTree}
            isBackdropOpen={isBackdropOpen}
            setIsBackdropOpen={setIsBackdropOpen}
          />
        </Box>
        <Collapse in={!isHeaderSmall} timeout={1000}>
          <Box
            component={'section'}
            sx={{
              backgroundColor: 'common.white',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'grey.500',
            }}
          >
            <MegaMenu categoryTree={categoriesTree} onBackdropToggle={setIsBackdropOpen} />
          </Box>
        </Collapse>
      </AppBar>
    </>
  )
}

export default KiboHeader
