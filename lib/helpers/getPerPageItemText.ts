import { B2BAccountCollection, B2BUserCollection } from '../gql/types'

interface PerPageItemTextArgs {
  data: B2BAccountCollection | B2BUserCollection | undefined
  mdScreen: boolean
  displayText: string
}

export const getPerPageItemText = ({ data, mdScreen, displayText }: PerPageItemTextArgs) => {
  if (!data) return `${mdScreen ? displayText : ''} 0 - 0 of 0`
  const { startIndex, pageSize, totalCount } = data
  const startRange = totalCount ? startIndex + 1 : startIndex
  const endRange = startIndex + pageSize
  return `${mdScreen ? displayText : ''} ${startRange} - ${
    endRange > totalCount ? totalCount : endRange
  } of ${totalCount}`
}
