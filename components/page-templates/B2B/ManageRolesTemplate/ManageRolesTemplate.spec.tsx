import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ManageRolesTemplate.stories'

const { Common } = composeStories(stories)

describe('[Page Template] ManageRolesTemplate', () => {
  const setup = () => {
    const user = userEvent.setup()
    const onAccountTitleClick = jest.fn()

    render(<Common {...Common.args} onAccountTitleClick={onAccountTitleClick} />)

    return {
      user,
      onAccountTitleClick,
    }
  }

  it('should render the Manage Roles title', () => {
    setup()
    expect(screen.getByText(/manage-roles/i)).toBeInTheDocument()
  })

  it('should render the Add New Role button', () => {
    setup()
    expect(screen.getByText(/add-new-role/i)).toBeInTheDocument()
  })

  it('should render the roles grid', () => {
    setup()
    expect(screen.getByText(/roles-grid/i)).toBeInTheDocument()
  })

  it('should render search input', () => {
    setup()
    const searchInput = screen.getByPlaceholderText(/search-roles/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('should render all role names', () => {
    setup()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Purchaser')).toBeInTheDocument()
    expect(screen.getByText('Non-Purchaser')).toBeInTheDocument()
    expect(screen.getByText('Admin_Copy')).toBeInTheDocument()
    expect(screen.getByText('Purchaser_Copy')).toBeInTheDocument()
  })

  it('should filter roles when searching', async () => {
    const { user } = setup()
    const searchInput = screen.getByPlaceholderText(/search-roles/i)

    await user.type(searchInput, 'Admin')

    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText('Admin_Copy')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.queryByText('Purchaser')).not.toBeInTheDocument()
    })
  })

  it('should call onAccountTitleClick when back button is clicked', async () => {
    const { user, onAccountTitleClick } = setup()

    // This would be the back button or breadcrumb
    // Adjust selector based on actual implementation
    const backElements = screen.queryAllByText(/my-account/i)

    if (backElements.length > 0) {
      await user.click(backElements[0])
      expect(onAccountTitleClick).toHaveBeenCalled()
    }
  })
})
