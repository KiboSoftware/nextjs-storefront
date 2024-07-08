import { composeStories } from '@storybook/testing-react'
import { render, within, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './GroupTransferList.stories'

const { Common } = composeStories(stories)

describe('[component] Group Transfer List', () => {
  const setup = (isSubmitted = false) => {
    const user = userEvent.setup()
    const mockOnAddRemoveGroups = jest.fn()

    const { rerender } = render(
      <Common
        {...Common?.args}
        isSubmitting={isSubmitted}
        onAddRemoveGroups={mockOnAddRemoveGroups}
      />
    )
    return { user, rerender, mockOnAddRemoveGroups }
  }

  it('should render group transfer list', () => {
    setup()

    expect(screen.getByText('all-groups')).toBeInTheDocument()
    expect(screen.getByText('selected-groups')).toBeInTheDocument()
    expect(screen.getByText('Manager')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('moves all items to right when move all right button is clicked', async () => {
    const { user } = setup()

    const moveAllRightButton = screen.getByRole('button', { name: 'move all right' })
    await user.click(moveAllRightButton)

    const rightGroupContainer = screen.getByTestId('selectedGroups')
    const rightListItems = within(rightGroupContainer).getAllByRole('listitem')

    expect(rightListItems).toHaveLength(3)
    expect(rightListItems[0]).toHaveTextContent('Employee')
    expect(rightListItems[1]).toHaveTextContent('Manager')
    expect(rightListItems[2]).toHaveTextContent('Admin')
  })

  it('moves all items to left when move all left button is clicked', async () => {
    const { user } = setup()

    const moveAllLeftButton = screen.getByRole('button', { name: 'move all left' })
    await user.click(moveAllLeftButton)

    const leftGroupContainer = screen.getByTestId('allGroups')
    const leftListItems = within(leftGroupContainer).getAllByRole('listitem')
    expect(leftListItems).toHaveLength(3)
    expect(leftListItems[0]).toHaveTextContent('Manager')
    expect(leftListItems[1]).toHaveTextContent('Admin')
    expect(leftListItems[2]).toHaveTextContent('Employee')
  })

  it('moves checked items to left when move selected left button is clicked', async () => {
    const { user } = setup()

    const group1Item = screen.getByText('Employee')
    await user.click(group1Item)

    const moveSelectedLeftButton = screen.getByRole('button', { name: 'move selected left' })
    await user.click(moveSelectedLeftButton)

    const moveSelectedRightButton = screen.getByRole('button', { name: 'move selected right' })
    expect(moveSelectedRightButton).toBeDisabled()

    const leftGroupContainer = screen.getByTestId('allGroups')
    const leftListItems = within(leftGroupContainer).getAllByRole('listitem')

    expect(leftListItems).toHaveLength(3)
    expect(leftListItems[2]).toHaveTextContent('Employee')
  })

  it('moves checked items to right when move selected right button is clicked', async () => {
    const { user } = setup()

    const group1Item = screen.getByText('Manager')
    await user.click(group1Item)

    const moveSelectedRightButton = screen.getByRole('button', { name: 'move selected right' })
    await user.click(moveSelectedRightButton)

    const moveSelectedLeftButton = screen.getByRole('button', { name: 'move selected left' })
    expect(moveSelectedLeftButton).toBeDisabled()

    const rightGroupContainer = screen.getByTestId('selectedGroups')
    const rightListItems = within(rightGroupContainer).getAllByRole('listitem')

    expect(rightListItems).toHaveLength(2)
    expect(rightListItems[1]).toHaveTextContent('Manager')
  })

  it('submits added and removed groups correctly when submitting', async () => {
    const { user, rerender, mockOnAddRemoveGroups } = setup()
    const group1Item = screen.getByText('Admin')
    await user.click(group1Item)

    const moveSelectedRightButton = screen.getByRole('button', { name: 'move selected right' })
    await user.click(moveSelectedRightButton)

    rerender(
      <Common {...Common?.args} isSubmitting={true} onAddRemoveGroups={mockOnAddRemoveGroups} />
    )

    const addGroups = [{ accountId: 1100, code: 'admin', name: 'Admin', description: 'admin' }]
    await waitFor(() => {
      expect(mockOnAddRemoveGroups).toHaveBeenCalledWith({
        addGroups: addGroups,
        removeGroups: [],
      })
    })
  })
})
