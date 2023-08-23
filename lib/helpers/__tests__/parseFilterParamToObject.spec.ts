import { parseFilterParamToObject } from '../b2b/parseFilterParamToObject' // Import your function

describe('parseFilterParamToObject', () => {
  it('should parse filterParam correctly', () => {
    const filterParam = 'name cont Sample and number eq 123 and status eq Pending'
    const expectedFilters = {
      name: 'Sample',
      number: '123',
      expirationDate: '',
      status: 'Pending',
      others: '',
    }

    const result = parseFilterParamToObject(filterParam)

    expect(result).toEqual(expectedFilters)
  })

  it('should handle empty filterParam', () => {
    const filterParam = ''
    const expectedFilters = {
      name: '',
      number: '',
      expirationDate: '',
      status: '',
      others: '',
    }

    const result = parseFilterParamToObject(filterParam)

    expect(result).toEqual(expectedFilters)
  })

  it('should handle other filter conditions', () => {
    const filterParam = 'customerAccountId eq 1002'
    const expectedFilters = {
      name: '',
      number: '',
      expirationDate: '',
      status: '',
      others: 'customerAccountId eq 1002',
    }

    const result = parseFilterParamToObject(filterParam)

    expect(result).toEqual(expectedFilters)
  })
})
