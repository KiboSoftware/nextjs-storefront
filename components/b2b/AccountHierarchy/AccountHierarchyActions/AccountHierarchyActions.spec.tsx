import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyActions.stories'

const { Common } = composeStories(stories)

const onBuyersClickMock = jest.fn()
const onQuotesClickMock = jest.fn()
const onAddMock = jest.fn()
const onEditMock = jest.fn()
const onDeleteMock = jest.fn()

describe('AccountHierarchyActions', () => {
  it('should render AccountHierarchyActions component', async () => {
    render(
      <Common
        onBuyersClick={onBuyersClickMock}
        onQuotesClick={onQuotesClickMock}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
      />
    )

    const treeLabel = screen.getByTestId('account-actions')
    expect(treeLabel).toBeVisible()

    const accountAddButton = screen.getByRole('button', { name: 'item-add' })
    accountAddButton.click()
    expect(onAddMock).toHaveBeenCalled()

    const accountEditButton = screen.getByRole('button', { name: 'item-edit' })
    accountEditButton.click()
    expect(onEditMock).toHaveBeenCalled()

    const accountDeleteButton = screen.getByRole('button', { name: 'item-delete' })
    accountDeleteButton.click()
    expect(onDeleteMock).toHaveBeenCalled()

    const buyerButton = screen.getByText('buyers')
    buyerButton.click()
    expect(onBuyersClickMock).toHaveBeenCalled()

    const quoteButton = screen.getByText('quotes')
    quoteButton.click()
    expect(onQuotesClickMock).toHaveBeenCalled()
  })
})
