import { type PlasticItem, type InsertPlasticItem, type Partner, type InsertPartner } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Plastic Items
  getPlasticItem(id: string): Promise<PlasticItem | undefined>;
  getPlasticItemByQr(qrCode: string): Promise<PlasticItem | undefined>;
  createPlasticItem(item: InsertPlasticItem): Promise<PlasticItem>;
  getAllPlasticItems(): Promise<PlasticItem[]>;
  
  // Partners
  getPartner(id: string): Promise<Partner | undefined>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  getAllPartners(): Promise<Partner[]>;
  
  // Metrics
  getMetrics(): Promise<{
    totalPieces: number;
    totalWeight: number;
    totalCarbonOffset: number;
    totalPartners: number;
  }>;
}

export class MemStorage implements IStorage {
  private plasticItems: Map<string, PlasticItem>;
  private partners: Map<string, Partner>;

  constructor() {
    this.plasticItems = new Map();
    this.partners = new Map();
    this.seedData();
  }

  private seedData() {
    // Sample plastic items for demonstration
    const sampleItems: PlasticItem[] = [
      {
        id: "1",
        qrCode: "ABC123",
        sourceCompany: "TechCorp Solutions",
        collectionDate: "2025-01-15",
        materialType: "HDPE",
        weight: 2.4,
        processedDate: "2025-01-20",
        carbonOffset: 2.4,
        status: "assembled",
        productType: "Rover Chassis Component",
        endUser: "Workshop Participant",
        workshopId: "WORK456",
        createdAt: "2025-01-15T10:00:00Z",
      },
      {
        id: "2",
        qrCode: "DEF456",
        sourceCompany: "GreenTech Industries",
        collectionDate: "2025-01-10",
        materialType: "HDPE",
        weight: 1.8,
        processedDate: "2025-01-18",
        carbonOffset: 1.8,
        status: "processed",
        productType: "Pop-out Toy",
        createdAt: "2025-01-10T14:30:00Z",
      },
      {
        id: "3",
        qrCode: "GHI789",
        sourceCompany: "EduSystem Schools",
        collectionDate: "2025-01-12",
        materialType: "HDPE",
        weight: 3.2,
        processedDate: "2025-01-22",
        carbonOffset: 3.2,
        status: "delivered",
        productType: "Educational Kit",
        endUser: "Lincoln Elementary",
        createdAt: "2025-01-12T09:15:00Z",
      },
    ];

    sampleItems.forEach(item => {
      this.plasticItems.set(item.id, item);
    });

    // Sample partners
    const samplePartners: Partner[] = [
      {
        id: "1",
        name: "TechCorp Solutions",
        type: "corporate",
        contactEmail: "sustainability@techcorp.com",
        plasticContributed: 45.6,
        joinedDate: "2024-11-15",
        isActive: true,
      },
      {
        id: "2",
        name: "EduSystem Schools",
        type: "educational",
        contactEmail: "programs@edusystem.edu",
        plasticContributed: 28.3,
        joinedDate: "2024-12-01",
        isActive: true,
      },
      {
        id: "3",
        name: "GreenTech Industries",
        type: "corporate",
        contactEmail: "green@greentech.io",
        plasticContributed: 67.8,
        joinedDate: "2024-10-20",
        isActive: true,
      },
      {
        id: "4",
        name: "MakerSpace Community",
        type: "community",
        contactEmail: "hello@makerspace.org",
        plasticContributed: 15.2,
        joinedDate: "2024-12-15",
        isActive: true,
      },
    ];

    samplePartners.forEach(partner => {
      this.partners.set(partner.id, partner);
    });
  }

  async getPlasticItem(id: string): Promise<PlasticItem | undefined> {
    return this.plasticItems.get(id);
  }

  async getPlasticItemByQr(qrCode: string): Promise<PlasticItem | undefined> {
    return Array.from(this.plasticItems.values()).find(item => item.qrCode === qrCode);
  }

  async createPlasticItem(insertItem: InsertPlasticItem): Promise<PlasticItem> {
    const id = randomUUID();
    const item: PlasticItem = {
      ...insertItem,
      id,
      createdAt: new Date().toISOString(),
    };
    this.plasticItems.set(id, item);
    return item;
  }

  async getAllPlasticItems(): Promise<PlasticItem[]> {
    return Array.from(this.plasticItems.values());
  }

  async getPartner(id: string): Promise<Partner | undefined> {
    return this.partners.get(id);
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const id = randomUUID();
    const partner: Partner = {
      ...insertPartner,
      id,
    };
    this.partners.set(id, partner);
    return partner;
  }

  async getAllPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async getMetrics() {
    const items = Array.from(this.plasticItems.values());
    const partners = Array.from(this.partners.values());
    
    return {
      totalPieces: items.length,
      totalWeight: items.reduce((sum, item) => sum + item.weight, 0),
      totalCarbonOffset: items.reduce((sum, item) => sum + item.carbonOffset, 0),
      totalPartners: partners.filter(p => p.isActive).length,
    };
  }
}

export const storage = new MemStorage();
