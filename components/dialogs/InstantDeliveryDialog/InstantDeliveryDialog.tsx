import React from 'react'

import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { InstantDeliveryTemplate } from '@/components/instant-delivery'
import { useModalContext } from '@/context'
const InstantDeliveryDialog = (props: any) => {
  const { t } = useTranslation('common')
  const { isOpen, handleInstantDelivery, instantDelivery, isAddressDisabled = false } = props
  const { closeModal } = useModalContext()
  const DialogArgs = {
    Title: t('select-delivery-window-and-address'),
    isOpen: isOpen,
    Content: (
      <InstantDeliveryTemplate
        initialInstantDelivery={instantDelivery}
        onInstantDelivery={handleInstantDelivery}
        isAddressDisabled={isAddressDisabled}
      />
    ),
    showContentTopDivider: true,
    showContentBottomDivider: false,

    isDialogCentered: true,
    customMaxWidth: '34.19rem',
    onClose: closeModal,
  }
  return <KiboDialog {...DialogArgs} />
}

export default InstantDeliveryDialog
