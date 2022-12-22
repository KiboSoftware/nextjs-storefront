/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './SubscriptionList.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

describe('[component] - Subscription', () => {
  //todo:Work in progress
  // const setup = () => {
  //   const user = userEvent.setup()
  //   render(<Common />)
  //   return {
  //     user,
  //   }
  // }

  it('should render component', () => {
    //setup()
    //todo: cover test cases
  })
})
