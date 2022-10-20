import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { useAuthContext } from '@/context'

type IconProps = {
  size: 'small' | 'medium' | 'large'
  handleAccountIconClick: () => void
}

const AccountIcon = ({ size, handleAccountIconClick }: IconProps) => {
  const { isAuthenticated, user } = useAuthContext()
  const { t } = useTranslation('common')

  return (
    <HeaderAction
      title={isAuthenticated ? `${t('hi')}, ${user?.firstName}` : t('my-account')}
      subtitle={isAuthenticated ? t('go-to-my-account') : t('log-in')}
      icon={AccountCircleIcon}
      iconFontSize={size}
      onClick={handleAccountIconClick}
    />
  )
}

export default AccountIcon
