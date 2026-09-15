import type { InvoiceCalcRequest } from '../validators/invoice.validator.js';

export interface InvoiceCalcResponse {
  subtotal: number;
  discount: number;
  refund: number;
  total: number;
}

const calc = (request: InvoiceCalcRequest): InvoiceCalcResponse => {
  const subtotal = request.courseType === 'MONTHLY'
    ? request.basePrice * request.months
    : request.basePrice;
  
  const rawDiscount = request.promoCode 
    ? discountCalculators[request.promoCode](subtotal)
    : 0;
    
  const discount = Math.min(rawDiscount, subtotal); 
  const refund = request.canceledClasses * request.refundPerClass;
  const total = Math.max(0, subtotal - discount - refund);

  return {subtotal, discount, refund, total};
}

const discountCalculators = {
  SAVE10: (subtotal: number) => Math.floor(0.1 * subtotal),
  FLAT50K: () => 50000,
};

export const InvoiceService = { calc };
