[next-storefront](../README.md) / useGetProductPrice

# Module: useGetProductPrice

## Table of contents

### Functions

- [useGetProductPrice](useGetProductPrice.md#usegetproductprice)

## Functions

### useGetProductPrice

▸ **useGetProductPrice**(`productCode`, `useSubscriptionPricing`): `useProductPriceResponse`

[Query hook] useGetProductPrice uses the graphQL query

Description : Fetches the price details based on product code and useSubscriptionPricing.

Parameters passed to function fetchProductPrice( productCode: String, useSubscriptionPricing: Boolean)

On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `productCode` | `string` | unique product code for which inventory needed to be fetched |
| `useSubscriptionPricing` | `boolean` | used to check if the product has subscription price or not |

#### Returns

`useProductPriceResponse`

'response?.product', which contains list of product price.

#### Defined in

[queries/product/useGetProductPrice/useGetProductPrice.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/product/useGetProductPrice/useGetProductPrice.ts#L46)
