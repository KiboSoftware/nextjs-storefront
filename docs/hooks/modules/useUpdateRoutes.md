[next-storefront](../README.md) / useUpdateRoutes

# Module: useUpdateRoutes

## Table of contents

### Functions

- [useUpdateRoutes](useUpdateRoutes.md#useupdateroutes)

## Functions

### useUpdateRoutes

▸ **useUpdateRoutes**(): `Object`

[Custom Hook] Updates the URL with selected filter/sort/search values passing them as query params.

Return two functions:

1. changeFilters(filters: string) => Accepts a string value or empty string and appends to the URL
2. updateRoute(queryParam: string) => Accepts a string value or empty string and determines the positioning of queryParam in URL and then calls changeFilters(filters: string)

#### Returns

`Object`

| Name            | Type                               |
| :-------------- | :--------------------------------- |
| `changeFilters` | (`filters`: `string`) => `void`    |
| `updateRoute`   | (`queryParam`: `string`) => `void` |

#### Defined in

[custom/useUpdateRoutes/useUpdateRoutes.ts:16](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/custom/useUpdateRoutes/useUpdateRoutes.ts#L16)
