export default function imgFromString(input) {
  if (input) {
    // Convert the input to a string
    let str = String(input).trim()

    // Ensure the Base64 string is properly padded
    while (str.length % 4 !== 0) {
      str += '='
    }
    // Check if the Base64 string is valid
    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/
    if (!base64Pattern.test(str)) {
      console.error('Invalid Base64 string:', str)
      throw new Error('Invalid Base64 string')
    }
    // Conversion
    const base64String = str
    const imageUrl = `data:image/png;base64,${base64String}`

    return imageUrl
  } else {
    return null
  }
}
