import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ViewAccountDetails.stories'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

const { Common } = composeStories(stories)

const b2bAccount = b2BAccountHierarchyResult?.accounts?.[1]

describe('ViewAccountDetails', () => {
  it('should render component', async () => {
    render(<Common />)

    const accountIDHeading = screen.getByText('b2b-account-id')
    expect(accountIDHeading).toBeVisible()
    const accountIDValue = screen.getByText(b2bAccount?.id)
    expect(accountIDValue).toBeVisible()

    const parentAccountHeading = screen.getByText('parent-account')
    expect(parentAccountHeading).toBeVisible()
    const parentAccountValue = screen.getByText(b2bAccount?.parentAccountId as number)
    expect(parentAccountValue).toBeVisible()

    const companyNameHeading = screen.getByText('company-name')
    expect(companyNameHeading).toBeVisible()
    const companyNameValue = screen.getByText(b2bAccount?.companyOrOrganization)
    expect(companyNameValue).toBeVisible()

    const taxIDHeading = screen.getByText('tax-id optional')
    expect(taxIDHeading).toBeVisible()
    const taxIDValue = screen.getByText(b2bAccount?.taxId as string)
    expect(taxIDValue).toBeVisible()

    const firstNameHeading = screen.getByText('user-first-name')
    expect(firstNameHeading).toBeVisible()
    const firstNameValue = screen.getByText(b2bAccount?.users?.[0]?.firstName)
    expect(firstNameValue).toBeVisible()

    const lastNameHeading = screen.getByText('user-last-name')
    expect(lastNameHeading).toBeVisible()
    const lastNameValue = screen.getByText(b2bAccount?.users?.[0]?.lastName as string)
    expect(lastNameValue).toBeVisible()

    const emailAddressHeading = screen.getByText('email')
    expect(emailAddressHeading).toBeVisible()
    const emailAddressValue = screen.getByText(b2bAccount?.users?.[0]?.emailAddress)
    expect(emailAddressValue).toBeVisible()
  })
})
