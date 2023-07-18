import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'

import * as stories from './UserTable.stories' // import all stories from the stories file

import { B2BUser } from '@/lib/gql/types'

const { Table } = composeStories(stories)

const onDeleteMock = jest.fn()
const onCloseMock = jest.fn()

const UserFormMock = ({ onClose }: { onClose: () => void }) => (
  <div data-testid="user-form-mock">
    <button data-testid="cancel-user-mock-button" onClick={onClose}>
      Cancel
    </button>
  </div>
)

jest.mock(
  '@/components/my-account/User/UserForm/UserForm',
  () => () => UserFormMock({ onClose: onCloseMock })
)

jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material')
  return {
    ...originalModule,
    useTheme: jest.fn().mockReturnValue({
      breakpoints: { up: jest.fn((size) => `(max-width: ${size})`) },
      palette: {
        primary: {
          main: '#2EA195',
        },
        secondary: {
          light: '#FFFFFF',
        },
        grey: {
          100: '#F7F7F7',
          600: '#7C7C7C',
        },
      },
    }),
    useMediaQuery: jest.fn().mockReturnValue(true),
  }
})

describe('[component] User Table', () => {
  it('should render only email and role column on mobile screen', async () => {
    render(<Table />)

    expect(screen.getByText('email')).toBeVisible()
    expect(screen.getByText('role')).toBeVisible()
    expect(screen.getByText('first-name')).toBeVisible()
    expect(screen.getByText('last-name-or-sur-name')).toBeVisible()
    expect(screen.getByText('status')).toBeVisible()
  })

  it('should render correct data in table', async () => {
    render(<Table {...Table.args} />)
    const data: B2BUser[] | undefined = Table.args?.b2bUsers

    const rows = await screen.findAllByRole('row')

    await Promise.all(
      rows.slice(1).map(async (row, index) => {
        const rowData = data?.[index]

        const cells = await within(row).findAllByRole('cell')

        const emailCell = cells[0]
        const firstNameCell = cells[1]
        const lastNameCell = cells[2]
        const roleCell = cells[3]
        const statusCell = cells[4]

        expect(emailCell).toHaveTextContent(rowData?.emailAddress?.toString() ?? '')
        expect(firstNameCell).toHaveTextContent(rowData?.firstName ?? '')
        expect(lastNameCell).toHaveTextContent(rowData?.lastName ?? '')
        expect(roleCell).toHaveTextContent(
          rowData?.roles?.length ? rowData?.roles[0]?.roleName ?? '' : 'N/A'
        )
        expect(statusCell).toHaveTextContent(rowData?.isActive ? 'active' : 'in-active')
      })
    )
  })

  it('should show user form when user clicks on Edit icon', async () => {
    render(<Table {...Table.args} />)

    const rows = await screen.findAllByRole('row')
    const editIconInRowOne = within(rows[1]).getByTestId('EditIcon')

    fireEvent.click(editIconInRowOne)

    const userForm = within(rows[1]).getByTestId('user-form-mock')
    expect(userForm).toBeVisible()
  })

  it('should call onDelete when user clicks on delete icon', async () => {
    render(<Table {...Table.args} onDelete={onDeleteMock} />)

    const rows = await screen.findAllByRole('row')
    const deleteIconInRowOne = within(rows[1]).getByTestId('DeleteIcon')

    // Act
    fireEvent.click(deleteIconInRowOne)

    // Assert
    expect(onDeleteMock).toHaveBeenCalled()
  })

  it('should call onClose when user clicks on Close button', async () => {
    render(<Table {...Table.args} />)
    const rows = await screen.findAllByRole('row')
    const editIconInRowOne = within(rows[1]).getByTestId('EditIcon')

    fireEvent.click(editIconInRowOne)

    const userForm = within(rows[1]).getByTestId('user-form-mock')
    expect(userForm).toBeVisible()

    const cancelButton = within(userForm).getByTestId('cancel-user-mock-button')
    expect(cancelButton).toBeVisible()

    fireEvent.click(cancelButton)

    expect(onCloseMock).toHaveBeenCalled()
  })
})
