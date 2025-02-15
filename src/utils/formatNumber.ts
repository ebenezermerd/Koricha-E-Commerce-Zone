import numeral from 'numeral';
import { CURRENCY } from 'src/config/currency';

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
  return new Intl.NumberFormat('am-ET').format(Number(number));
}

export function fCurrency(number: InputValue) {
  const num = Number(number);
  
  const formatted = new Intl.NumberFormat('am-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: CURRENCY.precision,
    maximumFractionDigits: CURRENCY.precision,
  }).format(num);

  // Uses the symbol from currency config
  return formatted.replace('ETB', 'Br');
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
