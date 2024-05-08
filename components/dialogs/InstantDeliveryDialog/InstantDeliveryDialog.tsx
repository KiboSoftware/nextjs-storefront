import React from 'react'

import { KiboDialog } from '@/components/common'
import { InstantDeliveryTemplate } from '@/components/instant-delivery'
import { useModalContext } from '@/context'
const InstantDeliveryDialog = (props: any) => {
  const { isOpen, handleInstantDelivery, deliveryAddress } = props
  const { closeModal } = useModalContext()
  const DialogArgs = {
    isOpen: isOpen,
    Content: (
      <InstantDeliveryTemplate
        initialDeliveryAddress={deliveryAddress}
        onInstantDelivery={handleInstantDelivery}
      />
    ),
    showContentTopDivider: false,
    showContentBottomDivider: false,

    isDialogCentered: true,
    customMaxWidth: '34.19rem',
    onClose: closeModal,
  }
  return <KiboDialog {...DialogArgs} />
}

export default InstantDeliveryDialog
