import { z } from 'zod';

const serviceSchema = z.object({
  id: z.enum(['air', 'ocean', 'rail']),
  index: z.string().regex(/^\d{2}$/),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  detail: z.string().min(1),
  accent: z.enum(['cyan', 'acid', 'amber']),
  symbol: z.string().min(1),
}).strict();

const locationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  code: z.string().min(2),
  factor: z.number().positive(),
}).strict();

const modeSchema = z.object({
  name: z.string().min(1),
  ratePerKg: z.number().positive(),
  baseFee: z.number().nonnegative(),
  days: z.tuple([z.number().int().positive(), z.number().int().positive()]),
}).strict().superRefine((mode, context) => {
  if (mode.days[1] < mode.days[0]) {
    context.addIssue({
      code: 'custom',
      message: 'The transit-window maximum must not be less than its minimum.',
      path: ['days'],
    });
  }
});

const shipmentEndpointSchema = z.object({
  city: z.string().min(1),
  code: z.string().min(2),
}).strict();

export const servicesSchema = z.array(serviceSchema).min(1);

export const ratesSchema = z.object({
  currency: z.string().regex(/^[A-Z]{3}$/),
  minimumKg: z.number().int().positive(),
  maximumKg: z.number().int().positive(),
  modes: z.object({
    air: modeSchema,
    ocean: modeSchema,
    rail: modeSchema,
  }).strict(),
  locations: z.array(locationSchema).min(2),
}).strict().superRefine((rates, context) => {
  if (rates.maximumKg < rates.minimumKg) {
    context.addIssue({
      code: 'custom',
      message: 'The maximum cargo weight must not be less than the minimum.',
      path: ['maximumKg'],
    });
  }
  const locationIds = rates.locations.map((location) => location.id);
  if (new Set(locationIds).size !== locationIds.length) {
    context.addIssue({
      code: 'custom',
      message: 'Location IDs must be unique.',
      path: ['locations'],
    });
  }
});

export const shipmentsSchema = z.array(z.object({
  id: z.string().min(1),
  mode: z.string().min(1),
  origin: shipmentEndpointSchema,
  destination: shipmentEndpointSchema,
  status: z.string().min(1),
  progress: z.number().int().min(0).max(100),
  milestone: z.string().min(1),
  updated: z.string().min(1),
  eta: z.string().min(1),
  reference: z.string().min(1),
}).strict()).min(1).superRefine((shipments, context) => {
  const shipmentIds = shipments.map((shipment) => shipment.id.toUpperCase());
  if (new Set(shipmentIds).size !== shipmentIds.length) {
    context.addIssue({
      code: 'custom',
      message: 'Shipment IDs must be unique (case-insensitive).',
      path: [],
    });
  }
});
