import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'

import * as stories from './CreateRoleTemplate.stories'
import { renderWithQueryClient } from '@/__test__/utils'

const { Default } = composeStories(stories)

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
    renderWithQueryClient(<Default {...Default.args} />)

    expect(screen.getByText(/create-new-role/i)).toBeInTheDocument()
  })

  it('should render the role form sections', () => {
    renderWithQueryClient(<Default {...Default.args} />)

    expect(screen.getByText(/role-information/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /permission-configuration/i })).toBeInTheDocument()
  })
})
