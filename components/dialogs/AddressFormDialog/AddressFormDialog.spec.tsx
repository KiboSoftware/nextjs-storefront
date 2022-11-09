import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AddressFormDialog.stories'

const { Common } = composeStories(stories)

const addressFormMock = () => <div data-testid="address-form-mock" />
jest.mock('@/components/common/AddressForm/AddressForm', () => () => addressFormMock())

describe('[components]  AddressFormDialog Dialog', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} />)

    return { user }
  }

  it('should render component', () => {
    setup({ ...Common.args })

    const closeIcon = screen.getByRole('button', { name: 'close' })
    const addressInputFormDialogComponent = screen.getByTestId('address-form-mock')

    expect(closeIcon).toBeVisible()
    expect(addressInputFormDialogComponent).toBeVisible()
  })

  it('should have a title', () => {
    setup({ ...Common.args })

    const dialogHeading = screen.getByRole('heading', { name: 'Add New Address' })

    expect(dialogHeading).toBeVisible()
  })

  it('should disable save button', () => {
    setup({ ...Common.args, isAddressFormValid: false })

    const saveButton = screen.getByRole('button', { name: 'save' })

    expect(saveButton).toBeDisabled()
  })

  it('should render save and cancel button', () => {
    setup({ ...Common.args })

    const saveButton = screen.getByRole('button', { name: 'save' })
    const cancelButton = screen.getByRole('button', { name: 'cancel' })

    expect(saveButton).toBeVisible()
    expect(cancelButton).toBeVisible()
  })
})
