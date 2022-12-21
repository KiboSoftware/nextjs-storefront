[next-storefront](../README.md) / useCurrentLocation

# Module: useCurrentLocation

## Table of contents

### Functions

- [useCurrentLocation](useCurrentLocation.md#usecurrentlocation)

## Functions

### useCurrentLocation

▸ **useCurrentLocation**(): `Object`

[Custom Hook] useCurrentLocation hooks used to get the user's current location coordinates.

navigator.geolocation.getCurrentPosition method gets the user’s current position and accepts 3 parameters; a success callback function, an error callback function and a position options object.

If successful, we will set the latitude and the longitude. These values are stored in position.coords.latitude and position.coords.longitude.

If an error occurred, it will reject the promise with error.

#### Returns

`Object`

The promise with current Geo location coordinates

| Name                 | Type                                       |
| :------------------- | :----------------------------------------- |
| `getCurrentLocation` | () => `Promise`<`GeolocationCoordinates`\> |

#### Defined in

[custom/useCurrentLocation/useCurrentLocation.ts:17](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/custom/useCurrentLocation/useCurrentLocation.ts#L17)
