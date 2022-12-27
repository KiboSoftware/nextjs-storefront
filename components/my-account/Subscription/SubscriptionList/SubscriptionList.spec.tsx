/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ReactNode } from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { cleanup, screen, waitFor } from '@testing-library/react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import * as stories from './SubscriptionList.stories' // import all stories from the stories file
import { server } from '@/__mocks__/msw/server'
import { noSubscriptionMock } from '@/__mocks__/stories/subscriptionCollectionMock'

jest.mock('../SubscriptionItem/SubscriptionItem.tsx', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="subscription-item-list-mock">{children}</div>
  ),
}))

const { Common, NoSubscription } = composeStories(stories)

beforeEach(() => {
  cleanup()
})

const noSubscriptionSetup = () => {
  const user = userEvent.setup()
  render(<NoSubscription />)
  return {
    user,
  }
}
describe('[component] - Subscription', () => {
  //todo:Work in progress
  const setup = () => {
    const user = userEvent.setup()
    render(<Common />)
    return {
      user,
    }
  }

  it('should render component', async () => {
    setup()
    const subscriptionTitle = screen.getByText(/my-subscription/i)
    const accountTitleText = screen.getByText('my-account')

    expect(subscriptionTitle).toBeVisible()
    expect(accountTitleText).toBeVisible()

    await waitFor(async () => {
      const subscriptionItemList = screen.getByTestId('subscription-item-list-mock')

      await waitFor(async () => expect(subscriptionItemList).toBeVisible())
    })
  })

  it('should render message when no subscribition items under user', async () => {
    noSubscriptionSetup()

    server.use(
      graphql.query('getSubscriptions', (_req, res, ctx) => {
        return res(ctx.data(noSubscriptionMock))
      })
    )
    await waitFor(async () => {
      const noSubscriptionMessage = screen.getByText(/no-subscription-message/i)
      expect(noSubscriptionMessage).toBeVisible()
    })
  })
})
