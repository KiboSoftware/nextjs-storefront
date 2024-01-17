const queryPattern = /(?:query)\s+(\w+)/
const mutationpattern = /(?:mutation)\s+(\w+)/

function getOperationDetails(query: string) {
  let match = query?.match(queryPattern)
  if (match && match[1]) {
    return { operationType: 'query', operationName: match[1] }
  }

  match = query?.match(mutationpattern)
  if (match && match[1]) {
    return { operationType: 'mutation', operationName: match[1] }
  }

  return { operationType: undefined, operationName: undefined }
}

export default getOperationDetails
