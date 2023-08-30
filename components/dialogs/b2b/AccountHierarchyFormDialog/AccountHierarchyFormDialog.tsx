import { useTranslation } from 'next-i18next'

import { AccountHierarchyForm } from '@/components/b2b'
import { KiboDialog } from '@/components/common'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

import { B2BAccount } from '@/lib/gql/types'

interface AccountHierarchyFormDialogProps {
  accounts?: B2BAccount[]
  isAddingAccountToChild: boolean
  isRequestAccount: boolean
  b2BAccount?: B2BAccount
  formTitle?: string
  primaryButtonText: string
  onSave: (data: CreateCustomerB2bAccountParams) => void
  onClose: () => void
}

const AccountHierarchyFormDialog = (props: AccountHierarchyFormDialogProps) => {
  const { t } = useTranslation('common')
  const {
    accounts,
    isAddingAccountToChild,
    isRequestAccount = false,
    b2BAccount,
    formTitle = t('add-child-account'),
    primaryButtonText,
    onSave,
    onClose,
  } = props

  return (
    <KiboDialog
      showCloseButton
      Title={formTitle}
      showContentTopDivider={false}
      showContentBottomDivider={false}
      Actions={''}
      Content={
        <AccountHierarchyForm
          accounts={accounts}
          b2BAccount={b2BAccount}
          isAddingAccountToChild={isAddingAccountToChild}
          isRequestAccount={isRequestAccount}
          primaryButtonText={primaryButtonText}
          onSave={onSave}
          onClose={onClose}
        />
      }
      customMaxWidth="55rem"
      onClose={onClose}
    />
  )
}

export default AccountHierarchyFormDialog
