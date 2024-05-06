import React from 'react'

import { KiboDialog } from '@/components/common'
import { InstantDeliveryTemplate } from '@/components/instant-delivery'

const InstantDeliveryDialog = (props: any) => {
  const { closeModal, isOpen, handleInstantDelivery } = props
  const DialogArgs = {
    isOpen: isOpen,
    Content: <InstantDeliveryTemplate onInstantDelivery={handleInstantDelivery} />,
    showContentTopDivider: false,
    showContentBottomDivider: false,

    isDialogCentered: true,
    customMaxWidth: '34.19rem',
    onClose: closeModal,
  }
  return <KiboDialog {...DialogArgs} />
}

export default InstantDeliveryDialog
