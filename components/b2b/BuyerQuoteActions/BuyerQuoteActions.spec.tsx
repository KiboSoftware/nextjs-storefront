import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { cleanup, render, screen } from '@testing-library/react'

import * as stories from './BuyerQuoteActions.stories'

const { InReview, ReadyForCheckout, Completed, Expired } = composeStories(stories)

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn(() => true),
}))

const mockProps = {
  hasDraft: false,
  mode: 'edit',
  isSubmitForApprovalEnabled: true,
  handleClearChanges: jest.fn(),
  handleEditQuote: jest.fn(),
  handleSubmitForApproval: jest.fn(),
  handleGotoCheckout: jest.fn(),
  handlePrint: jest.fn(),
}

const isHiddenEditQuoteButton = (Status: any, mode: string) => {
  render(<Status {...mockProps} mode={mode} />)
  const editQuoteButton = screen.queryByText('edit-quote')

  expect(editQuoteButton).not.toBeInTheDocument()
}

const isDisabledEditQuoteButton = (Status: any) => {
  render(<Status {...mockProps} mode={''} />)
  const editQuoteButton = screen.getByText('edit-quote')

  expect(editQuoteButton).toBeDisabled()
}

const isDisabledClearChangesButton = (Status: any) => {
  render(<Status {...mockProps} />)
  const clearChangesButton = screen.getByText('clear-changes')

  expect(clearChangesButton).toBeDisabled()
}

const isDisabledSubmitForApprovalButton = (Status: any) => {
  render(<Status {...mockProps} mode={'edit'} isSubmitForApprovalEnabled={false} />)
  const submitForApprovalButton = screen.getByText('submit-for-approval')

  expect(submitForApprovalButton).toBeDisabled()
}

afterEach(() => {
  cleanup()
})

describe('[components] - BuyerQuoteActions', () => {
  it('should disable clear changes button if quote is InReview/Completed status and quote is not in draft mode', () => {
    isDisabledClearChangesButton(InReview)

    cleanup()

    isDisabledClearChangesButton(Completed)
  })

  it('should not render clear changes button if quote is in view mode', () => {
    render(<InReview {...mockProps} mode="" />)
    const clearChangesButton = screen.queryByText('clear-changes')

    expect(clearChangesButton).not.toBeInTheDocument()
  })

  it('should disable edit quote button if quote is InReview/Completed/Expired status', () => {
    isDisabledEditQuoteButton(InReview)
    cleanup()
    isDisabledEditQuoteButton(Completed)
    cleanup()
    isDisabledEditQuoteButton(Expired)
  })

  it('should not render edit quote button if quote is in create/edit mode', () => {
    isHiddenEditQuoteButton(InReview, 'create')
    cleanup()

    isHiddenEditQuoteButton(InReview, 'edit')
    cleanup()

    isHiddenEditQuoteButton(Completed, 'create')
    cleanup()

    isHiddenEditQuoteButton(Completed, 'edit')
    cleanup()

    isHiddenEditQuoteButton(Expired, 'create')
    cleanup()

    isHiddenEditQuoteButton(Expired, 'edit')
  })

  it('should disable submit-for-approval button while editing InReview/Completed/Expired quotes & not in draft mode & all required values are present', () => {
    isDisabledSubmitForApprovalButton(InReview)
    cleanup()

    isDisabledSubmitForApprovalButton(Completed)
    cleanup()

    isDisabledSubmitForApprovalButton(Expired)
  })

  it('should show continue to checkout if in ReadyForCheckout state and not in draft mode', () => {
    render(<ReadyForCheckout {...mockProps} />)
    const continueToCheckoutButton = screen.getByText('continue-to-checkout')

    expect(continueToCheckoutButton).toBeVisible()
  })
})
