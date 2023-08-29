import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ViewUserDetail.stories'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'

const { Common } = composeStories(stories)

const b2BUser = customerB2BUserForPage0Mock?.items?.[0]
describe('ViewUserDetail', () => {
  const status = b2BUser?.isActive ? 'active' : 'in-active'

  it('should render component', async () => {
    render(<Common />)

    const emailAddressHeading = screen.getByText('email-address')
    expect(emailAddressHeading).toBeVisible()
    const emailAddressValue = screen.getByText(b2BUser?.emailAddress as string)
    expect(emailAddressValue).toBeVisible()

    const firstNameHeading = screen.getByText('first-name')
    expect(firstNameHeading).toBeVisible()
    const firstNameValue = screen.getByText(b2BUser?.firstName as string)
    expect(firstNameValue).toBeVisible()

    const lastNameHeading = screen.getByText('last-name')
    expect(lastNameHeading).toBeVisible()
    const lastNameValue = screen.getByText(b2BUser?.lastName as string)
    expect(lastNameValue).toBeVisible()

    const roleHeading = screen.getByText('role')
    expect(roleHeading).toBeVisible()
    const roleValue = screen.getByText(b2BUser?.roles?.[0]?.roleName as string)
    expect(roleValue).toBeVisible()

    const statusHeading = screen.getByText('status')
    expect(statusHeading).toBeVisible()
    const statusValue = screen.getByText(status)
    expect(statusValue).toBeVisible()
  })
})
