import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { useAuthContext } from '@/context'
import type { IconProps } from '@/lib/types'

interface AccountIconProps extends IconProps {
  onAccountIconClick: () => void
  isCSR: boolean
  customerName: string
}

const AccountIcon = ({
  size,
  isElementVisible,
  isCSR,
  customerName,
  onAccountIconClick,
}: AccountIconProps) => {
  const { isAuthenticated, user } = useAuthContext()
  const { t } = useTranslation('common')
  const userName = isAuthenticated ? user?.firstName : isCSR ? customerName : ''

  return (
    <>
      <HeaderAction
        isCSR={isCSR}
        title={userName ? `${t('hi')}, ${userName}` : ''}
        subtitle={isCSR ? '' : isAuthenticated ? t('go-to-my-account') : t('log-in')}
        icon={AccountCircleIcon}
        iconFontSize={size}
        isElementVisible={isElementVisible}
        onClick={onAccountIconClick}
      />
    </>
  )
}

export default AccountIcon
