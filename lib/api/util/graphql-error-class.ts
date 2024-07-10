type GraphQLOperation = {
  operationType: string | undefined
  operationName: string | undefined
}

export class GraphQLError extends Error {
  metadata: GraphQLOperation
  rawErrors: any
  code: string | undefined
  correlationId?: string | null

  constructor(
    responseErrors: any,
    operationMetaData: GraphQLOperation,
    correlationId?: string | null
  ) {
    super(responseErrors[0]?.extensions?.response?.body?.message)

    this.name = 'GraphQLError' // Set the name of the error
    this.code = responseErrors[0]?.extensions.response.status
    this.rawErrors = responseErrors
    this.metadata = operationMetaData
    this.correlationId = correlationId
  }

  toJson() {
    return {
      gql: {
        ...this.metadata,
        statusCode: this.code,
      },
      correlationId: this.correlationId,
    }
  }

  dumpErrors(): string {
    if (this.rawErrors && typeof this.rawErrors === 'object') {
      return JSON.stringify(this.rawErrors, null, 2)
    }
    return ''
  }
}
