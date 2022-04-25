import { createContext } from 'react'

export interface UserEnteredDetails {
  isFormValid: boolean
  details: {
    email: string
    firstName?: string
    lastName?: string
    password?: string
  }
}

export interface UserEnteredShipping {
  isFormValid: boolean
  shipping: {
    fulfillmentContact: {
      firstName: string
      lastNameOrSurname: string
      address: {
        address1: string
        stateOrProvince: string
        postalOrZipCode: string
        countryCode: string
        cityOrTown: string
        address2: string
      }
      phoneNumbers: {
        home: string
      }
      email: string
    }
    isDestinationCommercial: false
  }
}

export interface UserEnteredPayment {
  isFormValid: boolean
}

interface InitialState {
  setUserEnteredDetails: (details: UserEnteredDetails) => void
  setUserEnteredShipping: (shipping: UserEnteredShipping) => void
  setUserEnteredPayment: (shipping: UserEnteredPayment) => void
}

const initialState: InitialState = {
  setUserEnteredDetails: (details: UserEnteredDetails) => console.log(details),
  setUserEnteredShipping: (shipping: UserEnteredShipping) => console.log(shipping),
  setUserEnteredPayment: (payment: UserEnteredPayment) => console.log(payment),
}

const stepperContext = createContext(initialState)
export default stepperContext
