export const useCurrentLocation = () => {
  const getCurrentLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => resolve(position.coords),
        (error) => reject(error)
      )
    )
  }

  return { getCurrentLocation }
}
