import { useTranslation } from 'next-i18next'

import { AccountHierarchyChangeParent } from '@/components/b2b'
import { KiboDialog } from '@/components/common'

import { B2BAccount } from '@/lib/gql/types'

interface AccountHierarchyChangeParentDialogProps {
  accounts: B2BAccount[]
  b2BAccount: B2BAccount
  formTitle?: string
  onSave: (accountId: number, parentAccountId: number) => void
  onClose: () => void
}

const AccountHierarchyChangeParentDialog = (props: AccountHierarchyChangeParentDialogProps) => {
  const { t } = useTranslation('common')
  const { accounts, b2BAccount, formTitle = t('edit-child-account'), onSave, onClose } = props

  return (
    <KiboDialog
      showCloseButton
      Title={formTitle}
      showContentTopDivider={false}
      showContentBottomDivider={false}
      Actions={''}
      Content={
        <AccountHierarchyChangeParent
          accounts={accounts}
          b2BAccount={b2BAccount}
          onSave={onSave}
          onClose={onClose}
        />
      }
      customMaxWidth="45rem"
      onClose={onClose}
    />
  )
}

export default AccountHierarchyChangeParentDialog
