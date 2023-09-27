import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserTable.stories' // import all stories from the stories file
import { renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider } from '@/context'
import { B2BUserInput } from '@/lib/types'

import { B2BUser } from '@/lib/gql/types'

const { Table, TableMobile } = composeStories(stories)

const user = userEvent.setup()

const onDeleteMock = jest.fn()
const onSaveMock = jest.fn()
const onViewMock = jest.fn()

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
}))

jest.mock('@/components/b2b/User/UserForm/UserForm', () => ({
  __esModule: true,
  default: ({
    onSave,
    onClose,
  }: {
    onSave: (formValues: B2BUserInput) => void
    onClose: () => void
  }) => (
    <div data-testid="user-form-mock">
      <button
        onClick={() =>
          onSave({
            firstName: 'test-firstName',
            lastName: 'test-lastName',
          })
        }
      >
        onSave
      </button>
      <button data-testid="cancel-user-mock-button" onClick={onClose}>
        Cancel
      </button>
    </div>
  ),
}))

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

  it('should show No Record Found when users list is empty', () => {
    render(<Table {...Table.args} b2bUsers={[]} />)

    const noRecordFound = screen.getByText('no-record-found')
    expect(noRecordFound).toBeVisible()
  })

  it('should show user form when user clicks on Edit icon', async () => {
    renderWithQueryClient(
      <ModalContextProvider>
        <Table {...Table.args} onSave={onSaveMock} />
      </ModalContextProvider>
    )

    const rows = await screen.findAllByRole('row')
    const editIconInRowOne = within(rows[1]).getByTestId('EditIcon')

    await user.click(editIconInRowOne)

    const userForm = screen.getByTestId('user-form-mock')
    await waitFor(() => {
      expect(userForm).toBeVisible()
    })

    const saveButton = within(userForm).getByRole('button', { name: 'onSave' })
    expect(saveButton).toBeVisible()

    await user.click(saveButton)

    expect(onSaveMock).toHaveBeenCalledWith(
      {
        firstName: 'test-firstName',
        lastName: 'test-lastName',
      },
      Table.args?.b2bUsers?.[0]
    )
  })

  it('should call onDelete when user clicks on delete icon', async () => {
    render(<Table {...Table.args} onDelete={onDeleteMock} />)

    const rows = await screen.findAllByRole('row')
    const deleteIconInRowOne = within(rows[1]).getByTestId('DeleteIcon')

    // Act
    await user.click(deleteIconInRowOne)

    // Assert
    expect(onDeleteMock).toHaveBeenCalled()
  })

  it('should call onClose when user clicks on Close button', async () => {
    render(<Table {...Table.args} />)
    const rows = await screen.findAllByRole('row')
    const editIconInRowOne = within(rows[1]).getByTestId('EditIcon')

    await user.click(editIconInRowOne)

    const userForm = screen.getByTestId('user-form-mock')
    expect(userForm).toBeVisible()

    const cancelButton = within(userForm).getByTestId('cancel-user-mock-button')
    expect(cancelButton).toBeVisible()

    await user.click(cancelButton)

    expect(userForm).not.toBeVisible()
  })

  it('should show edit user dialog when mdScreen is false', async () => {
    render(<TableMobile {...TableMobile.args} onSave={onSaveMock} onView={onViewMock} />)

    const rows = await screen.findAllByRole('row')
    const userActionMenu = within(rows[1]).getByTestId('EditIcon')
    expect(userActionMenu).toBeVisible()

    await user.click(userActionMenu)

    const dialog = screen.getByRole('dialog', { name: 'edit-user' })
    expect(dialog).toBeVisible()

    const userForm = screen.getByTestId('user-form-mock')
    expect(userForm).toBeVisible()

    const saveButton = within(userForm).getByRole('button', { name: 'onSave' })
    expect(saveButton).toBeVisible()

    await user.click(saveButton)

    expect(onSaveMock).toHaveBeenCalledWith(
      {
        firstName: 'test-firstName',
        lastName: 'test-lastName',
      },
      Table.args?.b2bUsers?.[0]
    )

    fireEvent.click(rows[0])
    expect(onViewMock).toHaveBeenCalled()
  })
})
