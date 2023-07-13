import { getPerPageItemText } from '../getPerPageItemText'

const displayText = 'Displaying'
const mdScreen = false
const data = {
  items: [],
  startIndex: 0,
  pageSize: 5,
  totalCount: 17,
  pageCount: 0,
}

describe('[helpers] getPerPageItemText function', () => {
  it('should return the text with 0 values for large screen', () => {
    const data = undefined
    const mdScreen = true

    expect(getPerPageItemText({ data, mdScreen, displayText })).toStrictEqual(
      'Displaying 0 - 0 of 0'
    )
  })

  it('should return the text with 0 values for mobile screen', () => {
    const data = undefined

    expect(getPerPageItemText({ data, mdScreen, displayText })).toStrictEqual(' 0 - 0 of 0')
  })

  it('should return the text with start and end range for large screen', () => {
    const mdScreen = true

    expect(getPerPageItemText({ data, mdScreen, displayText })).toStrictEqual(
      'Displaying 1 - 5 of 17'
    )
  })

  it('should return the text start and end range for large screen', () => {
    expect(getPerPageItemText({ data, mdScreen, displayText })).toStrictEqual(' 1 - 5 of 17')
  })
})
