import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'

import { HeaderAction } from '@/components/common'
import { useHeaderContext } from '@/context'

const HamburgerIcon = () => {
  const { headerState, toggleHamburgerMenu } = useHeaderContext()

  return (
    <HeaderAction
      icon={headerState?.isHamburgerMenuVisible ? CloseIcon : MenuIcon}
      iconFontSize={'medium'}
      onClick={() => toggleHamburgerMenu()}
    />
  )
}

export default HamburgerIcon
