import React from 'react'

// Common component mocks used across multiple test files
export const FullWidthDividerMock = () => <div data-testid="full-width-divider-component" />

export const MyProfileMock = () => <div data-testid="my-profile-component" />

export const PaymentMethodMock = () => <div data-testid="payment-method-component" />

export const AddressBookMock = () => <div data-testid="address-book-component" />

// Mock setup functions
export const setupCommonMocks = () => {
  jest.mock('@/lib/helpers/hasPermission', () => ({
    hasAnyPermission: jest.fn(() => true),
  }))
}
