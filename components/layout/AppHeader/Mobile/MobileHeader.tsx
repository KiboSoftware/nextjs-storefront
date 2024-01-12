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
        <HamburgerIcon />

        <HeaderAction
          icon={SearchIcon}
          iconFontSize={'medium'}
          onClick={() => toggleMobileSearchPortal()}
        />

        <Box position="relative">
          <Link href="/" passHref>
            <KiboLogo small />
          </Link>
        </Box>

        <StoreFinderIcon size="medium" />
        <CartIcon size="medium" />
      </Box>
    </>
  )
}

export default MobileHeader
