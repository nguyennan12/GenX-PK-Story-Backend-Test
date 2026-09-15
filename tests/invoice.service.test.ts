import { describe, expect, it } from 'vitest';
import { InvoiceService } from '../src/services/invoice.service.js';
import { invoiceCalcSchema } from '../src/validators/invoice.validator.js';

describe('InvoiceService.calc', () => {
  it('calculates monthly subtotal', () => {
    const result = InvoiceService.calc({
      courseType: 'MONTHLY',
      basePrice: 1_000_000,
      months: 3,
      promoCode: null,
      canceledClasses: 0,
      refundPerClass: 0,
    });

    expect(result).toEqual({
      subtotal: 3_000_000,
      discount: 0,
      refund: 0,
      total: 3_000_000,
    });
  });

  it('calculates full course subtotal', () => {
    const result = InvoiceService.calc({
      courseType: 'FULL_COURSE',
      basePrice: 5_000_000,
      promoCode: null,
      canceledClasses: 0,
      refundPerClass: 0,
    });

    expect(result.subtotal).toBe(5_000_000);
    expect(result.total).toBe(5_000_000);
  });

  it('applies SAVE10 discount with floor', () => {
    const result = InvoiceService.calc({
      courseType: 'FULL_COURSE',
      basePrice: 999_999,
      promoCode: 'SAVE10',
      canceledClasses: 0,
      refundPerClass: 0,
    });

    expect(result.discount).toBe(99_999);
    expect(result.total).toBe(900_000);
  });

  it('applies FLAT50K discount and clamps discount to subtotal', () => {
    const result = InvoiceService.calc({
      courseType: 'FULL_COURSE',
      basePrice: 30_000,
      promoCode: 'FLAT50K',
      canceledClasses: 0,
      refundPerClass: 0,
    });

    expect(result).toEqual({
      subtotal: 30_000,
      discount: 30_000,
      refund: 0,
      total: 0,
    });
  });

  it('subtracts refund and clamps total to zero', () => {
    const result = InvoiceService.calc({
      courseType: 'FULL_COURSE',
      basePrice: 100_000,
      promoCode: null,
      canceledClasses: 3,
      refundPerClass: 50_000,
    });

    expect(result).toEqual({
      subtotal: 100_000,
      discount: 0,
      refund: 150_000,
      total: 0,
    });
  });

  it('rejects invalid MONTHLY months in validation', () => {
    const result = invoiceCalcSchema.safeParse({
      courseType: 'MONTHLY',
      basePrice: 1_000_000,
      months: 4,
      promoCode: null,
      canceledClasses: 0,
      refundPerClass: 0,
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid promoCode in validation', () => {
    const result = invoiceCalcSchema.safeParse({
      courseType: 'FULL_COURSE',
      basePrice: 1_000_000,
      promoCode: 'BAD_CODE',
      canceledClasses: 0,
      refundPerClass: 0,
    });

    expect(result.success).toBe(false);
  });

  it('rejects negative values in validation', () => {
    const result = invoiceCalcSchema.safeParse({
      courseType: 'FULL_COURSE',
      basePrice: -1,
      promoCode: null,
      canceledClasses: 0,
      refundPerClass: 0,
    });

    expect(result.success).toBe(false);
  });
});