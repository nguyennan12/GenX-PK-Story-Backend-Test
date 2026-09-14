import type { InvoiceCalcInput } from '../validators/invoice.validator.js';

export interface InvoiceCalcResult {
  subtotal: number;
  discount: number;
  refund: number;
  total: number;
}

const calc = (_input: InvoiceCalcInput): InvoiceCalcResult => {
  throw new Error('Not implemented yet');
}

export const InvoiceService = { calc };
