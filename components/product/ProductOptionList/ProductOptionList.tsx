import ProductOption from '@/components/product/ProductOption/ProductOption'

import type { Maybe, CrProductOption } from '@/lib/gql/types'

interface ProductOptionListProps {
  options: Maybe<CrProductOption>[]
}

const ProductOptionList = (props: ProductOptionListProps) => {
  const { options = [] } = props

  return (
    <>
      {options.map((option: Maybe<CrProductOption>, index: number) => (
        <ProductOption key={`${option?.stringValue}-${index}`} option={option} />
      ))}
    </>
  )
}

export default ProductOptionList
