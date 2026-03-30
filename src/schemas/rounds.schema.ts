import { z } from 'zod';

export const priceRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  pool: z.number().optional().default(0),
}).refine((data) => data.min < data.max, {
  message: "min must be less than max",
});

export const userPriceRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
}).refine((data) => data.min < data.max, {
  message: "min must be less than max",
});

export const startRoundSchema = z.object({
  mode: z
    .number()
    .int('Invalid mode. Must be 0 (UP_DOWN) or 1 (LEGENDS)')
    .min(0, 'Invalid mode. Must be 0 (UP_DOWN) or 1 (LEGENDS)')
    .max(1, 'Invalid mode. Must be 0 (UP_DOWN) or 1 (LEGENDS)'),
  startPrice: z
    .number()
    .positive('Invalid start price'),
  duration: z
    .number()
    .positive('Invalid duration'),
  priceRanges: z.array(priceRangeSchema).optional(),
});

export const resolveRoundSchema = z.object({
  finalPrice: z
    .number()
    .positive('Invalid final price'),
});

export const createPriceRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
});

export const submitLegendsPredictionSchema = z.object({
  roundId: z.string().uuid(),
  amount: z.number().positive(),
  priceRange: userPriceRangeSchema,
});
