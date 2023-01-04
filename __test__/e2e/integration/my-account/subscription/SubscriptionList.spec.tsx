import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '@/__test__/utils'
import * as stories from '@/components/my-account/Subscription/SubscriptionList/SubscriptionList.stories'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  const mockOnAccountTitleClick = jest.fn()
  const router = createMockRouter()

  render(
    <RouterContext.Provider value={router}>
      <Common {...Common.args} onAccountTitleClick={mockOnAccountTitleClick} />
    </RouterContext.Provider>
  )

  return {
    user,
    mockOnAccountTitleClick,
    router,
  }
}

describe('[component] - SubscriptionList Integration', () => {
  it('should go back to my account page on clicking on back arrow icon from mySubscription Page', async () => {
    const { user, mockOnAccountTitleClick } = setup()
    const applyButton = screen.getByTestId(/ArrowBackIosIcon/i)
    await user.click(applyButton)
    expect(mockOnAccountTitleClick).toBeCalled()
    expect(screen.getByText(/my-account/i)).toBeVisible()
  })
})
