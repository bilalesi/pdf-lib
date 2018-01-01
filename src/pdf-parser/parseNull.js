/* @flow */
import { PDFNull } from '../pdf-objects';
import { arrayToString, trimArray } from '../utils';

import type { ParseHandlers } from '.';

/**
Accepts an array of bytes as input. Checks to see if the first characters in the
trimmed input make up a PDF Null value.

If so, returns a tuple containing (1) an object representing the parsed PDF Null
value and (2) a subarray of the input with the characters making up the parsed
null value removed. The "onParseNull" parse handler will also be called with the
PDFNull object.

If not, null is returned.
*/
const parseNull = (
  input: Uint8Array,
  { onParseNull }: ParseHandlers = {},
): ?[PDFNull, Uint8Array] => {
  const trimmed = trimArray(input);
  if (arrayToString(trimmed, 0, 4) !== 'null') return null;

  if (onParseNull) onParseNull(PDFNull.instance);
  return [PDFNull.instance, trimmed.subarray(4)];
};

export default parseNull;
