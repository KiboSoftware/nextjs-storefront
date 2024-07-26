import { quoteFragment } from '../../../fragments'

const executeTaskMutation = /* GraphQL */ `
  mutation executeTask($quoteId: String!, $taskName: String, $object: Object) {
    executeTask(quoteId: $quoteId, taskName: $taskName, object: $object) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default executeTaskMutation
