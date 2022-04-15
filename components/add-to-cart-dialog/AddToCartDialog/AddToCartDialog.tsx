import React, { useState } from 'react'

import { useRouter } from 'next/router'

import Actions from '../Actions/Actions'
import Content from '../Content/Content'
import Title from '../Title/Title'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'

interface CartDetailsProps {
  fullfillmentOption: string
  quantity: number
  subtotal: number
  tax: number
  total: number
  isOpen: boolean
  isCenteredDialog: boolean
  onClose: () => void
}

// Component
const AddToCart = (props: CartDetailsProps) => {
  const {
    fullfillmentOption,
    quantity,
    subtotal,
    tax,
    total,
    isOpen = false,
    isCenteredDialog,
    onClose,
  } = props

  const contentArgs = {
    fullfillmentOption,
    quantity,
    subtotal,
    tax,
    total,
  }

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isOpen)
  const router = useRouter()

  const handleAddToCart = () => {
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
    dividers: false,
    Actions: <Actions onAddToCart={handleAddToCart} onContinueShopping={handleContinueShopping} />,
    isCenteredDialog: isCenteredDialog,
    customMaxWidth: '518px',
    onClose: onClose,
  }

  return <KiboDialog {...DialogArgs} />
}
export default AddToCart
