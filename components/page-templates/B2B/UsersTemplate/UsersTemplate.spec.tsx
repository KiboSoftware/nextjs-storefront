/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'

import * as stories from './UsersTemplate.stories' // import all stories from the stories file
import { createQueryClientWrapper, renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

// Mock
const onCloseMock = jest.fn()
jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
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

jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material')
  return {
    ...originalModule,
    useTheme: jest.fn().mockReturnValue({
      breakpoints: { up: jest.fn((size) => `(max-width: ${size})`) },
      palette: {
        text: {
          primary: '#2B2B2B',
        },
      },
      typography: {
        body2: {
          fontSize: '1.5rem',
        },
      },
    }),
    useMediaQuery: jest.fn().mockReturnValue(true),
  }
})

const UserFormMock = ({ onClose }: { onClose: () => void }) => (
  <div data-testid="user-form-mock">
    <button data-testid="delete-user-mock-button" onClick={onClose}>
      Cancel
    </button>
  </div>
)
jest.mock(
  '@/components/b2b/User/UserForm/UserForm',
  () => () => UserFormMock({ onClose: onCloseMock })
)

const UserTableMock = () => <div data-testid="user-table-mock"></div>
jest.mock('../../../b2b/User/UserTable/UserTable', () => () => UserTableMock())

describe('[component] - UsersTemplate', () => {
  it('should render component', async () => {
    jest.mock('@/hooks', () => ({
      useGetB2BUserQueries: jest.fn().mockReturnValue({
        data: null,
        isLoading: false,
      }),
    }))

    render(<Common />, {
      wrapper: createQueryClientWrapper(),
    })

    const addUserButton = screen.getByText('add-user')
    expect(addUserButton).toBeVisible()

    const searchBar = screen.getByPlaceholderText('user-search-placeholder')
    expect(searchBar).toBeVisible()
  })

  it('should display circular progress when user is not available or loading', () => {
    render(<Common />, {
      wrapper: createQueryClientWrapper(),
    })

    // Assert that the circular progress is displayed
    const circularProgressElement = screen.getByRole('progressbar')
    expect(circularProgressElement).toBeInTheDocument()
  })

  it('should open user form when add user button clicked in desktop view', async () => {
    renderWithQueryClient(
      <ModalContextProvider>
        <Common />
      </ModalContextProvider>
    )

    const addUserButton = screen.getByText('add-user')
    fireEvent.click(addUserButton)

    const userForm = screen.getByTestId('user-form-mock')
    expect(userForm).toBeVisible()
  })

  it('should open user form in dialog when add user button clicked in mobile view', async () => {
    window.matchMedia = createMatchMedia(450)
    render(
      <ModalContextProvider>
        <Common />
      </ModalContextProvider>
    )

    const addUserButton = screen.getByText('add-user')
    fireEvent.click(addUserButton)
  })

  it('should run handleSearch method when user types in search field', async () => {
    const handleSearch = jest.fn()
    const SearchBarMock = ({ handleSearch }: { handleSearch: () => void }) => (
      <div data-testid="search-bar-mock">
        <input data-testid="search-bar-input" onChange={handleSearch} />
      </div>
    )
    jest.mock('../../../common/SearchBar/SearchBar', () => () => SearchBarMock({ handleSearch }))

    render(<Common />)

    const searchBarInput = screen.getByRole('textbox', { name: 'search-input' })
    expect(searchBarInput).toBeVisible()
  })
})
