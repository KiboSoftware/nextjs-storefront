import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductQuickViewDialog.stories'
import { ModalContextProvider } from '@/context'
const {
  Common,
  B2BQuickViewDialogWithCart,
  B2BQuickViewDialogWithList,
  B2BQuickViewDialogWithQuote,
} = composeStories(stories)

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

  it('should render component with cart', async () => {
    render(<B2BQuickViewDialogWithCart {...B2BQuickViewDialogWithCart?.args} />, {
      wrapper: ModalContextProvider,
    })
    const title = screen.getByText(B2BQuickViewDialogWithCart?.args?.dialogProps?.title)
    const closeIcon = screen.getByRole('button', {
      name: B2BQuickViewDialogWithCart?.args?.dialogProps?.cancel,
    })
    const addItemToCart = screen.getByRole('button', {
      name: B2BQuickViewDialogWithCart?.args?.dialogProps?.addItemToCart,
    })

    expect(title).toBeVisible()
    expect(closeIcon).toBeVisible()
    expect(addItemToCart).toBeVisible()
  })

  it('should render component with list', async () => {
    render(<B2BQuickViewDialogWithList {...B2BQuickViewDialogWithList?.args} />, {
      wrapper: ModalContextProvider,
    })
    const title = screen.getByText(B2BQuickViewDialogWithList?.args?.dialogProps?.title)
    const cancel = screen.getByRole('button', {
      name: B2BQuickViewDialogWithList?.args?.dialogProps?.cancel,
    })
    const addItemToList = screen.getByRole('button', {
      name: B2BQuickViewDialogWithList?.args?.dialogProps?.addItemToList,
    })

    expect(title).toBeVisible()
    expect(cancel).toBeVisible()
    expect(addItemToList).toBeVisible()
  })

  it('should render component with quote', async () => {
    render(<B2BQuickViewDialogWithQuote {...B2BQuickViewDialogWithQuote?.args} />, {
      wrapper: ModalContextProvider,
    })
    const title = screen.getByText(B2BQuickViewDialogWithQuote?.args?.dialogProps?.title)
    const cancel = screen.getByRole('button', {
      name: B2BQuickViewDialogWithQuote?.args?.dialogProps?.cancel,
    })
    const addItemToQuote = screen.getByRole('button', {
      name: B2BQuickViewDialogWithQuote?.args?.dialogProps?.addItemToQuote,
    })

    expect(title).toBeVisible()
    expect(cancel).toBeVisible()
    expect(addItemToQuote).toBeVisible()
  })
})
