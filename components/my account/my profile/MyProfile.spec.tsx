import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as stories from './MyProfile.stories'
import { useAuthContext } from '@/context'

const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onChange={onChangMock} />
jest.mock('../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)

describe('[components] MyProfile', () => {
  const setup = (args = Common.args) => {
    const userAction = userEvent.setup()
    render(<Common {...args} />)
    return {
      userAction,
    }
  }

  it('render consumer data', async () => {
    renderHook(async () => {
      setup()
      const { user, isAuthenticated } = useAuthContext()
      // const firstName = screen.getByText(user?.firstName as string)
      // const lastName = screen.getByText(/customer-name/i)
      // expect(firstName).toBeVisible()
    })
  })
  it('should render component', () => {
    setup()

    const customerNameText = screen.getByText(/customer-name/i)
    const emailText = screen.getByText(/email/i)
    const passwordText = screen.getByText(/password/i)
    const EditName = screen.getAllByText(/edit/i)

    // const customerName =  screen.getByText('customer-name')

    expect(customerNameText).toBeVisible()
    expect(emailText).toBeVisible()
    expect(passwordText).toBeVisible()
    expect(EditName[0]).toBeVisible()
    // expect(customerName).toBeVisible()
  })
  it('should render edit', async () => {
    const { userAction } = setup()

    const EditName = screen.getAllByText(/edit/i)

    await userAction.click(EditName[0])
    const editCustomerName = screen.getByText(/customer-name/i)
    expect(editCustomerName).toBeVisible()

    const cancelName = screen.getByText(/cancel/i)
    await userAction.click(cancelName)

    const Editemail = screen.getAllByText(/edit/i)
    await userAction.click(Editemail[1])
    const editEmail = screen.getByText(/edit-email/i)
    expect(editEmail).toBeVisible()

    const cancelEmail = screen.getByText(/cancel/i)
    await userAction.click(cancelEmail)

    const Editpassword = screen.getAllByText(/edit/i)
    await userAction.click(Editpassword[3])
    const editPassword = screen.getByText(/edit-password/i)
    expect(editPassword).toBeVisible()
  })
})

// describe('checkout Component', () => {
//   const setup = () => render(<Common {...Common?.args} />)
//   describe('checkout', () => {
//     it('should render component', () => {
//       setup()
//       const Edit = screen.getAllByText('Edit')
//       const customerName = screen.getAllByText('Customer Name')
//       const emailAddress = screen.getAllByText('Email')
//       const phoneNumber = screen.getAllByText('phoneNumber')
//       const password = screen.getAllByText('Password')

//       expect(Edit[0]).toBeVisible()
//     })
//     it('should render edit', () => {
//       setup()
//       const EditName = screen.getAllByText('Edit')
//       fireEvent.click(EditName[0])
//       const editCustomerName = screen.getByText('Edit Customer Name')
//       expect(editCustomerName).toBeVisible()

//       const cancelName = screen.getByText('Cancel')
//       fireEvent.click(cancelName)

//       const Editemail = screen.getAllByText('Edit')
//       fireEvent.click(Editemail[1])
//       const editEmail = screen.getByText('Edit Email')
//       expect(editEmail).toBeVisible()

//       const cancelEmail = screen.getByText('Cancel')
//       fireEvent.click(cancelEmail)

//       const Editpassword = screen.getAllByText('Edit')
//       fireEvent.click(Editpassword[3])
//       const editPassword = screen.getByText('Edit Password')
//       expect(editPassword).toBeVisible()
//     })
//   })
// })
