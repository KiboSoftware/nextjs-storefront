import { CustomerAccount, CustomerAuthTicket } from '@/lib/gql/types'

export const userMock: { customerAccount: CustomerAccount } = {
  customerAccount: {
    id: 1074,
    userId: '3e69cbd5f3694a76916e64451cb76968',
    firstName: 'Suman',
    lastName: 'Patro',
    emailAddress: 'suman@email.com',
    userName: 'suman@email.com',
    isAnonymous: false,
  },
}
export const loginUserMock: { account: CustomerAuthTicket } = {
  account: {
    customerAccount: {
      id: 1074,
      userId: '3e69cbd5f3694a76916e64451cb76968',
      firstName: 'Suman',
      lastName: 'Patro',
      emailAddress: 'suman@email.com',
      userName: 'suman@email.com',
      isAnonymous: false,
    },
    accessToken:
      'S8k9/qdTXi9359KfnklVehBSuqodqI1buEQ6io903z3yTsfvc9MMqimS8tGbPJn4BLyp/gUaHkvBv8t274I2huPDiw8wIyaxJN0yYOcPMZu2+AviCGnbTYP9FbeWH3NRvf4qngUHx2BYK+j0xbbEcHZ4T7XrfTO/yufenpDGMkVLUxWo+LUrho/dNd3QcLZalZwo8yyZEFx4VH/NU4DcKlMFVrOcTyhk0y9K87IvrmvnD4jxFaJbLn+3og9q1bayn1hG7nwC2XU5OWJWaMwSnF96T4kUqRpqFF2N2SmOiDJHawJl+sKLHn2ZYpPNKEmWyiDEbBi+S9x//6zdT5GCRRAUBT0iXXgN7KdR/epxfaEY372HUxCLUYn/4BQRggGJ7PdA4z+dYrfAA59gVYH2G3/bKzmt8zPvFitgTGKJh/zl0mzMyx8yJoAz/STpoQUn',
    accessTokenExpiration: 1655298784785,
    refreshToken: 'c679d7ce7fbe4c4f94f2355c767f0337',
    refreshTokenExpiration: 1655384284785,
    userId: '3e69cbd5f3694a76916e64451cb76968',
    jwtAccessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tL2FwcF9jbGFpbXMiOnsic3NsIjoiMCIsImVudCI6IjAiLCJtdHIiOiIwIiwidWMiOiIwIiwicm5kIjo1NjQzNjg0MzUsImFpZCI6IjMzNjllM2ViNWYwMDQ0NWQ5OWNiYjQxMzg2NTdkN2MwIiwiYWtleSI6Im1venVhZG1pbi5tcG9jX2FwcC4xLjAuMC5SZWxlYXNlIiwiYnYiOlsyLDEwNDAyNTI4NjIsNywxMzQyMTc3MjcsNiwtNjg3ODUzNTM4LDUsMjY4NDE4MzAzLDAsNTIxMDkxODcwLDMsNTI4MjM2MDMyLDEsMjA3ODk0ODg5NF0sImV4cCI6IjIwMjItMDYtMTVUMTM6MzA6MzEiLCJlbnYiOiJkZXYxMCIsImIuQXBwTmFtZSI6Im1wb2NfYXBwIn0sImh0dHBzOi8vd3d3LmtpYm9jb21tZXJjZS5jb20vdXNlcl9jbGFpbXMiOnsicm5kIjoxMjQzMTY5NjUsImFub24iOiIwIiwidWlkIjoiM2U2OWNiZDVmMzY5NGE3NjkxNmU2NDQ1MWNiNzY5NjgiLCJidiI6WzMxLDQxOTQzMDRdLCJlbnYiOiJkZXYxMCIsImV4cCI6IjIwMjItMDYtMTVUMTM6MTM6MDQiLCJzdCI6IlNob3BwZXIiLCJiLkFjY291bnRJZCI6IjEwNzQiLCJiLlNpdGVJZCI6IjIyMTE2IiwiYi5fc2Vzc18iOiJ7XCJpXCI6XCI4NTM1ZTNmYTc1NzM0NTBiOWM3YzRjZTFmOGYzMzUxZlwiLFwicFwiOmZhbHNlLFwicDJcIjpudWxsLFwiYnRcIjpmYWxzZSxcImNcIjpcIjIwMjItMDYtMTVUMTI6NTg6MDQuMzQxODM1WlwiLFwiZVwiOlwiMjAyMi0wNi0xNVQxMjo1ODowNC4zNDE4MzVaXCJ9IiwiYi5UZW5hbnRJZCI6IjE3ODI4IiwiYi5QcmV2aW91c0Fub255bW91c0lkIjoiNThkY2UxZjc2OGIyNDJkYzhhZThiOTM1NGU4Y2NjZTciLCJiLlVzZXJGaXJzdE5hbWUiOiJTdW1hbiIsImIuVXNlckxhc3ROYW1lIjoiUGF0cm8ifSwidW5pcXVlX25hbWUiOiIzZTY5Y2JkNWYzNjk0YTc2OTE2ZTY0NDUxY2I3Njk2OCIsInN1YiI6IjNlNjljYmQ1ZjM2OTRhNzY5MTZlNjQ0NTFjYjc2OTY4Iiwic2lkIjoiODUzNWUzZmE3NTczNDUwYjljN2M0Y2UxZjhmMzM1MWYiLCJuYmYiOjE2NTUyOTc4ODQsImV4cCI6MTY1NTI5OTgzMSwiaWF0IjoxNjU1Mjk3ODg0LCJpc3MiOiJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tIiwiYXVkIjoiaHR0cHM6Ly93d3cua2lib2NvbW1lcmNlLmNvbSJ9.EiC8OIYO8T2IWqCiMcMlAsnG6ylENY8NOZO0ixqaAoM',
  },
}
