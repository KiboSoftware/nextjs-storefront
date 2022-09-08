import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import * as stories from './Footer.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  render(<Common {...Common.args} />)

  return {
    user,
  }
}

describe('[component] Footer component', () => {
  it('should render component', () => {
    setup()
    const headings = Common?.args?.sections?.map((section: any) => section.title)
    headings.push('social')
    const links = [] as any
    Common?.args?.sections?.map((section: any) =>
      section.items.map((item: any) => links.push(item.text))
    )

    const headingRoles = screen.getAllByRole('heading').map((a) => a.textContent)
    const linkRoles = screen.getAllByRole('link').map((a) => a.textContent)

    expect(headingRoles).toEqual(headings)
    expect(linkRoles).toEqual(links)
  })
})
