/**
 * @module useExecuteTask
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { quoteKeys } from '@/lib/react-query/queryKeys'

interface ExecuteTaskParams {
  params: {
    quoteId: string
    taskName?: string
    object?: object
  }
}

const executeTask = async (params: ExecuteTaskParams) => {
  const response = await fetch('/api/execute-task', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  return await response.json()
}

/**
 * [Mutation hook] executeTask uses the graphQL mutation
 *
 * <b>executeTask($quoteId: String!, $taskName: String, $object: Object): Quote</b>
 *
 * Description : execute task based on accountId and taskName
 *
 * Parameters passed to function executeTask(params: ExecuteTaskParams) => expects object of type 'ExecuteTaskParams' containing quoteId, taskName and object
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result
 *
 * @returns 'response?.executeTask' which add user to group
 */
export const useExecuteTask = () => {
  const queryClient = useQueryClient()
  return {
    executeTask: useMutation({
      mutationFn: executeTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
      },
    }),
  }
}
