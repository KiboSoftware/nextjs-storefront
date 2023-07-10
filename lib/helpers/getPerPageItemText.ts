import { B2BAccountCollection } from '../gql/types'

interface PerPageItemTextArgs {
  data: B2BAccountCollection | undefined
  mdScreen: boolean
  displayText: string
}

export const getPerPageItemText = ({ data, mdScreen, displayText }: PerPageItemTextArgs) => {
  if (!data) return `${mdScreen ? displayText : ''} 0 - 0 of 0`
  const { startIndex, pageSize, totalCount } = data
  const startRange = startIndex + 1
  const endRange = startIndex + pageSize
  return `${mdScreen ? displayText : ''} ${startRange} - ${
    endRange > totalCount ? totalCount : endRange
  } of ${totalCount}`
}
