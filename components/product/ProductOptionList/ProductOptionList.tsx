import React from 'react'

import ProductOption from '../ProductOption/ProductOption'

import type { CrProductOption } from '@/lib/gql/types'

interface ProductOptionListProps {
  options: CrProductOption[]
}

const ProductOptionList = (props: ProductOptionListProps) => {
  const { options = [] } = props

  return (
    <>
      {options.map((option: CrProductOption, index: number) => (
        <ProductOption key={index} option={option} />
      ))}
    </>
  )
}

export default ProductOptionList
