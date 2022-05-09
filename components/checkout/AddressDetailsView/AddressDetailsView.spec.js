import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'

import * as stories from './AddressDetailsView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

describe('[component] - AddressDetailsView', () => {
  it('should render the component', () => {
    const { asFragment } = render(<Common {...Common.args} />)

    expect(asFragment(<Common {...Common.args} />)).toMatchSnapshot()
  })

  it('should render as radio button if radio prop is true', () => {
    const { asFragment } = render(<Radio {...Common.args} />)

    expect(asFragment(<Radio {...Common.args} />)).toMatchSnapshot()
  })
})
