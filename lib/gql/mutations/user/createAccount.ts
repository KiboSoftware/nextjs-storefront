const createAccountAndLoginMutation = /* GraphQL */ `
  mutation registerUser($customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput!) {
    account: createCustomerAccountAndLogin(
      customerAccountAndAuthInfoInput: $customerAccountAndAuthInfoInput
    ) {
      customerAccount {
        emailAddress
        userName
        firstName
        lastName
        localeCode
        id
        userId
        isAnonymous
        attributes {
          values
          fullyQualifiedName
        }
      }
      userId
      accessToken
      accessTokenExpiration
      refreshToken
      refreshTokenExpiration
      jwtAccessToken
    }
  }
`

const createAccountMutation = /* GraphQL */ `
  mutation registerUser($createAccountInput: CustomerAccountInput!) {
    account: createCustomerAccount(customerAccountInput: $createAccountInput) {
      emailAddress
      userName
      firstName
      lastName
      localeCode
      userId
      id
      isAnonymous
      attributes {
        values
        fullyQualifiedName
      }
    }
  }
`

const createAccountLoginMutation = /* GraphQL */ `
  mutation registerUserLogin($id: Int!, $createAccountLoginInput: CustomerLoginInfoInput!) {
    account: createCustomerAccountLogin(
      accountId: $id
      customerLoginInfoInput: $createAccountLoginInput
    ) {
      accessToken
      accessTokenExpiration
      refreshToken
      refreshTokenExpiration
      userId
      customerAccount {
        id
        emailAddress
        firstName
        userName
      }
    }
  }
`

export { createAccountAndLoginMutation, createAccountMutation, createAccountLoginMutation }
