import { useTranslation } from 'next-i18next'

import { AccountHierarchyAddForm } from '@/components/b2b'
import { KiboDialog } from '@/components/common'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

import { B2BAccount } from '@/lib/gql/types'

interface AccountHierarchyAddFormDialogProps {
  accounts?: B2BAccount[]
  isAddingAccountToChild: boolean
  formTitle?: string
  onSave: (data: CreateCustomerB2bAccountParams) => void
  onClose: () => void
}

const AccountHierarchyAddFormDialog = (props: AccountHierarchyAddFormDialogProps) => {
  const { t } = useTranslation('common')
  const {
    accounts,
    isAddingAccountToChild,
    formTitle = t('add-child-account'),
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
        <AccountHierarchyAddForm
          accounts={accounts}
          isAddingAccountToChild={isAddingAccountToChild}
          onSave={onSave}
          onClose={onClose}
        />
      }
      customMaxWidth="55rem"
      onClose={onClose}
    />
  )
}

export default AccountHierarchyAddFormDialog
