import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import theme from '../../../styles/theme'
import * as stories from './PasswordValidation.stories'

const { Common } = composeStories(stories)

describe('[components] PasswordValidation', () => {
  const setup = (args = Common.args) => {
    render(<Common {...args} />)
  }

  it('should render component', () => {
    setup()

    const isHavingAtLeastEightCharacters = screen.getByTestId('isHavingAtLeastEightCharacters')
    const isHavingAtLeastOneNumber = screen.getByTestId('isHavingAtLeastOneNumber')
    const isHavingAtLeastOneCapitalLetter = screen.getByTestId('isHavingAtLeastOneCapitalLetter')
    const isHavingAtLeastOneSpecialCharacter = screen.getByTestId(
      'isHavingAtLeastOneSpecialCharacter'
    )

    expect(isHavingAtLeastEightCharacters).toBeVisible()
    expect(isHavingAtLeastOneNumber).toBeVisible()
    expect(isHavingAtLeastOneCapitalLetter).toBeVisible()
    expect(isHavingAtLeastOneSpecialCharacter).toBeVisible()

    expect(isHavingAtLeastEightCharacters).toHaveStyle({ color: theme.palette.error.main })
    expect(isHavingAtLeastOneNumber).toHaveStyle({ color: theme.palette.error.main })
    expect(isHavingAtLeastOneCapitalLetter).toHaveStyle({ color: theme.palette.error.main })
    expect(isHavingAtLeastOneSpecialCharacter).toHaveStyle({ color: theme.palette.error.main })
  })

  it('should show "validation failed" icon when user enters password having length lesss than eight Characters', () => {
    setup({ password: 'Test@12' }) //NOSONAR

    const isHavingAtLeastEightCharacters = screen.getByTestId('isHavingAtLeastEightCharacters')

    expect(isHavingAtLeastEightCharacters).toHaveStyle({ color: theme.palette.error.main })
  })
  it('should show "validation passed" icon when user enters password having length at least eight Characters', () => {
    setup({ password: 'TestPassword@1' }) //NOSONAR

    const isHavingAtLeastEightCharacters = screen.getByTestId('isHavingAtLeastEightCharacters')

    expect(isHavingAtLeastEightCharacters).toHaveStyle({ color: theme.palette.primary.main })
  })

  it('should show "validation failed" icon when user enters password without having at least one number', () => {
    setup({ password: 'TestPassword@' }) //NOSONAR

    const isHavingAtLeastOneNumber = screen.getByTestId('isHavingAtLeastOneNumber')

    expect(isHavingAtLeastOneNumber).toHaveStyle({ color: theme.palette.error.main })
  })
  it('should show "validation passed" icon when user enters password containing at least one number', () => {
    setup({ password: 'TestPassword@1' }) //NOSONAR

    const isHavingAtLeastOneNumber = screen.getByTestId('isHavingAtLeastOneNumber')

    expect(isHavingAtLeastOneNumber).toHaveStyle({ color: theme.palette.primary.main })
  })

  it('should show "validation failed" icon when user enters password whithout having at least one capital letter', () => {
    setup({ password: 'testpassword@1' }) //NOSONAR

    const isHavingAtLeastOneCapitalLetter = screen.getByTestId('isHavingAtLeastOneCapitalLetter')

    expect(isHavingAtLeastOneCapitalLetter).toHaveStyle({ color: theme.palette.error.main })
  })
  it('should show "validation passed" icon when user enters password containing at least one capital letter', () => {
    setup({ password: 'TestPassword@1' }) //NOSONAR

    const isHavingAtLeastOneCapitalLetter = screen.getByTestId('isHavingAtLeastOneCapitalLetter')

    expect(isHavingAtLeastOneCapitalLetter).toHaveStyle({ color: theme.palette.primary.main })
  })

  it('should show "validation failed" icon when user enters password without having at least one special character', () => {
    setup({ password: 'TestPassword1' }) //NOSONAR

    const isHavingAtLeastOneSpecialCharacter = screen.getByTestId(
      'isHavingAtLeastOneSpecialCharacter'
    )

    expect(isHavingAtLeastOneSpecialCharacter).toHaveStyle({ color: theme.palette.error.main })
  })
  it('should show "validation passed" icon when user enters password containing at least one special character', () => {
    setup({ password: 'TestPassword@1' }) //NOSONAR

    const isHavingAtLeastOneSpecialCharacter = screen.getByTestId(
      'isHavingAtLeastOneSpecialCharacter'
    )

    expect(isHavingAtLeastOneSpecialCharacter).toHaveStyle({ color: theme.palette.primary.main })
  })
})
