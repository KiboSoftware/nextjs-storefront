import React, { useState } from 'react'

import {
  Collapse,
  Box,
  AppBar,
  Backdrop,
  Container,
  useMediaQuery,
  useTheme,
  styled,
  Theme,
} from '@mui/material'
import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { headerActionAreaStyles, kiboHeaderStyles, topHeaderStyles } from './KiboHeader.styles'
import { KiboLogo } from '@/components/common'
import { AccountHierarchyFormDialog } from '@/components/dialogs'
import {
  AccountIcon,
  AccountRequestIcon,
  CartIcon,
  CheckoutHeader,
  HamburgerMenu,
  LoginDialog,
  MegaMenu,
  MobileHeader,
  SearchSuggestions,
  StoreFinderIcon,
} from '@/components/layout'
import { useAuthContext, useHeaderContext, useModalContext } from '@/context'
import { useCreateCustomerB2bAccountMutation, useGetCategoryTree } from '@/hooks'
import { buildCreateCustomerB2bAccountParams } from '@/lib/helpers'
import type { CreateCustomerB2bAccountParams, NavigationLink } from '@/lib/types'

import type { Maybe, PrCategory } from '@/lib/gql/types'

interface KiboHeaderProps {
  navLinks: NavigationLink[]
  categoriesTree: Maybe<PrCategory>[]
  isSticky?: boolean
}

interface HeaderActionAreaProps {
  isHeaderSmall: boolean
  isElementVisible?: boolean
  onAccountIconClick: () => void
  onAccountRequestClick: () => void
}

const HeaderActionArea = (props: HeaderActionAreaProps) => {
  const { isHeaderSmall, onAccountIconClick, onAccountRequestClick } = props
  const { headerState, toggleSearchBar } = useHeaderContext()
  const { isMobileSearchPortalVisible, isSearchBarVisible } = headerState
  const { t } = useTranslation('common')

  const showSearchBarInLargeHeader = !isHeaderSmall || isSearchBarVisible
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
          <StoreFinderIcon size={isHeaderSmall ? 'small' : 'medium'} />
          <AccountIcon
            size={isHeaderSmall ? 'small' : 'medium'}
            onAccountIconClick={onAccountIconClick}
          />
          <AccountRequestIcon
            onClick={onAccountRequestClick}
            isElementVisible={false}
            iconProps={{ fontSize: isHeaderSmall ? 'small' : 'medium' }}
            buttonText={t('b2b-account-request')}
          />
          <CartIcon size={isHeaderSmall ? 'small' : 'medium'} />
        </Box>
      </Container>
    </Box>
  )
}

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: theme?.palette.common.black,
  fontSize: theme?.typography.body1.fontSize,
}))

const TopHeader = ({ navLinks }: { navLinks: NavigationLink[] }) => {
  const { t } = useTranslation('common')

  return (
    <Box sx={{ ...topHeaderStyles.wrapper }} data-testid="top-bar">
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

const KiboHeader = (props: KiboHeaderProps) => {
  const { navLinks, categoriesTree: initialCategoryTree, isSticky = true } = props
  const { data: categoriesTree } = useGetCategoryTree(initialCategoryTree)
  const { headerState, toggleMobileSearchPortal, toggleHamburgerMenu } = useHeaderContext()
  const { isAuthenticated } = useAuthContext()
  const { showModal, closeModal } = useModalContext()
  const { t } = useTranslation('common')
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()

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

  const handleAccountRequest = async (formValues: CreateCustomerB2bAccountParams) => {
    const variables = buildCreateCustomerB2bAccountParams(formValues)
    await createCustomerB2bAccount.mutateAsync(variables)
    closeModal()
  }

  const handleB2BAccountRequestClick = () => {
    showModal({
      Component: AccountHierarchyFormDialog,
      props: {
        isAddingAccountToChild: false,
        isRequestAccount: true,
        primaryButtonText: t('request-account'),
        formTitle: t('b2b-account-request'),
        onSave: (formValues: CreateCustomerB2bAccountParams) => handleAccountRequest(formValues),
        onClose: () => closeModal(),
      },
    })
  }

  const getSection = (): React.ReactNode => {
    if (isCheckoutPage) return <CheckoutHeader isMultiShipEnabled={isMultiShipEnabled} />

    if (!mdScreen)
      return (
        <MobileHeader>
          <Collapse in={isMobileSearchPortalVisible}>
            <Box
              height={'55px'}
              minHeight={'55px'}
              sx={{ display: { xs: 'block', md: 'none' }, px: 1, mt: 1 }}
            >
              <SearchSuggestions
                isViewSearchPortal={isMobileSearchPortalVisible}
                onEnterSearch={() => toggleMobileSearchPortal()}
              />
            </Box>
          </Collapse>
          <HamburgerMenu
            categoryTree={categoriesTree || []}
            isDrawerOpen={isHamburgerMenuVisible}
            setIsDrawerOpen={() => toggleHamburgerMenu()}
            navLinks={navLinks}
            onAccountIconClick={handleAccountIconClick}
          />
        </MobileHeader>
      )

    return (
      <HeaderActionArea
        isHeaderSmall={false}
        isElementVisible={true}
        onAccountIconClick={handleAccountIconClick}
        onAccountRequestClick={handleB2BAccountRequestClick}
      />
    )
  }

  return (
    <>
      <AppBar
        position={isSticky ? 'sticky' : 'static'}
        sx={kiboHeaderStyles.appBarStyles}
        data-testid="header-container"
      >
        <Backdrop open={isBackdropOpen} data-testid="backdrop" />

        <TopHeader navLinks={navLinks} />

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
      </AppBar>
    </>
  )
}

export default KiboHeader
