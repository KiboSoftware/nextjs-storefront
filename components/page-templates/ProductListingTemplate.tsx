import React from 'react'
import ProductList from '../product/ProductList'

const ProductListingTemplate = (props: any) => {
  //{ productSearch }: { productSearch: any }) => {
  console.log(`test`, props.items)
  return (
    <>
      <h1>Search</h1>
      <ProductList items={props.items} />
    </>
  )
}

export default ProductListingTemplate
