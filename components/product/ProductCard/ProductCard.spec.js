import React from 'react'
import { render } from '@testing-library/react'
import ProductCard from './ProductCard'

it('Renders Product Card', () => {
  const props = {
    image: `https://cdn-tp3.mozu.com/24645-37138/cms/37138/files/42d958c7-94d3-46be-812a-488601cf0c04?max=155&_mzcb=_1618890579000`,
    link: '/product/test-123',
    price: '$9.99',
    title: 'This is a product',
  }
  const { getByText } = render(<ProductCard {...props} />)

  expect(getByText(props.price)).toBeTruthy()
})
