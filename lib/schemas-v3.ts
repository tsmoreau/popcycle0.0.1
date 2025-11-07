import { ObjectId } from "mongodb";

// Event - Top-level collection for collection events
export interface Event {
  _id: ObjectId;
  orgId: ObjectId; // Reference to the org that claims this event
  eventId: string; // Custom event identifier
  name: string;
  type: "recurring" | "ad_hoc";
  description?: string;
  scheduledDate: Date;
  completedDate?: Date;
  location: string;
  binIds: ObjectId[]; // References to Bins used in this event
  status: "planned" | "active" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Organization - Unified structure for all partner types
export interface Org {
  _id: ObjectId;
  name: string;
  slug: string;
  orgType:
    | "community_partner"
    | "limited_client"
    | "retainer_client"
    | "wholesaler";
  description: string;

  // Universal contact information (supports multiple contacts)
  contactInfo: Array<{
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
    isPrimary?: boolean;
  }>;

  users: ObjectId[]; // References to User collection
  products: ObjectId[]; // References to Product collection

  // Universal branding
  branding: {
    primaryColor?: string;
    secondaryColor?: string;
    logoUrl?: string;
    logoS3Key?: string;
    customDomain?: string;
    trackingPageMessage?: string;
  };

  // Type-specific data (only ONE populated based on orgType)
  communityPartner?: {
    mission: string;
    storyContent: string;
    communityPartnerType: string; // "nonprofit", "cafe", "restaurant", "community_kitchen"
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
    directorName?: string;
    directorTitle?: string;
    directorBio?: string;
    directorHeadshotUrl?: string;
    pickupSchedule?: string;
    accessRequirements?: string;
    metrics?: {
      totalWeightCollected: number;
      averageWeightPerPickup: number;
      contaminationRate: number;
      pickupCount: number;
      lastPickupDate?: Date;
    };
  };

  limitedClient?: {
    contractStartDate: Date;
    contractEndDate: Date;
    chosenPartnerOrgId?: ObjectId;
    integrateOwnWaste?: boolean;
    monthlyDeliveryCap?: number;
    productPreferences?: {
      exclusionList?: string[];
    };
  };

  retainerClient?: {
    contractStartDate: Date;
    contractEndDate: Date;
    chosenPartnerOrgId?: ObjectId;
    integrateOwnWaste?: boolean;
    monthlyDeliveryCap?: number;
    productPreferences?: {
      exclusionList?: string[];
    };
  };

  wholesaler?: {
    buyerContactName?: string;
    buyerContactEmail?: string;
    buyerContactPhone?: string;
    accountsPayableEmail?: string;
    paymentTerms?: string;
    exclusivityType?: "design" | "colorway" | "category" | "none";
    exclusivityDetails?: string[];
    exclusivityExpirationDate?: Date;
    featuredPartnerOrgId?: ObjectId;
  };

  // CRM pipeline tracking
  status?:
    | "n_a"
    | "prospect"
    | "contacted"
    | "in_talks"
    | "proposal_sent"
    | "negotiation"
    | "active_partner"
    | "active_client"
    | "active_wholesaler"
    | "onboarding"
    | "closed_lost";
  internalNotes?: string;
  activities?: any[]; // Activity timeline entries
  lastContactDate?: Date;
  nextActionDate?: Date;
  assignedTo?: string;

  eventIds: string[]; // References to Event collection
  createdAt: Date;
  updatedAt: Date;
}

// Bin - Physical branded containers with QR codes at partner locations
export interface Bin {
  _id: string; // QR code string (e.g., "B1234567")
  orgId: ObjectId;
  eventId?: string;
  name: string;
  type: "permanent" | "temporary";
  location: string;
  capacity?: number;
  isActive: boolean;
  status: "bin_on_vehicle" | "bin_on_site" | "ready_for_processing";
  canBeAdopted: boolean;
  adoptedBy?: string;
  message?: string;
  lastCollectionDate?: Date;
  nextCollectionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Batch - Collection record when bins are emptied
export interface Batch {
  _id: string; // QR code string (e.g., "T1234567")
  binIds: string[];
  collectionDate: Date;
  weight: number;
  materialType: "HDPE" | "PET" | "PP" | "mixed";
  collectedBy: string;
  status:
    | "collected"
    | "rough_wash"
    | "sort"
    | "first_dry"
    | "shred"
    | "fine_wash"
    | "second_dry"
    | "press"
    | "weigh_photo"
    | "laser_marking"
    | "inventory_creation";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blank - Pressed sheets (inventory) that become finished products
export interface Blank {
  _id: string; // QR code string (e.g., "K1234567")
  batchIds: string[]; // Can be from multiple batches if blended
  productId?: ObjectId; // Reference to Product design for edition allocation
  editionNumber?: number; // Tracks which edition this blank is allocated to
  orderId?: ObjectId;
  userId?: ObjectId;
  status: "blank" | "assembled" | "delivered";
  weight: number;
  photoUrl?: string;
  thumbnailUrl?: string;
  materialDescription?: string;
  dimensions?: {
    width: number;
    height: number;
    thickness: number;
  };

