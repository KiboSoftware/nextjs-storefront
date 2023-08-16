import { buildQuotesFilterParam } from '../b2b/buildQuotesFilterParam'

describe('buildQuotesFilterParam', () => {
  it('should build the correct filter parameter string with "or" between name and number conditions', () => {
    const filters = {
      name: 'SampleName',
      number: '42',
      expirationDate: '2023-12-31',
      status: 'active',
    }

    const expectedFilterParam =
      'name cont SampleName or number eq 42 and expirationDate ge 2023-12-31 and status eq active'

    const result = buildQuotesFilterParam(filters)

    expect(result).toEqual(expectedFilterParam)
  })

  it('should build the correct filter parameter string without "or" between name and number conditions', () => {
    const filters = {
      name: 'SampleName',
      number: '',
      expirationDate: '2023-12-31',
      status: 'active',
    }

    const expectedFilterParam =
      'name cont SampleName and expirationDate ge 2023-12-31 and status eq active'

    const result = buildQuotesFilterParam(filters)

    expect(result).toEqual(expectedFilterParam)
  })
})
