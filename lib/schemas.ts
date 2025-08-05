import { ObjectId } from 'mongodb';

// Organization - Client partners (Discovery Cube, Ace Hotel, etc.)
export interface Org {
  
  _id: ObjectId;
  name: string;
  type: 'corporate' | 'educational' | 'community';
  description: string;
  logoUrl?: string;
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  
}

// Bin - Physical branded containers with QR codes at partner locations
export interface Bin {
  
  _id: ObjectId;
  qrCode: string; // Unique QR code identifier
  orgId: ObjectId; // Reference to Org
  name: string; // e.g., "Discovery Cube Main Entrance Bin"
  location: string; // Physical location description
  capacity: number; // in kg
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
}

// Batch - Collection record when bins are emptied
export interface Batch {
  
  _id: ObjectId;
  qrCode: string; // Unique QR code identifier
  binId: ObjectId; // Reference to Bin (inherits org provenance)
  collectionDate: Date;
  weight: number; // in kg
  materialType: 'HDPE' | 'PET' | 'PP' | 'mixed';
  collectedBy: string; // Collector name/ID
  status: 'collected' | 'sorted' | 'cleaned' | 'processed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  
}

// Item - Individual physical blank or finished product
export interface Item {
  
  _id: ObjectId;
  qrCode: string; // Unique QR code identifier
  batchId: ObjectId; // Reference to Batch
  productId?: ObjectId; // Reference to Product (if finished)
  userId?: ObjectId; // Reference to User (if assembled)
  type: 'blank' | 'finished';
  status: 'blank' | 'assembled' | 'delivered';
  weight: number; // in kg
  assemblyDate?: Date;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  
}

// User - People who interact with the system and build items
export interface User {
  
  _id: ObjectId;
  name: string;
  email: string;
  location?: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  itemsAssembled: number;
  totalHoursLogged: number;
  favoriteProducts: ObjectId[]; // References to Products
  assemblyStories: {
    itemId: ObjectId;
    story: string;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  
}

// Product - Design files, templates, and specifications
export interface Product {
  
  _id: ObjectId;
  name: string;
  description: string;
  category: 'educational_kit' | 'assembly_toy' | 'practical_item' | 'decoration';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedAssemblyTime: number; // in minutes
  materialRequirements: {
    plasticType: 'HDPE' | 'PET' | 'PP';
    weight: number; // in kg
  };
  designFiles: {
    instructionsPdf?: string;
    templateSvg?: string;
    photos: string[];
  };
  price: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  
}