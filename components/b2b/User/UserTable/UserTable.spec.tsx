import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserTable.stories' // import all stories from the stories file

import { B2BUser } from '@/lib/gql/types'

const { Table, TableMobile } = composeStories(stories)

const user = userEvent.setup()

const onDeleteMock = jest.fn()
const onViewMock = jest.fn()

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasAnyPermission: jest.fn().mockImplementation(() => true),
}))

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/my-account/b2b/users',
  }),
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
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should render all columns on desktop screen', async () => {
    render(<Table />)

    expect(screen.getByText('email')).toBeVisible()
    expect(screen.getByText('first-name')).toBeVisible()
    expect(screen.getByText('last-name-or-sur-name')).toBeVisible()
    expect(screen.getByText('role')).toBeVisible()
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

        // Check role - should display first role name or 'N/A'
        const expectedRole =
          rowData?.roles?.length && rowData?.roles[0]?.roleName ? rowData.roles[0].roleName : 'N/A'
        expect(roleCell).toHaveTextContent(expectedRole)

        expect(statusCell).toHaveTextContent(rowData?.isActive ? 'active' : 'in-active')
      })
    )
  })

  it('should show No Record Found when users list is empty', () => {
    render(<Table {...Table.args} b2bUsers={[]} />)

    const noRecordFound = screen.getByText('no-record-found')
    expect(noRecordFound).toBeVisible()
  })

  it('should navigate to edit page when user clicks on Edit icon', async () => {
    render(<Table {...Table.args} />)

    const rows = await screen.findAllByRole('row')
    const editButton = within(rows[1]).getByRole('button', { name: 'edit-user' })

    await user.click(editButton)

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/my-account/b2b/users/'))
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

  it('should render only email and role columns on mobile and call onView when row is clicked', async () => {
    render(<TableMobile {...TableMobile.args} onView={onViewMock} />)

    // Check that only email and role columns are visible (no first name, last name, status on mobile)
    expect(screen.getByText('email')).toBeVisible()
    expect(screen.getByText('role')).toBeVisible()
    expect(screen.queryByText('first-name')).not.toBeInTheDocument()
    expect(screen.queryByText('last-name-or-sur-name')).not.toBeInTheDocument()
    expect(screen.queryByText('status')).not.toBeInTheDocument()

    const rows = await screen.findAllByRole('row')

    // Click on a data row (skip header row)
    fireEvent.click(rows[1])

    expect(onViewMock).toHaveBeenCalledWith(TableMobile.args?.b2bUsers?.[0])
  })
})