  assemblyDate?: Date;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Item - Finished products (can be assembled from blanks OR directly from batches)
export interface Item {
  _id: string; // QR code string (e.g., "I1234567")
  blankIds?: string[]; // Items made from blanks (standard flow)
  batchIds?: string[]; // Items made directly from batches (alternative flow)
  binIds?: string[]; // Items made directly from bins (direct collection flow)
  productId: ObjectId; // Reference to Product design
  userId?: ObjectId; // Maker/assembler
  orderId?: ObjectId; // Associated order if part of bulk order
  editionNumber?: number; // Which edition this item belongs to
  status: "assembled" | "quality_checked" | "packaged" | "shipped" | "delivered";
  weight: number;
  photoUrl?: string;
  thumbnailUrl?: string;
  serialNumber?: string; // Unique serial within product line
  
  assemblyDate?: Date;
  qualityCheckDate?: Date;
  shipDate?: Date;
  deliveryDate?: Date;
  
  // Customer/recipient info (if direct-to-consumer)
  recipientName?: string;
  recipientEmail?: string;
  shippingAddress?: string;
  trackingNumber?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

// User - People who interact with the system in various roles
export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  userType: "admin" | "super_admin" | "staff" | "user" | "partner_owner";
  orgId?: ObjectId;
  location?: string;
  skillLevel?: "beginner" | "intermediate" | "advanced";
  itemsAssembled?: number;
  totalHoursLogged?: number;
  favoriteProducts?: ObjectId[];
  assemblyStories?: Array<{
    itemId: ObjectId;
    story: string;
    date: Date;
  }>;
  permissions?: string[];
  assignedRoutes?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product - Design files, templates, and specifications
export interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  slug: string; // URL-friendly identifier for product routes
  org: ObjectId;

  // Business model classification
  category: "workshop" | "studio_edition" | "client_edition";

  // Functional product type (cross-cutting)
  productType:
    | "coasters"
    | "keychains"
    | "bookmarks"
    | "magnets"
    | "earrings"
    | "lighting"
    | "cutting_boards";

  designFiles: {
    cncVectors?: string[];
    laserVectors?: string[];
    instructionsPdfs?: string[]; // Now supports multiple PDFs
    photos: string[];
  };

  assets: Array<{
    id: string;
    type: "image" | "video" | "document" | "model";
    url: string;
    thumbnail?: string;
    alt?: string;
    description?: string;
    isPrimary?: boolean;
    order?: number;
    category?:
      | "hero"
      | "product_info"
      | "lifestyle"
      | "detail"
      | "shop_listing";
  }>;

  // Editorial content fields
  specs?: {
    dimensions?: string;
    weight?: string;
    materials?: string;
    colors?: string[];
    finish?: string;
    assembly?: string;
    care?: string;
    [key: string]: any;
  };
  narrative?: string; // Rich editorial text about design story, context, use
  editions?: Array<{
    editionNumber: number;
    description?: string;
    quantity?: number;
    year?: number;
    price?: number;
    available?: boolean;
  }>;

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
  orderNumber: string;
  orgId: ObjectId;
  type:
    | "collection_service"
    | "product_delivery"
    | "educational_workshop"
    | "consulting"
    | "d2c_customer";
  status: "pending" | "in_progress" | "completed" | "invoiced" | "cancelled";
  serviceDescription: string;
  contractReference?: string;

  lineItems: Array<{
    itemType:
      | "collection"
      | "processing"
      | "product"
      | "workshop"
      | "consulting_hours";
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    batchIds?: string[];
    itemIds?: string[];
    productIds?: ObjectId[];
  }>;

  subtotal: number;
  tax?: number;
  total: number;
  invoiceId?: string;
  orderDate: Date;
  expectedCompletionDate?: Date;
  completedDate?: Date;
  invoicedDate?: Date;
  assignedStaff?: ObjectId[];

  // D2C customer fields (only populated when type='d2c_customer')
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  selectedBlankId?: string;
  templateType?: string;
  customText?: string;
  customGraphic?: string;
  laserFileUrl?: string;
  cncFileUrl?: string;
  shippedDate?: Date;
  trackingNumber?: string;
  carrier?: string;

  createdAt: Date;
  updatedAt: Date;
}

// Session - Active user session tracking
export interface Session {
  _id: ObjectId;
  userId: ObjectId;
  sessionToken: string;
  ipAddress: string;
  userAgent: string;
  deviceType: "desktop" | "mobile" | "tablet" | "unknown";
  browser: string;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
  isActive: boolean;
  pageViews: number;
  lastPage: string;
  loginMethod: "google";
  location?: {
    country?: string;
    city?: string;
    timezone?: string;
  };
  loggedOutAt?: Date;
  logoutReason?: "manual" | "expired" | "forced";
}
