const getOneTimeSecretQuery = /* GraphQL */ `
  query oneTimeSecret($secretId: String!) {
    getOneTimeSecret(secretId: $secretId) {
      value
    }
  }
`
export default getOneTimeSecretQuery
