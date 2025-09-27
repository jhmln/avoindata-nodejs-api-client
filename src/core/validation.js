export function validateBusinessId(businessId) {
  const regex = /^\d{7}-\d$/;
  if (!regex.test(businessId)) return false;

  const [digits, checkDigit] = businessId.split('-');
  const weights = [7, 9, 10, 5, 8, 4, 2];
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += parseInt(digits[i], 10) * weights[i];
  }

  const remainder = sum % 11;
  let calculatedCheckDigit = null;

  if (remainder === 0) {
    calculatedCheckDigit = 0;
  } else if (remainder === 1) {
    return false; // Invalid business ID
  } else {
    calculatedCheckDigit = 11 - remainder;
  }

  return parseInt(checkDigit, 10) === calculatedCheckDigit;
}

export function validateEnumeration(enumeration, value) {
  if (!enumeration || typeof enumeration !== 'object') {
    throw new Error('Argument "enumeration" is not an object');
  }

  return Object.values(enumeration).includes(value);
}
