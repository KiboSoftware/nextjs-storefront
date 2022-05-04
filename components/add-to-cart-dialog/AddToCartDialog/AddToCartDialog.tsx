import React, { useState } from 'react'

import { useRouter } from 'next/router'

import Actions from '../Actions/Actions'
import Content from '../Content/Content'
import Title from '../Title/Title'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'

import type { CartItem as CartItemType } from '@/lib/gql/types'

interface CartDetailsProps {
  cartItem: CartItemType
  isOpen: boolean
  isCenteredDialog: boolean
  onClose: () => void
}

// Component
const AddToCartDialog = (props: CartDetailsProps) => {
  const { cartItem, isOpen = false, isCenteredDialog, onClose } = props

  const contentArgs = {
    cartItem,
  }

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isOpen)
  const router = useRouter()

  const handleGoToCart = () => {
    setIsDialogOpen(false)
    router.push('/cart')
  }
  const handleContinueShopping = () => {
    setIsDialogOpen(false)
  }

  const DialogArgs = {
    isOpen: isDialogOpen,
    Title: <Title />,
    Content: <Content {...contentArgs} />,
    showContentTopDivider: true,
    showContentBottomDivider: false,
    Actions: <Actions onGoToCart={handleGoToCart} onContinueShopping={handleContinueShopping} />,
    isCenteredDialog: isCenteredDialog,
    customMaxWidth: '32.375rem',
    onClose: onClose,
  }

  return <KiboDialog {...DialogArgs} />
}
export default AddToCartDialog
