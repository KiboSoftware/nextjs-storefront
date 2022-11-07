import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductQuickViewDialog.stories'
import { ModalContextProvider } from '@/context'
const { Common } = composeStories(stories)

const ProductDetailTemplateMock = () => <div data-testid="product-detail-template" />
jest.mock(
  '@/components/page-templates/ProductDetail/ProductDetailTemplate',
  () => () => ProductDetailTemplateMock()
)

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper: ModalContextProvider })
}

describe('[components] My ProductQuickView Dialog', () => {
  const setup = () => renderComponent()

  it('should render component', async () => {
    setup()
    const closeIcon = screen.getByRole('button', { name: 'close' })
    const productDetailTemplateComponent = screen.getByTestId('product-detail-template')

    expect(closeIcon).toBeVisible()
    expect(productDetailTemplateComponent).toBeInTheDocument()
  })
})
