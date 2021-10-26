export const isValidFurigana = (furigana: string): boolean => {
  const regex = /^[ア-ン゛゜ァ-ォャ-ョー]+$/u
  return regex.test(furigana)
}

export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(email)
}

export const isValidTelephone = (telephone: string): boolean => {
  if (telephone.match(/^0\d{1,4}-\d{1,4}-\d{3,4}$/)) {
    return true
  } else {
    return false
  }
}
