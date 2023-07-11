import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './KiboBreadcrumbs.stories'
import { BreadCrumb as BreadCrumbType } from '@/lib/types'

const { Common } = composeStories(stories)

describe('KiboBreadcrumbs', () => {
  const breadcrumbs = Common.args?.breadcrumbs as BreadCrumbType[]

  test('renders breadcrumbs with correct text and links', () => {
    render(<Common />)
    const breadcrumbLinks = screen.getAllByLabelText('breadcrumb-link')

    expect(breadcrumbLinks).toHaveLength(breadcrumbs.length)

    breadcrumbLinks.forEach((link, index) => {
      expect(link).toHaveTextContent(breadcrumbs[index].text as string)
      expect(link).toHaveAttribute('href', breadcrumbs[index].link)
    })
  })
})
