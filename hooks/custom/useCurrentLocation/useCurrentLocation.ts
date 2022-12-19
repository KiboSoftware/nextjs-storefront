/**
 * @module useCurrentLocation
 */

/**
 * [Custom Hook] useCurrentLocation hooks used to get the user's current location coordinates.
 *
 * navigator.geolocation.getCurrentPosition method gets the user’s current position and accepts 3 parameters; a success callback function, an error callback function and a position options object.
 *
 * If successful, we will set the latitude and the longitude. These values are stored in position.coords.latitude and position.coords.longitude.
 *
 * If an error occurred, it will reject the promise with error.
 *
 * @returns The promise with current Geo location coordinates
 */

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
