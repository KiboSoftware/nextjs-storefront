export enum FormStates {
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
  VALIDATE = 'VALIDATE',
}

export enum FulfillmentOptions {
  SHIP = 'Ship',
  PICKUP = 'Pickup',
}

export enum PaymentType {
  CREDITCARD = 'CreditCard',
}

export enum OrderStatus {
  ABANDONED = 'Abandoned',
}

const currentYear = new Date().getFullYear()
export const FacetListForHistory = [
  { label: 'last-30-days', filterValue: 'M-1', isApplied: false, isDisplayed: true, count: 0 },
  { label: 'last-6-months', filterValue: 'M-6', isApplied: false, isDisplayed: true, count: 0 },
  {
    label: `${currentYear}`,
    filterValue: `Y-${currentYear}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
  {
    label: `${currentYear - 1}`,
    filterValue: `Y-${currentYear - 1}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
  {
    label: `${currentYear - 2}`,
    filterValue: `Y-${currentYear - 2}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
  {
    label: `${currentYear - 3}`,
    filterValue: `Y-${currentYear - 3}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
]

export const FacetTypeForHistory = [
  { facetType: 'Value', label: 'time-filter', values: FacetListForHistory },
]
