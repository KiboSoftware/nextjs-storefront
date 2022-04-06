import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Modal.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onClose = jest.fn()

jest.mock('@storybook/client-api', () => {
  return {
    useArgs: jest.fn(() => {
      const open = true
      const updateArgs = jest.fn()
      return [{ open }, updateArgs]
    }),
  }
})

describe('[components] Modal Component', () => {
  describe('Default Modal', () => {
    const setup = () => render(<Common onClose={onClose} {...Common.args} />)

    it('should render modal open', () => {
      setup()

      expect(Common.args.open).toBeTruthy()
    })

    it('should render title', () => {
      setup()

      const title = screen.getByText(/custom modal title/i)

      expect(title).toBeVisible()
    })

    it('should render content', () => {
      setup()

      const content = screen.getByText(/cras mattis consectetur purus sit amet fermentum/i)

      expect(content).toBeVisible()
    })

    it('should render dividers', () => {
      setup()

      expect(Common.args.dividers).toBeTruthy()
    })

    it('should render actions', () => {
      setup()

      const actions = screen.getByRole('button', {
        name: /save/i,
      })

      expect(actions).toBeVisible()
    })
  })
})
