import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'

import '@testing-library/jest-dom'

import * as stories from './ProductDetailTemplate.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] Product Detail Template component', () => {
  it('renders the component correctly', () => {
    const { asFragment } = render(<Common {...Common.args} />)

    expect(asFragment(<Common {...Common.args} />)).toMatchSnapshot()
  })
})
