import React from 'react'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './HeaderAction.stories' // import all stories from the stories file

const { MyAccount, Location } = composeStories(stories)

describe('Header Navigation Action Component', () => {
  it('should renders account icon, title and subtitle', () => {
    const { getByText } = render(<MyAccount />)
    expect(getByText(MyAccount.args.title)).toBeDefined()
    expect(getByText(MyAccount.args.subtitle)).toBeDefined()
  })

  it('should call onClick action', () => {
    const onClickMock = jest.fn()
    const { getByText } = render(<Location onClick={onClickMock} />)
    const element = getByText(Location.args.title)
    element.click()
    expect(onClickMock).toHaveBeenCalled()
  })
})
