const getGroups = /* GraphQL */ `
  query getGroups {
    getGroups {
      code
      name
      description
      auditInfo {
        createBy
      }
    }
  }
`
export default getGroups
