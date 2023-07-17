import React from 'react'

import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import UserForm from '@/components/my-account/User/UserForm/UserForm'

import { B2BUser } from '@/lib/gql/types'
interface UserFormDialogProps {
  isEditMode: boolean
  isUserFormInDialog?: boolean
  formTitle?: string
  b2BUser?: B2BUser
  onSave: (data: B2BUser) => void
  onClose: () => void
}
const UserFormDialog = (props: UserFormDialogProps) => {
  const { t } = useTranslation('common')
  const {
    formTitle = t('add-new-user'),
    b2BUser,
    isEditMode,
    isUserFormInDialog = true,
    onSave,
    onClose,
  } = props

  return (
    <KiboDialog
      showCloseButton={false}
      Title={formTitle}
      showContentTopDivider={false}
      showContentBottomDivider={false}
      Actions={''}
      Content={
        <UserForm
          isEditMode={isEditMode}
          isUserFormInDialog={isUserFormInDialog}
          b2BUser={b2BUser}
          onSave={onSave}
          onClose={onClose}
        />
      }
      customMaxWidth="35rem"
      onClose={onClose}
    />
  )
}
export default UserFormDialog
