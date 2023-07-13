import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import UserForm from '@/components/my-account/User/UserForm/UserForm'
import { useModalContext } from '@/context'

import { B2BUser } from '@/lib/gql/types'
interface UserFormDialogProps {
  isEditMode: boolean
  formTitle?: string
  b2BUser?: B2BUser
  onSave: (data: B2BUser) => void
  onClose: () => void
}
const UserFormDialog = (props: UserFormDialogProps) => {
  const { closeModal } = useModalContext()
  const { t } = useTranslation('common')
  const isAddressFormInDialog = true
  const { formTitle = t('add-new-user'), b2BUser, isEditMode, onSave, onClose } = props

  const [validateDialogForm, setValidateDialogForm] = useState<boolean>(false)

  const handleSave = (formData: B2BUser) => {
    onSave(formData)
  }

  const handleClose = () => {
    onClose()
    closeModal()
  }
  return (
    <KiboDialog
      showCloseButton
      Title={formTitle}
      showContentTopDivider={true}
      showContentBottomDivider={false}
      Actions={''}
      Content={
        <UserForm
          isEditMode={isEditMode}
          b2BUser={b2BUser}
          onSave={handleSave}
          onClose={handleClose}
        />
      }
      customMaxWidth="35rem"
      onClose={closeModal}
    />
  )
}
export default UserFormDialog
