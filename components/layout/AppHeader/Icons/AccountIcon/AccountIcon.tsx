import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { useAuthContext } from '@/context'
import type { IconProps } from '@/lib/types'

interface AccountIconProps extends IconProps {
  onAccountIconClick: () => void
}

const AccountIcon = ({ size, onAccountIconClick }: AccountIconProps) => {
  const { isAuthenticated, user } = useAuthContext()
  const { t } = useTranslation('common')

  return (
    <HeaderAction
      title={isAuthenticated ? `${t('hi')}, ${user?.firstName}` : t('my-account')}
      subtitle={isAuthenticated ? t('go-to-my-account') : t('log-in')}
      icon={AccountCircleIcon}
      iconFontSize={size}
      onClick={onAccountIconClick}
    />
  )
}

export default AccountIcon
