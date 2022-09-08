import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
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

    const links = Common?.args?.sections
      ?.map((section: any) => section.items.map((item: any) => item.text))
      .flat()

    headings.map((heading: any) => {
      expect(screen.getByText(heading)).toBeVisible()
    })

    links.map((link: any) => {
      expect(screen.getByText(link)).toBeVisible()
    })
  })
})
