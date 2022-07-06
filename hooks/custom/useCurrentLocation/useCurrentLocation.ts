import { useState } from 'react'

import type { GeoCoords } from '@/lib/types/GeoCoords'

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<GeoCoords>()
  const [error, setError] = useState(null)

  const handleSuccess = (currentLocation: { coords: GeoCoords }) => {
    const { latitude, longitude } = currentLocation.coords
    setCurrentLocation({ latitude, longitude })
  }

  const handleError = (error: any) => {
    setError(error.message)
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  }

  return { currentLocation, error, getCurrentLocation }
}
