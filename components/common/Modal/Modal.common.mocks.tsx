export const onClose = jest.fn()

export const useArgs = jest.mock('@storybook/client-api', () => {
  return {
    useArgs: jest.fn(() => {
      const open = true
      const updateArgs = jest.fn()
      return [{ open }, updateArgs]
    }),
  }
})
