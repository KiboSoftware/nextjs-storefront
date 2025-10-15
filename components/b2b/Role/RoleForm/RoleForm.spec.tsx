import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import RoleForm from './RoleForm'

const mockOnSave = jest.fn()
const mockOnCancel = jest.fn()

describe('RoleForm', () => {
  it('should render the role form with all sections', () => {
    render(<RoleForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    expect(screen.getByText(/Role Information/i)).toBeInTheDocument()
    expect(screen.getByText(/Account Hierarchy Scope/i)).toBeInTheDocument()
    expect(screen.getByText(/Permission Configuration/i)).toBeInTheDocument()
  })

  it('should render the behavior categories', () => {
    render(<RoleForm onSave={mockOnSave} onCancel={mockOnCancel} />)

    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Discount')).toBeInTheDocument()
  })
})
