import * as cookienext from 'cookies-next'

import { setOrDeleteCookie } from '..'

describe('[helpers] cookie helper', () => {
  it('should set or delete cookie value', async () => {
    const mockDeleteCookie = jest.spyOn(cookienext, 'deleteCookie')
    const mockSetCookie = jest.spyOn(cookienext, 'setCookie')

    setOrDeleteCookie('ALB')
    expect(mockSetCookie).toHaveBeenCalled()
    setOrDeleteCookie(null)
    expect(mockDeleteCookie).toHaveBeenCalled()
  })
})
