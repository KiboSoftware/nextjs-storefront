import React from 'react'

import ProductOption from '../ProductOption/ProductOption'

import type { CrProductOption } from '@/lib/gql/types'

interface ProductOptionsProps {
  options: CrProductOption[]
}

const ProductOptions = (props: ProductOptionsProps) => {
  const { options } = props

  return (
    <>
      {options.map((option: CrProductOption, index: number) => (
        <ProductOption key={index} option={option} />
      ))}
    </>
  )
}

export default ProductOptions
