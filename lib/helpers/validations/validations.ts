export const validatePassword = (password: string) => {
  const isHavingAtLeastEightCharacters: boolean = password.toString().length >= 8
  const isHavingAtLeastOneNumber: boolean = /\d/.test(password)
  const isHavingAtLeastOneCapitalLetter: boolean = /[A-Z]/.test(password)
  const isHavingAtLeastOneSpecialCharacter: boolean = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    password
  )

  return {
    isHavingAtLeastEightCharacters,
    isHavingAtLeastOneNumber,
    isHavingAtLeastOneCapitalLetter,
    isHavingAtLeastOneSpecialCharacter,
  }
}

export const isPasswordValid = (password: string) => {
  const {
    isHavingAtLeastEightCharacters,
    isHavingAtLeastOneNumber,
    isHavingAtLeastOneCapitalLetter,
    isHavingAtLeastOneSpecialCharacter,
  } = validatePassword(password)

  return (
    isHavingAtLeastEightCharacters &&
    isHavingAtLeastOneNumber &&
    isHavingAtLeastOneCapitalLetter &&
    isHavingAtLeastOneSpecialCharacter
  )
}
