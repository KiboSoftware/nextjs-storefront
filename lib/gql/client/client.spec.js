import { URL } from 'url'

import { makeGraphQLClient } from './index'

describe('[lib] - GraphQL Client', () => {
  it('should create a new graphql client using .env for endpoint', () => {
    const expected = process.env.NEXT_PUBLIC_URL
    const client = makeGraphQLClient()
    const clientUrl = new URL(client.url)
    expect(clientUrl.origin).toEqual(expected)
  })
  it('should create a new graphql client using endpoint as parameter', () => {
    const endpoint = 'https://kiboshop/api/graphql'
    const client = makeGraphQLClient(endpoint)
    const clientUrl = new URL(client.url)
    expect(clientUrl.href).toEqual(endpoint)
  })
})
