import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'
import Link from 'next/link'

import { HeaderAction, KiboLogo } from '@/components/common'
import { HamburgerIcon, StoreFinderIcon, CartIcon } from '@/components/layout'
import { useHeaderContext } from '@/context'

const MobileHeaderStyles = {
  container: {
    backgroundColor: 'common.white',
    height: '55px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

const MobileHeader = () => {
  const { toggleMobileSearchPortal } = useHeaderContext()

  return (
    <>
      <Box sx={MobileHeaderStyles.container} data-testid="mobile-header">
        <HamburgerIcon
          size="medium"
          mobileIconColor="black"
          data-testid="mobile-header-hamburger-icon"
        />

        <HeaderAction
          icon={SearchIcon}
          iconFontSize={'medium'}
          mobileIconColor="black"
          onClick={() => toggleMobileSearchPortal()}
          data-testid="mobile-header-search-icon"
        />

        <Box position="relative">
          <Link href="/" passHref>
            <KiboLogo small />
          </Link>
        </Box>

        <StoreFinderIcon
          size="medium"
          mobileIconColor="black"
          data-testid="mobile-header-store-icon"
        />
        <CartIcon size="medium" mobileIconColor="black" data-testid="mobile-header-cart-icon" />
      </Box>
    </>
  )
}

export default MobileHeader
