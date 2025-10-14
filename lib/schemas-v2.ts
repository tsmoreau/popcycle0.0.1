import { ObjectId } from 'mongodb';

// Event - Nested within Org, represents collection events
export interface Event {
  eventId: string;
  name: string;
  type: 'recurring' | 'ad_hoc';
  description?: string;
  scheduledDate: Date;
  completedDate?: Date;
  location: string;
  binIds: ObjectId[];
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  notes?: string;
}

// Organization - Unified structure for all partner types
export interface Org {
  _id: ObjectId;
  name: string;
  slug: string;
  orgType: 'community_partner' | 'venue' | 'retailer';
  description: string;
  
  // Universal contact information
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
    website?: string;
  };
  
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
    organizationType: string; // "nonprofit", "cafe", "restaurant", "community_kitchen"
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
  
  venue?: {
    partnershipTier: 'foundation' | 'integrated' | 'premium';
    retainerAmount: number;
    contractStartDate: Date;
    contractEndDate: Date;
    chosenPartnerOrgId?: ObjectId;
    integrateOwnWaste?: boolean;
    monthlyDeliveryCap?: number;
    productPreferences?: {
      exclusionList?: string[];
    };
  };
  
  retailer?: {
    buyerContactName?: string;
    buyerContactEmail?: string;
    buyerContactPhone?: string;
    accountsPayableEmail?: string;
    paymentTerms?: string;
    exclusivityType?: 'design' | 'colorway' | 'category' | 'none';
    exclusivityDetails?: string[];
    exclusivityExpirationDate?: Date;
    featuredPartnerOrgId?: ObjectId;
  };
  
  events: Event[];
  createdAt: Date;
  updatedAt: Date;
}

// Bin - Physical branded containers with QR codes at partner locations
export interface Bin {
  _id: string;
  orgId: ObjectId;
  eventId?: string;
  name: string;
  type: 'permanent' | 'temporary';
  location: string;
  capacity?: number;
  isActive: boolean;
  status: 'bin_on_vehicle' | 'bin_on_site' | 'ready_for_processing';
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
  _id: string;
  binIds: string[];
  collectionDate: Date;
  weight: number;
  materialType: 'HDPE' | 'PET' | 'PP' | 'mixed';
  collectedBy: string;
  status: 'collected' | 'rough_wash' | 'sort' | 'first_dry' | 'shred' | 'fine_wash' | 'second_dry' | 'press' | 'weigh_photo' | 'laser_marking' | 'inventory_creation';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blank - Pressed sheets (inventory) that become finished products
export interface Blank {
  _id: string;
  batchIds: string[]; // Can be from multiple batches if blended
  productId?: ObjectId;
  orderId?: ObjectId;
  userId?: ObjectId;
  status: 'blank' | 'assembled' | 'delivered';
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

// User - People who interact with the system in various roles
export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  userType: 'admin' | 'super_admin' | 'staff' | 'user' | 'partner_owner';
  orgId?: ObjectId;
  location?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
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
  category: 'flora_fauna' | 'kinetic_sculptures' | 'vehicles_vessels' | 'pop_bots' | 'everyday_objects' | 'limited_editions';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedAssemblyTime: number;
  materialRequirements: {
    plasticType: 'HDPE' | 'PET' | 'PP';
    weight: number;
  };
  designFiles: {
    cncVectors?: string[];
    laserVectors?: string[];
    instructionsPdf?: string;
    photos: string[];
  };
  assets: Array<{
    id: string;
    type: 'image' | 'video' | 'document' | 'model';
    url: string;
    thumbnail?: string;
    alt?: string;
    description?: string;
    isPrimary?: boolean;
    order?: number;
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
  type: 'collection_service' | 'product_delivery' | 'educational_workshop' | 'consulting' | 'd2c_customer';
  status: 'pending' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled';
  serviceDescription: string;
  contractReference?: string;
  
  lineItems: Array<{
    itemType: 'collection' | 'processing' | 'product' | 'workshop' | 'consulting_hours';
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
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser: string;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
  isActive: boolean;
  pageViews: number;
  lastPage: string;
  loginMethod: 'google';
  location?: {
    country?: string;
    city?: string;
    timezone?: string;
  };
  loggedOutAt?: Date;
  logoutReason?: 'manual' | 'expired' | 'forced';
}
