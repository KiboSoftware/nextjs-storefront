[next-storefront](../README.md) / useGetPurchaseLocation

# Module: useGetPurchaseLocation

## Table of contents

### Functions

- [useGetPurchaseLocation](useGetPurchaseLocation.md#usepurchaselocationqueries)

## Functions

### useGetPurchaseLocation

▸ **useGetPurchaseLocation**(): `LocationType`

[Query hook] useGetPurchaseLocation uses the graphQL query

<b>spLocations(startIndex: Int, pageSize: Int, sortBy: String, filter: String, includeAttributeDefinition: Boolean): LocationCollection</b>

Description : Fetches the locations based on filter value, here filter contains location code stored in cookie.
Store locator icon on header, select the location code by zipcode and set it to cookie.
Then retrieving the location code from cookie to get the location name etc using this hook.

Parameters passed to function getPurchaseLocation(param: { filter: string } | undefined) => expects filter containing location code from the cookies.

On success, returns the first location detail from location list.

#### Returns

`LocationType`

'response?.spLocations?.items[0]', which contains first location from list as it will always return single item based on location code.

#### Defined in

[queries/useGetPurchaseLocation/useGetPurchaseLocation.ts:50](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useGetPurchaseLocation/useGetPurchaseLocation.ts#L50)
