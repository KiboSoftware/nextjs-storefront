export type GetCartTakeoverResponse = {
  getOneTimeSecret?: {
    value?: {
      customerAccount?: {
        emailAddress?: string
        userName?: string
        firstName?: string
        lastName?: string
        userId?: string
        isAnonymous?: boolean
        isLocked?: boolean
        isActive?: boolean
        hasExternalPassword?: boolean
        id?: number
        customerSet?: string
        commerceSummary?: {
          totalOrderAmount?: any
        }
        companyOrOrganization?: string
        segments?: any
        taxExempt?: boolean
        taxId?: string
        externalId?: string
        auditInfo?: {
          updateDate?: string
          createDate?: string
          updateBy?: string
          createBy?: string
        }
        customerSinceDate?: string
        accountType?: string
      }
      accessToken?: string
      accessTokenExpiration?: string
      refreshToken?: string
      refreshTokenExpiration?: string
      userId?: string
      jwtAccessToken?: string
    }
  }
}
