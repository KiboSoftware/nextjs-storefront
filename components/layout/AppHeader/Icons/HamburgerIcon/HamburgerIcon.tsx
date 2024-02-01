import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { useHeaderContext } from '@/context'
import { IconProps } from '@/lib/types'

const HamburgerIcon = ({ size = 'medium', mobileIconColor }: IconProps) => {
  const { headerState, toggleHamburgerMenu } = useHeaderContext()

  const { t } = useTranslation('common')

  return (
    <HeaderAction
      title={t('menu')}
      icon={headerState?.isHamburgerMenuVisible ? CloseIcon : MenuIcon}
      iconFontSize={size}
      onClick={() => toggleHamburgerMenu()}
      mobileIconColor={mobileIconColor}
    />
  )
}

export default HamburgerIcon
