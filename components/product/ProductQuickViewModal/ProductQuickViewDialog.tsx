import React from 'react'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { ProductDetailTemplate } from '@/components/page-templates'
import { useModalContext } from '@/context/ModalContext'
import type { ProductCustom } from '@/lib/types'

interface ProductQuickViewDialogProps {
  product: ProductCustom
  isQuickViewModal?: boolean
}

const ProductQuickViewDialog = (props: ProductQuickViewDialogProps) => {
  const { product, isQuickViewModal } = props
  const { closeModal } = useModalContext()

  return (
    <KiboDialog
      showCloseButton
      showContentTopDivider={false}
      showContentBottomDivider={false}
      Actions={''}
      Content={<ProductDetailTemplate product={product} isQuickViewModal={isQuickViewModal} />}
      customMaxWidth="80rem"
      onClose={closeModal}
    />
  )
}

export default ProductQuickViewDialog
