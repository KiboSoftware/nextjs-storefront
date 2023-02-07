[next-storefront](../README.md) / useDebounce

# Module: useDebounce

## Table of contents

### Functions

- [useDebounce](useDebounce.md#usedebounce)

## Functions

### useDebounce

▸ **useDebounce**(`value`, `delay`): `string`

[Custom Hook] The debounced value will reflect the latest value when the useDebounce hook called for the specified time period.

Uses of useDebounce to prevent API calls from being fired on every keystroke.

setDebouncedValue(value) will update debounced value after delay

clearTimeout(handler) will cancel the timeout if value changes. Timeout gets cleared and restarted

#### Parameters

| Name    | Type     | Description                                              |
| :------ | :------- | :------------------------------------------------------- |
| `value` | `string` | Excepts user entered value on search suggestions feature |
| `delay` | `number` | Expect debounce timeout value                            |

#### Returns

`string`

The latest debounced value on specified time period.

#### Defined in

[custom/useDebounce/useDebounce.ts:22](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/custom/useDebounce/useDebounce.ts#L22)
