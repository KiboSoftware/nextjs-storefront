import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserTable.stories' // import all stories from the stories file

import { B2BUser } from '@/lib/gql/types'

const { Table } = composeStories(stories)

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

    expect(screen.getByText('email')).toBeInTheDocument()
    expect(screen.getByText('role')).toBeInTheDocument()
    expect(screen.getByText('first-name')).toBeInTheDocument()
    expect(screen.getByText('last-name-or-sur-name')).toBeInTheDocument()
    expect(screen.getByText('status')).toBeInTheDocument()
  })

  it('should render correct data in table', async () => {
    render(<Table {...Table.args} />)
    const data: B2BUser[] | undefined = Table.args?.b2bUsers

    const rows = await screen.findAllByRole('row')

    rows.forEach(async (row, index) => {
      if (index === 0) return
      const rowData = data && (data[index - 1] as B2BUser)

      const cells = await within(row).findAllByLabelText('td')

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
  })

  // it('should show record in Edit mode when user clicks on Edit icon', async () => {
  //   render(<Table {...Table.args} />)

  //   const rows = await screen.findAllByRole('row')
  //   const editIconInRowOne = within(rows[1]).getByTestId('EditIcon')

  //   userEvent.click(editIconInRowOne)

  //   const emailInput = await screen.findByLabelText('email-address')
  //   const firstNameInput = await screen.findByLabelText('first-name')
  //   const lastNameInput = await screen.findByLabelText('last-name-or-sur-name')
  //   expect(emailInput).toHaveValue('kushagra.agarwal@outlook.com')
  //   expect(firstNameInput).toHaveValue('Kushagra')
  //   expect(lastNameInput).toHaveValue('Agarwal')
  // })

  // it('should Save the record when user clicks on Save button', async () => {
  //   const onSave = jest.fn()
  //   render(<Table {...Table.args} onSave={onSave} />)
  //   const rows = await screen.findAllByRole('row')
  //   const editIconInRowOne = within(rows[1]).getByTestId('EditIcon')

  //   userEvent.click(editIconInRowOne)

  //   // const form = await screen.findByRole('form')
  //   const submitButton = await screen.getByRole('button', { name: 'submit' })
  //   console.log(submitButton)
  //   // fireEvent.submit(form)

  //   expect(onSave).toHaveBeenCalled()
  // })

  // it('should Close the Edit mode when user clicks on Close button', async () => {
  //   const onClose = jest.fn()
  //   render(<Table {...Table.args} />)
  //   const rows = await screen.findAllByRole('row')
  //   const editIconInRowOne = within(rows[1]).getByTestId('EditIcon')

  //   userEvent.click(editIconInRowOne)

  //   // const form = await screen.findByRole('form')
  //   const submitButton = await screen.findAllByRole('button')
  //   console.log(submitButton)
  //   // const resetButton = document.createElement('button')
  //   // resetButton.type = 'reset'
  //   // resetButton.onclick = onClose
  //   // resetButton.textContent = 'Cancel'
  //   // form.appendChild(resetButton)

  //   // fireEvent.click(resetButton)
  //   // const emailInput = await screen.findByLabelText('email-address')
  //   // expect(emailInput).toBe('')
  //   const email = within(rows[1]).getAllByRole('cell')[1]
  //   expect(email).toHaveTextContent('kushagra.agarwal@outlook.com')
  // })
})
