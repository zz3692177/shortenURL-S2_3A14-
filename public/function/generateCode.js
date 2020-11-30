function generateCode(digit) {
  const codeCollection = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = []
  let randomIndex = 0
  for (let i = 0; i < digit; i++) {
    randomIndex = Math.floor(Math.random() * codeCollection.length)
    code += codeCollection[randomIndex]
  }
  return code
}

module.exports = generateCode

