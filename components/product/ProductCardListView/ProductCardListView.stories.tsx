import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductCardListView from './ProductCardListView'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Product/ProductCardListView',
  component: ProductCardListView,
} as ComponentMeta<typeof ProductCardListView>

const Template: ComponentStory<typeof ProductCardListView> = (args) => (
  <Box
    sx={{
      width: {
        xs: '100%',
        md: '60%',
      },
    }}
  >
    <ProductCardListView {...args} />
  </Box>
)

export const Common = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
  link: '/product/test-123',
  price: '$19.98',
  title: 'This is a product',
  badge: 'Best Seller',
  productDescription: `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
  deserunt mollit anim id est laborum`,
}
