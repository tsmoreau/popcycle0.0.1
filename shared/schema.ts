import { z } from "zod";

// Plastic Item schema for QR tracking
export const plasticItemSchema = z.object({
  id: z.string(),
  qrCode: z.string(),
  sourceCompany: z.string(),
  collectionDate: z.string(),
  materialType: z.string(),
  weight: z.number(),
  processedDate: z.string().optional(),
  carbonOffset: z.number(),
  status: z.enum(["collected", "processed", "assembled", "delivered"]),
  productType: z.string().optional(),
  endUser: z.string().optional(),
  workshopId: z.string().optional(),
  createdAt: z.string(),
});

export const insertPlasticItemSchema = plasticItemSchema.omit({
  id: true,
  createdAt: true,
});

export type PlasticItem = z.infer<typeof plasticItemSchema>;
export type InsertPlasticItem = z.infer<typeof insertPlasticItemSchema>;

// Partner schema
export const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["corporate", "educational", "community"]),
  contactEmail: z.string().email(),
  plasticContributed: z.number().default(0),
  joinedDate: z.string(),
  isActive: z.boolean().default(true),
});

export const insertPartnerSchema = partnerSchema.omit({
  id: true,
});

export type Partner = z.infer<typeof partnerSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
