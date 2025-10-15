import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import CreateRoleTemplate from './CreateRoleTemplate'

const mockRouter = {
  push: jest.fn(),
  pathname: '/my-account/b2b/manage-roles/create',
  query: {},
  asPath: '/my-account/b2b/manage-roles/create',
}

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}))

describe('CreateRoleTemplate', () => {
  it('should render the create role template', () => {
    render(<CreateRoleTemplate />)

    expect(screen.getByText(/Create New Role/i)).toBeInTheDocument()
  })

  it('should render the role form', () => {
    render(<CreateRoleTemplate />)

    expect(screen.getByText(/Role Information/i)).toBeInTheDocument()
    expect(screen.getByText(/Permission Configuration/i)).toBeInTheDocument()
  })
})
