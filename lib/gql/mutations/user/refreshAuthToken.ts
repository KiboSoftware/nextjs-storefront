export const refreshAuthToken = /* GraphQL */ `
  mutation refreshCustomerAuthTickets(
    $accountId: Int
    $refreshToken: String
  ) {
    refreshCustomerAuthTickets(
      accountId: $accountId
      refreshToken: $refreshToken
    ) {

      customerAccount {
          id
          userId
          firstName
          lastName
          emailAddress
          userName
          isAnonymous
          accountType
          companyOrOrganization
        }
        accessToken
        accessTokenExpiration
        refreshToken
        refreshTokenExpiration
        userId
        jwtAccessToken
      
    }
  }
`
export default refreshAuthToken