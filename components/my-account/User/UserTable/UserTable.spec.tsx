import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'

import * as stories from './UserTable.stories' // import all stories from the stories file

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

    expect(screen.getByText('email-address')).toBeInTheDocument()
    expect(screen.getByText('role')).toBeInTheDocument()
    expect(screen.getByText('first-name')).toBeInTheDocument()
    expect(screen.getByText('last-name-or-sur-name')).toBeInTheDocument()
    expect(screen.getByText('status')).toBeInTheDocument()
  })

  it('should render correct data in table', async () => {
    render(<Table {...Table.args} />)

    const rows = await screen.findAllByRole('row')
    const emailCellOne = within(rows[1]).getAllByRole('cell')[0]
    const roleCellOne = within(rows[1]).getAllByRole('cell')[3]
    const emailCellTwo = within(rows[2]).getAllByRole('cell')[0]
    const roleCellTwo = within(rows[2]).getAllByRole('cell')[3]

    expect(emailCellOne).toHaveTextContent('kushagra.agarwal@outlook.com')
    expect(roleCellOne).toHaveTextContent('Admin')
    expect(emailCellTwo).toHaveTextContent('james.smith@gmail.com')
    expect(roleCellTwo).toHaveTextContent('N/A')
  })
})
