[next-storefront](../README.md) / useGetStoreLocations

# Module: useGetStoreLocations

## Table of contents

### Functions

- [useGetStoreLocations](useGetStoreLocations.md#usegetstorelocations)

## Functions

### useGetStoreLocations

▸ **useGetStoreLocations**(`searchParams`): `LocationType`

[Query hook] useGetStoreLocations uses the graphQL query

<b>spLocations(startIndex: Int, pageSize: Int, sortBy: String, filter: String, includeAttributeDefinition: Boolean): LocationCollection</b>

Description : Fetches the locations based on filter value, here filter value location code or 'geo near(${latitude}, ${longitude}, ${defaultRange})'.
'geo near' filter could be used to search by current location latitude and longitude.

Parameters passed to function getStoreLocations(param: { filter: string } | undefined) => expects filter containing location code or geo location

On success, returns the list of location

#### Parameters

| Name                  | Type     | Description                                                                                              |
| :-------------------- | :------- | :------------------------------------------------------------------------------------------------------- |
| `searchParams`        | `Object` | Expect 'location code' or 'geo near(${latitude}, ${longitude}, ${defaultRange})' inside the filter value |
| `searchParams.filter` | `string` | -                                                                                                        |

#### Returns

`LocationType`

'response?.spLocations?.items', which contains location list based on filter value request.

#### Defined in

[queries/locations/useGetStoreLocations/useGetStoreLocations.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/locations/useGetStoreLocations/useGetStoreLocations.ts#L46)
