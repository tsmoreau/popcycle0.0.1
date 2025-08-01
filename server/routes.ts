import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlasticItemSchema, insertPartnerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get plastic item by QR code
  app.get("/api/track/:qrCode", async (req, res) => {
    try {
      const { qrCode } = req.params;
      const item = await storage.getPlasticItemByQr(qrCode);
      
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });

  // Get all plastic items
  app.get("/api/items", async (req, res) => {
    try {
      const items = await storage.getAllPlasticItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch items" });
    }
  });

  // Create new plastic item
  app.post("/api/items", async (req, res) => {
    try {
      const validatedData = insertPlasticItemSchema.parse(req.body);
      const item = await storage.createPlasticItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid item data" });
    }
  });

  // Get metrics for homepage
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  // Get all partners
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getAllPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });

  // Create new partner
  app.post("/api/partners", async (req, res) => {
    try {
      const validatedData = insertPartnerSchema.parse(req.body);
      const partner = await storage.createPartner(validatedData);
      res.status(201).json(partner);
    } catch (error) {
      res.status(400).json({ error: "Invalid partner data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
