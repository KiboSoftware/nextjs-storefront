import React from 'react'

import { useRouter } from 'next/router'

import { KiboDialog } from '@/components/common'
import Actions from '@/components/dialogs/AddToCartConfirmation/Actions/Actions'
import Content from '@/components/dialogs/AddToCartConfirmation/Content/Content'
import Title from '@/components/dialogs/AddToCartConfirmation/Title/Title'

import type { CrCartItem as CartItemType } from '@/lib/gql/types'

interface CartDetailsProps {
  cartItem: CartItemType
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
    router.push('/cart')
    closeModal()
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
