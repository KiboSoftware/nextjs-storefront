import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'

import * as stories from './AddressCard.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - AddressCard', () => {
  it('should render the component', () => {
    const { asFragment } = render(<Common {...Common.args} />)

    expect(asFragment(<Common {...Common.args} />)).toMatchSnapshot()
  })
})
