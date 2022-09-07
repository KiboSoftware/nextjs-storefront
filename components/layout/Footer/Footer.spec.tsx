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

    const aboutUs = screen.getByRole('heading', { name: /about us/i })
    const departments = screen.getByRole('heading', { name: /departments/i })
    const contact = screen.getByRole('heading', { name: /contact/i })
    const paymentAndDelivery = screen.getByRole('heading', { name: /payment & delivery/i })
    const social = screen.getByRole('heading', { name: /social/i })

    const whoWeAre = screen.getByRole('link', { name: /who we are/i })
    const quality = screen.getByRole('link', { name: /Quality in the detail/i })
    const customerReviews = screen.getByRole('link', { name: /Customer Reviews/i })
    const mens = screen.getByRole('link', { name: 'Mens' })
    const womens = screen.getByRole('link', { name: 'Womens' })
    const kids = screen.getByRole('link', { name: /kids/i })
    const contactUs = screen.getByRole('link', { name: /contact us/i })
    const purchaseTerms = screen.getByRole('link', { name: /Purchase terms/i })

    expect(aboutUs).toBeVisible()
    expect(departments).toBeVisible()
    expect(contact).toBeVisible()
    expect(paymentAndDelivery).toBeVisible()
    expect(social).toBeVisible()

    expect(whoWeAre).toBeVisible()
    expect(quality).toBeVisible()
    expect(customerReviews).toBeVisible()
    expect(mens).toBeVisible()
    expect(womens).toBeVisible()
    expect(kids).toBeVisible()
    expect(contactUs).toBeVisible()
    expect(purchaseTerms).toBeVisible()
  })
})
