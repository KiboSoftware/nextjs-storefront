import type { Maybe, ReturnReason } from '@/lib/gql/types'

export const returnReasonsMock: Maybe<ReturnReason> | any = {
  returnReasons: {
    items: [
      'Damaged',
      'Defective',
      'Missing Parts',
      'Different Expectations',
      'Late',
      'No Longer Wanted',
      'Other',
    ],
    totalCount: 7,
  },
}
