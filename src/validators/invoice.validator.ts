import { z } from 'zod';

const commonFields = {
  basePrice: z.number().min(0, { message: 'basePrice cannot be negative' }),
  promoCode: z.enum(['SAVE10', 'FLAT50K']).nullable(),
  canceledClasses: z
    .number()
    .int()
    .min(0, { message: 'canceledClasses cannot be negative' }),
  refundPerClass: z
    .number()
    .min(0, { message: 'refundPerClass cannot be negative' }),
};

const monthlySchema = z.object({
  courseType: z.literal('MONTHLY'),
  months: z
    .number()
    .int()
    .min(1, { message: 'months must be between 1 and 3' })
    .max(3, { message: 'months must be between 1 and 3' }),
  ...commonFields,
});

const fullCourseSchema = z.object({
  courseType: z.literal('FULL_COURSE'),
  ...commonFields,
});

export const invoiceCalcSchema = z.discriminatedUnion('courseType', [
  monthlySchema,
  fullCourseSchema,
]);

export type InvoiceCalcRequest = z.infer<typeof invoiceCalcSchema>;