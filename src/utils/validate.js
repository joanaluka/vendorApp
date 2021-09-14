
// input validation functions

// TODO: better phone number validation
export const isValidPhoneNumber = (phoneNumber) => {
  let isValid = false
  
  if (
    (phoneNumber.length === 14 && parseInt(phoneNumber[0] === 0)) ||
    // Kenyan Phone Number
    phoneNumber.length === 13 || 
    // American phone number
    phoneNumber.length === 11
  ) {
    isValid = true
  }
  
  return isValid
}
