import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { useAuthContext } from '@/context'
import type { IconProps } from '@/lib/types'

interface AccountIconProps extends IconProps {
  onAccountIconClick: () => void
  isCSR: boolean
}

const AccountIcon = ({ size, isElementVisible, isCSR, onAccountIconClick }: AccountIconProps) => {
  const { isAuthenticated, user } = useAuthContext()
  const { t } = useTranslation('common')

  return (
    <>
      {!isCSR && (
        <HeaderAction
          title={isAuthenticated && user?.firstName ? `${t('hi')}, ${user?.firstName}` : ''}
          subtitle={isAuthenticated ? t('go-to-my-account') : t('log-in')}
          icon={AccountCircleIcon}
          iconFontSize={size}
          isElementVisible={isElementVisible}
          onClick={onAccountIconClick}
        />
      )}
      {isCSR && (
        <HeaderAction
          title={user?.firstName ? `${t('hi')}, ${user?.firstName}` : ''}
          icon={AccountCircleIcon}
          iconFontSize={size}
          isElementVisible={isElementVisible}
          isCSR={isCSR}
        />
      )}
    </>
  )
}

export default AccountIcon
