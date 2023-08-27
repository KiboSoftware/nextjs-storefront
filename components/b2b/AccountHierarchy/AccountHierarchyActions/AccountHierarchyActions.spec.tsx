import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyActions.stories'

const { Common } = composeStories(stories)

const onBuyersClickMock = jest.fn()
const onQuotesClickMock = jest.fn()
const onAddMock = jest.fn()
const onEditMock = jest.fn()
const onViewMock = jest.fn()
const onDisableMock = jest.fn()

describe('AccountHierarchyActions', () => {
  it('should render component', async () => {
    render(
      <Common
        onBuyersClick={onBuyersClickMock}
        onQuotesClick={onQuotesClickMock}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onView={onViewMock}
        mdScreen={true}
        onDisable={onDisableMock}
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

    const accountViewButton = screen.getByRole('button', { name: 'item-view' })
    accountViewButton.click()
    expect(onViewMock).toHaveBeenCalled()

    const accountDisableButton = screen.getByRole('button', { name: 'item-disable' })
    accountDisableButton.click()
    expect(onDisableMock).toHaveBeenCalled()

    const buyerButton = screen.getByText('buyers')
    buyerButton.click()
    expect(onBuyersClickMock).toHaveBeenCalled()

    const quoteButton = screen.getByText('quotes')
    quoteButton.click()
    expect(onQuotesClickMock).toHaveBeenCalled()
  })

  it('should render AccountHierarchyActions on mobile screen', async () => {
    render(<Common mdScreen={false} />)

    const treeLabel = screen.getByLabelText('more')
    expect(treeLabel).toBeVisible()
  })
})
