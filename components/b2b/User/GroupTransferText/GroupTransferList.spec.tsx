import { composeStories } from '@storybook/testing-react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './GroupTransferList.stories'

const { Common } = composeStories(stories)

describe('[component] Group Transfer List', () => {
  const setup = (isSubmitted = false) => {
    const user = userEvent.setup()
    const mockOnAddRemoveGroups = jest.fn()

    render(
      <Common
        {...Common?.args}
        isSubmitting={isSubmitted}
        onAddRemoveGroups={mockOnAddRemoveGroups}
      />
    )
    return { user, mockOnAddRemoveGroups }
  }

  it('should render group transfer list', () => {
    setup()

    expect(screen.getByText('all-groups')).toBeInTheDocument()
    expect(screen.getByText('selected-groups')).toBeInTheDocument()
    expect(screen.getByText('Manager')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('moves all items to right when move all right button is clicked', () => {
    const { user } = setup()

    const moveAllRightButton = screen.getByRole('button', { name: 'move all right' })
    user.click(moveAllRightButton)

    const rightListItems = screen.getAllByRole('listitem')
    expect(rightListItems).toHaveLength(3)
  })

  it('moves all items to left when move all left button is clicked', () => {
    const { user } = setup()

    const moveAllLeftButton = screen.getByRole('button', { name: 'move all left' })
    user.click(moveAllLeftButton)

    const leftListItems = screen.getAllByRole('listitem')
    expect(leftListItems).toHaveLength(3)
  })

  it('moves checked items to right when move selected right button is clicked', async () => {
    const { user } = setup()

    const group1Item = screen.getByText('Manager')
    await user.click(group1Item)
    const group2Item = screen.getByText('Admin')
    await user.click(group2Item)

    const moveSelectedRightButton = screen.getByRole('button', { name: 'move selected right' })
    await user.click(moveSelectedRightButton)

    const moveSelectedLeftButton = screen.getByRole('button', { name: 'move selected left' })
    expect(moveSelectedLeftButton).toBeDisabled()

    const rightListItems = screen.getAllByRole('listitem')
    expect(rightListItems).toHaveLength(2)
  })

  it('submits added and removed groups correctly when submitting', async () => {
    const { user, mockOnAddRemoveGroups } = setup(true)
    const group1Item = screen.getByText('Admin')
    await user.click(group1Item)

    const moveSelectedRightButton = screen.getByRole('button', { name: 'move selected right' })
    await user.click(moveSelectedRightButton)

    const addGroups = [{ accountId: 1100, code: 'admin', name: 'Admin', description: 'admin' }]
    expect(mockOnAddRemoveGroups).toHaveBeenCalledWith({
      addGroups: addGroups,
      removeGroups: [],
    })
  })
})
