import React, { useState } from 'react'

import Loading from '../components/common/Loading/Loading'
import Checkout from '../components/page-templates/Checkout/Checkout'

const CheckoutPage = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }
  return (
    <div>
      <Loading />
      <Checkout />
    </div>
  )
}

export default CheckoutPage
