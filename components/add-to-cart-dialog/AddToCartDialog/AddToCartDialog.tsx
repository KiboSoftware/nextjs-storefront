import React from 'react'

import { useRouter } from 'next/router'

import Actions from '../Actions/Actions'
import Content from '../Content/Content'
import Title from '../Title/Title'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'

import type { CartItem as CartItemType } from '@/lib/gql/types'

interface CartDetailsProps {
  cartItem: CartItemType
  isOpen: boolean
  isDialogCentered: boolean
  closeModal: () => void
}

// Component
const AddToCartDialog = (props: CartDetailsProps) => {
  const { cartItem, closeModal, isDialogCentered } = props
  const contentArgs = {
    cartItem,
  }

  const router = useRouter()

  const handleGoToCart = () => {
    closeModal()
    router.push('/cart')
  }
  const handleContinueShopping = () => {
    closeModal()
  }

  const DialogArgs = {
    Title: <Title />,
    Content: <Content {...contentArgs} />,
    showContentTopDivider: true,
    showContentBottomDivider: false,
    Actions: <Actions onGoToCart={handleGoToCart} onContinueShopping={handleContinueShopping} />,
    isDialogCentered: isDialogCentered,
    customMaxWidth: '32.375rem',
    onClose: () => closeModal(),
  }

  return <KiboDialog {...DialogArgs} />
}
export default AddToCartDialog
