import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyTreeLabel.stories'
import { userResponseMock } from '@/__mocks__/stories'

const { Admin, Purchaser, NonPurchaser } = composeStories(stories)

const companyOrOrganizationName = userResponseMock?.companyOrOrganization as string

describe('AccountHierarchyTreeLabel', () => {
  it('should render AccountHierarchyTreeLabel component', async () => {
    render(<Admin />)

    const treeLabel = screen.getByTestId('tree-label')
    expect(treeLabel).toBeVisible()

    const companyOrOrganization = screen.getByText(companyOrOrganizationName)
    expect(companyOrOrganization).toBeVisible()
  })

  it('Admin View - should render all action buttons', async () => {
    render(<Admin />)

    const accountAddButton = screen.getByRole('button', { name: 'item-add' })
    expect(accountAddButton).toBeVisible()

    const accountEditButton = screen.getByRole('button', { name: 'item-edit' })
    expect(accountEditButton).toBeVisible()

    const accountDeleteButton = screen.getByRole('button', { name: 'item-delete' })
    expect(accountDeleteButton).toBeVisible()

    const buyerButton = screen.getByText('buyers')
    expect(buyerButton).toBeVisible()

    const quoteButton = screen.getByText('quotes')
    expect(quoteButton).toBeVisible()
  })

  it('Purchaser View - should render only buyer and quotes buttons', async () => {
    render(<Purchaser />)

    const accountAddButton = screen.queryByRole('button', { name: 'item-add' })
    expect(accountAddButton).not.toBeInTheDocument()

    const buyerButton = screen.getByText('buyers')
    expect(buyerButton).toBeVisible()
  })

  it('Non Purchaser View - no actions should render', async () => {
    render(<NonPurchaser />)

    const accountAddButton = screen.queryByRole('button', { name: 'item-add' })
    expect(accountAddButton).not.toBeInTheDocument()

    const quoteButton = screen.queryByText('quotes')
    expect(quoteButton).not.toBeInTheDocument()
  })
})
