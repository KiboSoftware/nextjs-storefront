import React from 'react'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import Actions from '@/components/layout/RegisterAccount/Actions/Actions'
import Content from '@/components/layout/RegisterAccount/Content/Content'
import Title from '@/components/layout/RegisterAccount/Title/Title'

interface RegisterAccountModalProps {
  isOpen: boolean
  isCenteredDialog: boolean
  onLoginModalOpen: () => void
  onClose: () => void
}

const RegisterAccountModal = (props: RegisterAccountModalProps) => {
  const { isOpen = false, isCenteredDialog, onLoginModalOpen, onClose } = props

  const DialogArgs = {
    isOpen,
    Title: <Title />,
    Content: <Content />,
    showContentTopDivider: true,
    showContentBottomDivider: true,
    Actions: <Actions onLoginToYourAccount={onLoginModalOpen} />,
    isCenteredDialog: isCenteredDialog,
    customMaxWidth: '32.375rem',
    onClose: onClose,
  }

  return <KiboDialog {...DialogArgs} />
}

export default RegisterAccountModal
