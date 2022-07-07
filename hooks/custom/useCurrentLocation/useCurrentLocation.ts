export const useCurrentLocation = () => {
  // const getCurrentLocation = async () => {
  //   return navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  // }

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
