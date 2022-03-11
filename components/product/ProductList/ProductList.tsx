import React from 'react'

import { Grid, Pagination, Card } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import FlexBox from 'components/FlexBox'

const selectProducts = (items: any = []): Array<any> => {
  return items.map((product: any) => {
    const imageUrl = product.content?.productImages[0]?.imageUrl
    return {
      productCode: product.productCode,
      name: product.content?.productName,
      imageUrl: imageUrl ? `https:${imageUrl}` : null,
      price: product.price?.price,
    }
  })
}
const ProductList = (props: any) => {
  const { items = [], totalCount, pageSize } = props
  const products = selectProducts(items)
  return (
    <div>
      <Grid container spacing={8}>
        {products.map((item: any, ind: number) => (
          <Link key={ind} href={`/product/${item.productCode}`} passHref>
            <Grid item lg={3} sm={6} xs={12} key={ind}>
              <Card>
                <FlexBox justifyContent="center" mb={6}>
                  {item.imageUrl && (
                    <Image width={200} height={150} src={item.imageUrl} alt="image" />
                  )}
                </FlexBox>
                <h3>{item.name}</h3>
                <h5>{item.price}</h5>
              </Card>
            </Grid>
          </Link>
        ))}
      </Grid>

      <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt={4}>
        <h5>
          Showing {pageSize} of {totalCount} Products
        </h5>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBox>
    </div>
  )
}

export default ProductList
