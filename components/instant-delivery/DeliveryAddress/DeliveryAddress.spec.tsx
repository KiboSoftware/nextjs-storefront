import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import DeliveryAddress from './DeliveryAddress'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { useGetStoreServiceBoundary } from '@/hooks'

jest.mock('@/hooks', () => ({
  useGetStoreServiceBoundary: jest.fn(),
}))

const setDeliveryAddressMock = jest.fn()
const setStoreBoundaryMock = jest.fn()

const setup = () => {
  renderWithQueryClient(
    <DeliveryAddress
      deliveryAddress={undefined}
      setDeliveryAddress={setDeliveryAddressMock}
      storeBoundary={undefined}
      setStoreBoundary={setStoreBoundaryMock}
    />
  )
}

describe('[component] - DeliveryAddress', () => {
  it('should render component', () => {
    const useGetStoreServiceBoundaryMock = useGetStoreServiceBoundary as jest.Mock
    useGetStoreServiceBoundaryMock.mockReturnValue(['003', '002'])

    setup()

    expect(screen.getByText(/delivery-solutions-street/i)).toBeVisible()
    expect(screen.getByText(/delivery-solutions-city/i)).toBeVisible()
    expect(screen.getByText(/delivery-solutions-country/i)).toBeVisible()
    expect(screen.getByText(/delivery-solutions-state/i)).toBeVisible()
    expect(screen.getByText(/delivery-solutions-zipcode/i)).toBeVisible()

    screen.getByRole('textbox', { name: /delivery-solutions-street/i })
    screen.getByRole('textbox', { name: /delivery-solutions-city/i })
    screen.getByRole('textbox', { name: /delivery-solutions-country/i })
    screen.getByRole('textbox', { name: /delivery-solutions-state/i })
    screen.getByRole('textbox', { name: /delivery-solutions-zipcode/i })

    screen.getByRole('button', { name: /confirm\-address/i })
  })

  it('should show validation messages', async () => {
    const useGetStoreServiceBoundaryMock = useGetStoreServiceBoundary as jest.Mock
    useGetStoreServiceBoundaryMock.mockReturnValue(['003', '002'])

    setup()

    const confirmButton = screen.getByRole('button', { name: /confirm\-address/i })

    await userEvent.click(confirmButton)
    const requiredFields = screen.getAllByText(/this\-field\-is\-required/i)

    expect(requiredFields.length).toBe(5)
  })

  it('should call callback function if address validation is successfull', async () => {
    const useGetStoreServiceBoundaryMock = useGetStoreServiceBoundary as jest.Mock
    useGetStoreServiceBoundaryMock.mockReturnValue(['003', '002'])

    setup()

    const street = screen.getByRole('textbox', { name: /delivery-solutions-street/i })
    const city = screen.getByRole('textbox', { name: /delivery-solutions-city/i })
    const country = screen.getByRole('textbox', { name: /delivery-solutions-country/i })
    const state = screen.getByRole('textbox', { name: /delivery-solutions-state/i })
    const zipcode = screen.getByRole('textbox', { name: /delivery-solutions-zipcode/i })

    await userEvent.type(street, 'street')
    await userEvent.type(city, 'city')
    await userEvent.type(country, 'country')
    await userEvent.type(state, 'state')
    await userEvent.type(zipcode, 'zipcode')

    const confirmButton = screen.getByRole('button', { name: /confirm\-address/i })
    await userEvent.click(confirmButton)

    expect(setDeliveryAddressMock).toHaveBeenCalledWith({
      street: 'street',
      city: 'city',
      country: 'country',
      state: 'state',
      zipcode: 'zipcode',
    })
  })
})
