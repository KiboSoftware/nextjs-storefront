import { CrMeasurement, Maybe, PrMeasurement } from '../gql/types'

export const formatProductMeasurementUnit = (
  measurement?: Maybe<CrMeasurement> | Maybe<PrMeasurement>
): Maybe<CrMeasurement> | Maybe<PrMeasurement> | undefined => {
  if (measurement?.unit === 'in') {
    measurement.unit = 'INCHES'
  }

  if (measurement?.unit === 'lbs' && measurement?.value) {
    measurement.unit = 'GRAMS'
    measurement.value = measurement.value * 453.592
  }

  return measurement
}
