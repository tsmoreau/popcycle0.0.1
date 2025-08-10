import { ObjectId } from 'mongodb';

// Event - Nested within Org, represents collection events
export interface Event {
  eventId: string; // Unique identifier within the org
  name: string;
  type: 'recurring' | 'ad_hoc';
  description?: string;
  scheduledDate: Date;
  completedDate?: Date;
  location: string;
  binIds: ObjectId[]; // References to Bins used in this event
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  notes?: string;
}

// Organization - Client partners (Discovery Cube, Ace Hotel, etc.)
export interface Org {
  _id: ObjectId;
  name: string;
  slug: string; // URL-friendly identifier for partner routing (e.g., "museumofscience", "discoverycube")
  type: 'corporate' | 'educational' | 'community';
  description: string;
  logoUrl?: string;
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
    website?: string;
  };
  branding: {
    primaryColor?: string;
    secondaryColor?: string;
    logoS3Key?: string;
    customDomain?: string;
    trackingPageMessage?: string;
  };
  events: Event[]; // Nested events array
  createdAt: Date;
  updatedAt: Date;
}

// Bin - Physical branded containers with QR codes at partner locations
// Can be permanent office bins or temporary event bags
export interface Bin {
  _id: string; // QR code string (e.g., "001BINX7K2M9")
  orgId: ObjectId; // Reference to Org
  eventId?: string; // Reference to Event within the org (for event-specific bins)
  name: string; // e.g., "Discovery Cube Main Entrance Bin" or "Beach Cleanup Bag #1"
  type: 'permanent' | 'temporary'; // Permanent office bin vs temporary event bag
  location: string; // Physical location description
  capacity?: number; // in kg (may not apply to temporary bags)
  isActive: boolean;
  canBeAdopted: boolean; // Whether teams/departments can "adopt" and name this bin
  adoptedBy?: string; // Team/department that adopted this bin
  lastCollectionDate?: Date; // When this bin was last emptied
  nextCollectionDate?: Date; // Scheduled next collection
  createdAt: Date;
  updatedAt: Date;
}

// Batch - Collection record when bins are emptied
export interface Batch {
  _id: string; // QR code string (e.g., "002BATF3N8Q1")
  binId: string; // Reference to Bin QR code (inherits org provenance)
  collectionDate: Date;
  weight: number; // in kg
  materialType: 'HDPE' | 'PET' | 'PP' | 'mixed';
  collectedBy: string; // Collector name/ID
  status: 'collected' | 'rough_wash' | 'sort' | 'first_dry' | 'shred' | 'fine_wash' | 'second_dry' | 'press' | 'weigh_photo' | 'laser_marking' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  
}

// Blank - Individual physical blank or finished product
export interface Blank {
  _id: string; // QR code string (e.g., "003BLKA5T6R4")
  batchId: string; // Reference to Batch QR code
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

// User - People who interact with the system in various roles
export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  userType: 'admin' | 'super_admin' | 'staff' | 'user' | 'partner_owner';
  orgId?: ObjectId; // Reference to Org (for partner owners and some staff)
  location?: string;
  
  // Maker/User specific fields
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  itemsAssembled?: number;
  totalHoursLogged?: number;
  favoriteProducts?: ObjectId[]; // References to Products
  assemblyStories?: {
    itemId: ObjectId;
    story: string;
    date: Date;
  }[];
  
  // Staff/Admin specific fields
  permissions?: string[]; // Flexible permissions array
  assignedRoutes?: string[]; // For staff pickup assignments
  
  isActive: boolean;
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

// Order - Internal orders connecting partners to services/products for invoicing
export interface Order {
  _id: ObjectId;
  orderNumber: string; // Human-readable order ID (e.g., "ORD-2025-001")
  orgId: ObjectId; // Reference to partner organization
  type: 'collection_service' | 'product_delivery' | 'educational_workshop' | 'consulting';
  status: 'pending' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled';
  
  // Service details
  serviceDescription: string;
  contractReference?: string; // Reference to signed contract/agreement
  
  // Line items for billing
  lineItems: {
    itemType: 'collection' | 'processing' | 'product' | 'workshop' | 'consulting_hours';
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    // Optional references to actual items/batches/events
    batchIds?: string[];
    itemIds?: string[];
    productIds?: ObjectId[];
  }[];
  
  // Financial details
  subtotal: number;
  tax?: number;
  total: number;
  invoiceId?: string; // QuickBooks invoice reference when invoiced
  
  // Dates
  orderDate: Date;
  expectedCompletionDate?: Date;
  completedDate?: Date;
  invoicedDate?: Date;
  
  // Staff assignment
  assignedStaff?: ObjectId[]; // References to User records
  
  createdAt: Date;
  updatedAt: Date;
}