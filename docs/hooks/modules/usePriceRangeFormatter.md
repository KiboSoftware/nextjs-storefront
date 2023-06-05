[next-storefront](../README.md) / usePriceRangeFormatter

# Module: usePriceRangeFormatter

## Table of contents

### Functions

- [usePriceRangeFormatter](usePriceRangeFormatter.md#usepricerangeformatter)

## Functions

### usePriceRangeFormatter

▸ **usePriceRangeFormatter**(`priceRange`): `undefined` \| { `lower`: { `price`: `null` \| `string` ; `salePrice`: `null` \| `string` } ; `upper`: { `price`: `null` \| `string` ; `salePrice`: `null` \| `string` } }

[Custom Hook] It will format the price range object with translations

#### Parameters

| Name         | Type                | Description                                     |
| :----------- | :------------------ | :---------------------------------------------- |
| `priceRange` | `ProductPriceRange` | Excepts price range object received from server |

#### Returns

`undefined` \| { `lower`: { `price`: `null` \| `string` ; `salePrice`: `null` \| `string` } ; `upper`: { `price`: `null` \| `string` ; `salePrice`: `null` \| `string` } }

Translated price range object

#### Defined in

[custom/usePriceRangeFormatter/usePriceRangeFormatter.ts:18](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/custom/usePriceRangeFormatter/usePriceRangeFormatter.ts#L18)
