[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useProduct

# Module: mutation_useProduct

## Table of contents

### Functions

- [useProductMutation](mutation_useProduct.md#useproductmutation)

## Functions

### useProductMutation

▸ **useProductMutation**(): `Object`

[Mutation hook] useProductMutation uses the graphQL mutation

</b>configureProduct(productCode: String!, includeOptionDetails: Boolean, skipInventoryCheck: Boolean, quantity: Int, purchaseLocation: String, variationProductCodeFilter: String, productOptionSelectionsInput: ProductOptionSelectionsInput): ConfiguredProduct</b>

Description : Update the product configurations

Parameters passed to internal function configureProduct(params: ConfigureProductDetails) => expects object containing productCode and updatedOptions.

#### Returns

`Object`

'response?.configureProduct', which has product details like productCode, purchaseLocation, options, productImages etc.

| Name               | Type                                                                         |
| :----------------- | :--------------------------------------------------------------------------- |
| `configureProduct` | `UseMutationResult`<`any`, `unknown`, `ConfigureProductDetails`, `unknown`\> |

#### Defined in

[mutations/useProductMutations/useProductMutation.ts:51](https://github.com/KiboSoftware/nextjs-storefront/blob/98414f4/hooks/mutations/useProductMutations/useProductMutation.ts#L51)
