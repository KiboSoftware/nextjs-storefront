import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './PurchaseOrderForm.stories' // import all stories from the stories file
const { Common, SinglePaymentTermPurchaseOrderForm } = composeStories(stories)

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()
const onFormStatusChangeMock = jest.fn()
const onSavePurchaseDataMock = jest.fn()

const user = userEvent.setup()

const KiboTextBoxMock = () => (
  <input data-testid="text-box-mock" onChange={onChangeMock} onBlur={onBlurMock} />
)
jest.mock('../../common/KiboTextBox/KiboTextBox', () => () => KiboTextBoxMock())

describe('[components] PurchaseOrderForm', () => {
  it('should render component', () => {
    render(
      <Common
        {...Common.args}
        onSavePurchaseData={onSavePurchaseDataMock}
        onFormStatusChange={onFormStatusChangeMock}
      />
    )

    const purchaseOrderComponent = screen.getByTestId('purchase-order-form')
    const textBoxList = screen.getByTestId('text-box-mock')
    const creditLimit = screen.getByText(/credit-limit/i)
    const availableBalance = screen.getByText(/available-balance/i)

    expect(purchaseOrderComponent).toBeInTheDocument()
    expect(textBoxList).toBeInTheDocument()
    expect(creditLimit).toBeInTheDocument()
    expect(availableBalance).toBeInTheDocument()
    expect(screen.getAllByText(/currency/i)[0]).toBeInTheDocument()
  })

  it('should render single payment term for single payment Terms', () => {
    render(<SinglePaymentTermPurchaseOrderForm {...SinglePaymentTermPurchaseOrderForm.args} />)
    const singlePaymentTerm = SinglePaymentTermPurchaseOrderForm.args
      ?.purchaseOrderPaymentTerms?.[0]?.description as string
    expect(screen.getByText(singlePaymentTerm)).toBeInTheDocument()
  })

  it('should call onFormStatusChangeMock when users type purchase order number', async () => {
    render(
      <SinglePaymentTermPurchaseOrderForm
        {...SinglePaymentTermPurchaseOrderForm.args}
        validateForm={false}
        onSavePurchaseData={onSavePurchaseDataMock}
        onFormStatusChange={onFormStatusChangeMock}
      />
    )
    const textBox = screen.getByTestId('text-box-mock')

    user.type(textBox, '123')
    await waitFor(() => {
      expect(onFormStatusChangeMock).toBeCalled()
    })
  })
})
