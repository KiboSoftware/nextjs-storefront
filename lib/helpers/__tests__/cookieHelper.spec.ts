import * as cookienext from 'cookies-next'

import { setPurchaseLocationCookie } from '..'

describe('[helpers] cookie helper', () => {
  it('should set cookie value', async () => {
    const mockSetCookie = jest.spyOn(cookienext, 'setCookie')

    setPurchaseLocationCookie('RICHMOND')
    expect(mockSetCookie).toHaveBeenCalled()
  })
})
