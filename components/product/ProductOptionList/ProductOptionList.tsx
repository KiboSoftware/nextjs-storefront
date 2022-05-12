import ProductOption from '@/components/product/ProductOption/ProductOption'

import type { CrProductOption } from '@/lib/gql/types'

interface ProductOptionListProps {
  options: CrProductOption[]
}

const ProductOptionList = (props: ProductOptionListProps) => {
  const { options = [] } = props

  return (
    <>
      {options.map((option: CrProductOption, index: number) => (
        <ProductOption key={index} option={option} fontWeight="bold" />
      ))}
    </>
  )
}

export default ProductOptionList
