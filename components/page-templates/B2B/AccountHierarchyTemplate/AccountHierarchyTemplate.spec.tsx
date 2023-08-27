/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import { useRouter } from 'next/router'

import * as stories from './AccountHierarchyTemplate.stories' // import all stories from the stories file
import { createQueryClientWrapper } from '@/__test__/utils'
import { ModalContextProvider } from '@/context'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

import { CustomerAccount } from '@/lib/gql/types'

const { Common } = composeStories(stories)

interface AccountHierarchyAddFormDialogProps {
  formTitle?: string
  user?: CustomerAccount
  onSave: (data: CreateCustomerB2bAccountParams) => void
  onClose: () => void
}

// Mock
const onCloseMock = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => jest.fn(),
  removeListener: () => jest.fn(),
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

const AccountHierarchyAddFormMock = ({ onClose }: { onClose: () => void }) => (
  <div data-testid="account-hierarchy-form-mock">
    <button data-testid="cancel-account-mock-button" onClick={onClose}>
      Cancel
    </button>
    <button data-testid="save-account-mock-button" onClick={onClose}>
      Save
    </button>
  </div>
)
jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyAddForm/AccountHierarchyAddForm',
  () => () => AccountHierarchyAddFormMock({ onClose: onCloseMock })
)

const AccountHierarchyTreeMock = () => <div data-testid="account-hierarchy-tree-mock"></div>
jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyTree/AccountHierarchyTree',
  () => () => AccountHierarchyTreeMock()
)

jest.mock('@/components/dialogs', () => ({
  __esModule: true,
  AccountHierarchyAddFormDialog: (props: AccountHierarchyAddFormDialogProps) => {
    const params = {
      parentAccount: { id: 1023, companyOrOrganization: 'Parent Account' },
      companyOrOrganization: 'ABCD',
      taxId: '123234',
      firstName: 'Karan',
      lastName: 'Thappar',
      emailAddress: 'karan@gmail.com',
    }

    return (
      <div>
        <h1>user-form-dialog</h1>
        <button onClick={() => props.onSave(params)}>Confirm</button>
      </div>
    )
  },
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const setup = () => {
  const user = userEvent.setup()
  render(
    <ModalContextProvider>
      <Common />
    </ModalContextProvider>,
    {
      wrapper: createQueryClientWrapper(),
    }
  )
  return {
    user,
  }
}

describe('[component] - AccountHierarchyTemplate', () => {
  it('should render component', async () => {
    jest.mock('@/hooks', () => ({
      useGetB2BUserQueries: jest.fn().mockReturnValue({
        data: { id: 1023 },
        isLoading: false,
      }),
    }))

    render(<Common />, {
      wrapper: createQueryClientWrapper(),
    })

    const heading = screen.getByText('account-hierarchy')
    expect(heading).toBeVisible()

    const addUserButton = screen.getByText('add-child-account')
    expect(addUserButton).toBeVisible()

    const accountHierarchyTreeMock = screen.getByTestId('account-hierarchy-tree-mock')
    expect(accountHierarchyTreeMock).toBeVisible()
  })

  it('should open add child account form in dialog when add child account button clicked', async () => {
    const { user } = setup()

    const addChildAccountButton = screen.getByText('add-child-account')
    user.click(addChildAccountButton)
  })

  it('should navigate to "/my-account" when account title is clicked', async () => {
    window.matchMedia = createMatchMedia(1400)

    const mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    setup()

    const accountTitleElement = screen.getByText(/my-account/i)
    fireEvent.click(accountTitleElement)

    expect(mockPush).toHaveBeenCalledWith('/my-account')
  })
})
