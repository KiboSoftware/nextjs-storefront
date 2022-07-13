import { useCurrentLocation } from './useCurrentLocation'

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 10,
          longitude: 10,
        },
      })
    )
  ),
}

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
})

describe('[hooks] useCurrentLocation', () => {
  const { getCurrentLocation } = useCurrentLocation()

  it('should return geo location coordinates', async () => {
    const { longitude, latitude } = await getCurrentLocation()
    expect(longitude).toBe(10)
    expect(latitude).toBe(10)
  })
})
