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
  const getCurrentLocation = (
    returnZipCode?: boolean
  ): Promise<GeolocationCoordinates & { zipCode?: string }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords
            if (returnZipCode) {
              getZipCode(latitude, longitude).then((zipCode) => {
                resolve({ ...position.coords, zipCode })
              })
            } else {
              resolve(position.coords)
            }
          },
          (error) => reject(error)
        )
      }
    })
  }

  return { getCurrentLocation }
}

const getZipCode = async (latitude: number, longitude: number): Promise<string> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  )
  const data = await response.json()
  return data.address.postcode
}
