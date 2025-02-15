export const CURRENCY = {
  code: 'ETB',
  symbol: 'Birr',
  position: 'after' as const, // Controls if symbol appears before or after amount
  precision: 2,               // Number of decimal places
  separator: {
    decimal: '.',            // Decimal point character
    thousand: ','            // Thousand separator character
  }
}; 