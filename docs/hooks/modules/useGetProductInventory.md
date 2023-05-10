[next-storefront](../README.md) / useGetProductInventory

# Module: useGetProductInventory

## Table of contents

### Functions

- [useGetProductInventory](useGetProductInventory.md#usegetproductinventory)

## Functions

### useGetProductInventory

▸ **useGetProductInventory**(`productCode`, `locationCodes`): `UseProductLocationInventoryType`

[Query hook] useGetProductInventory uses the graphQL query

<b>productLocationInventory(productCode: String!, locationCodes: String): LocationInventoryCollection</b>

Description : Fetches details about inventory available on specified locations by providing productCode and locationCodes.

Parameters passed to function loadProductLocationInventory(productCode: string, locationCodes: string) => expects productCode and locationCodes.

On success, returns the inventory details with 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `productCode` | `string` | unique product code for which inventory needed to be fetched |
| `locationCodes` | `string` | location codes could be single string value or comma separated string value |

#### Returns

`UseProductLocationInventoryType`

'response?.productLocationInventory?.items', which contains list of available inventories.

#### Defined in

[queries/product/useGetProductInventory/useGetProductInventory.ts:49](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/product/useGetProductInventory/useGetProductInventory.ts#L49)
