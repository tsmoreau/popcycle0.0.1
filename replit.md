# PopCycle - Circular Plastic Tracking System

## Overview
PopCycle is a comprehensive circular economy platform designed to transform corporate plastic waste into trackable, educational products. It establishes a self-reinforcing ecosystem that connects waste collection, manufacturing, education, and community engagement through QR code-based provenance tracking. The system functions as a unified Next.js PWA, serving as the central in-house system for managing all operations, from partner CRM and logistics scheduling to maker skill tracking and community engagement. Its primary business vision is to minimize external dependencies, integrating only with essential services for communication (Google Workspace) and finance (QuickBooks/Stripe), ensuring maximum operational control and a complete in-house solution for the entire circular economy process.

## User Preferences
Preferred communication style: Simple, everyday language.
Brand colors: Must use exact HSL values - pop-green: hsl(142, 100%, 35%), pop-blue: hsl(214, 100%, 50%), pop-red: hsl(347, 100%, 60%), pop-black: hsl(0, 0%, 0%), pop-gray: hsl(0, 0%, 20%).
User preference confirmed: Operations functions contained in single file rather than complex sub-folder organization.
User preference: Individual transaction lists preferred over categorized summaries for financial data visibility.
User preference: State management must be shared between fullscreen and regular views - filtering/sorting must persist when switching between view modes.
User preference: Visual icon distinctions are important - QR code and maximize icons should be clearly different.

## System Architecture
PopCycle is built as a unified Next.js PWA with MongoDB, managing all core operations.

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and TypeScript.
- **UI Framework**: Radix UI components with shadcn/ui design system.
- **Styling**: Tailwind CSS with custom PopCycle brand colors, featuring a pop-art aesthetic with bold geometric elements and restrained minimalism.
- **Design Philosophy**: Timeless systematic approach balancing institutional weight with pop art energy.
- **UI/UX Decisions**: Each page features unique color hero sections with full-bleed backgrounds. Dashboard navigation is color-coded with dynamic active states, and a mobile-first responsive design includes a full-height mobile menu. Lucide React icons are used consistently.

### Backend Architecture
- **Framework**: Next.js API Routes serving as serverless functions for unified business management.
- **Database**: MongoDB for flexible document storage of all operational data.
- **API Design**: RESTful API routes support CRM, logistics, user tracking, and QR code tracking.
- **Data Models**: Key data models include:
    - **Org**: Client partners with CRM status.
    - **Bin**: Physical containers with QR codes for waste collection.
    - **Batch**: Collection records with provenance chain.
    - **Item**: Individual trackable products with QR codes.
    - **User**: Capability-based identity system with maker progression.
    - **Product**: Design templates and assembly guides.
- **Core System Architecture**:
    - **Universal QR Code System**: Pure alphanumeric IDs serve as both QR codes and database primary keys with embedded partner branding. Format: First 3 characters = Base36 partner hash (supports 46,655 partners), followed by item type prefix (BIN/BAT/BLK), then sequence. Examples: `2JKBLKA1B2C3`, `ABBIND4E5F6`. Universal tracking system supports three distinct views: Bin tracking (shows all batches from that bin), Batch tracking (shows processing status and resulting blanks), Blank tracking (full item provenance). The system tracks the transformation chain from waste collection to delivery with real-time status updates.
    - **Logistics & Operations Management**: Includes pickup scheduling with route optimization, mobile staff apps for collection and inventory, and PWA thin clients at production stations for coordination (e.g., weighing/photo station with HID scale integration, laser station).
    - **Community & Education Platform**: Features a universal maker identity, skill trees, achievement systems, step-by-step assembly guides, and workshop management.
    - **E-commerce & Product Systems**: Manages product catalog, order fulfillment, customer communication, and impact reporting.

### User Access Architecture
- **User Identity System**: All users begin as makers; access is capability-based. Staff roles (`admin`, `operations_staff`, `crm_staff`) grant additional dashboard access. `orgId` provides read-only access to partner reporting.
- **Authentication Strategy**: NextAuth handles authentication only (Google Workspace SSO for staff, magic link support). All user data stored in MongoDB User schema. Session management via JWT tokens (no additional database storage). Email-based linking between NextAuth session and MongoDB User records.
- **Dashboard Architecture**: Route-based portal navigation under `/portal/` with color-coded themes for different dashboards: Main, Profile, Admin, Operations, CRM, Partner, and Financial. Operations functions are consolidated into a single page. Production workflow is streamlined across two stations: Weighing/Photo/Creation and Laser Processing, both integrated via PWA thin clients.

## External Dependencies

- **Database**: MongoDB serves as the single source of truth for all business operations data, including CRM, logistics, user progression, and provenance tracking.
- **Authentication**: NextAuth for authentication only (JWT-based sessions, Google Workspace SSO for staff). User data stored entirely in MongoDB User collection, linked by email.
- **File Storage**: Private AWS S3 bucket for secure asset storage (partner logos, product images, design files). MongoDB stores S3 keys, presigned URLs generated on-demand for secure access.
- **UI Components**: shadcn/ui built on Radix UI primitives, styled with Tailwind CSS, and using Lucide React icons.
- **Communication**: Google Workspace for email automation, calendar synchronization, and communication workflows (also used for NextAuth magic link emails via SMTP).
- **Financial Management**: QuickBooks for comprehensive accounting, invoice generation, and revenue tracking.
- **Payment Processing**: Stripe for secure transactions and subscription management.
- **Hardware Integration**: USB HID scales and external USB cameras integrated directly into production station PWAs.

## Technical Architecture Details

### Authentication System (NextAuth + MongoDB)
- **NextAuth Role**: Authentication only, JWT-based sessions, no database storage
- **Google Workspace SSO**: Staff authentication through business Google accounts
- **Magic Link Support**: Email-based authentication via Google Workspace SMTP
- **User Data Storage**: All user profiles, roles, and business data in MongoDB User collection
- **Session Management**: JWT tokens stored as HTTP-only cookies in browser
- **User Linking**: NextAuth session email matches MongoDB User.email field

### File Storage System (Private S3)
- **S3 Bucket Configuration**: Private bucket, no public read access
- **File Organization**: Structured paths (partner-logos/org-123/, product-images/, design-files/)
- **MongoDB Storage**: S3 keys only (e.g., "partner-logos/org-123/logo.jpg")
- **Secure Access**: Presigned URLs generated on-demand for viewing/uploading
- **Security Model**: Temporary URLs (15-60 minute expiration), audit trail, revocable access
- **API Pattern**: `/api/images/[key]` endpoint generates presigned URLs for frontend
- **Upload Flow**: Frontend requests presigned POST URL, uploads directly to S3
- **View Flow**: Frontend requests presigned GET URL for image display

### Partner Branding System
- **Partner ID Encoding**: First 3 characters of all item IDs encode partner identity using Base36 transformation of partner primary key (Partner ID 1 = `001`, Partner ID 99 = `2R0`, Partner ID 999 = `RR3`)
- **Branded URL Structure**: Dynamic routing via `popcycle.io/[partner]/track/[id]` using partner slug for branded URLs (e.g., `popcycle.io/museumofscience/track/2JKBLKA1B2C3`)
- **Single Page Architecture**: One dynamic page file `/app/[partner]/track/[id]/page.tsx` handles all partner tracking pages with contextual branding
- **Partner Lookup**: Page queries Org collection by slug to retrieve partner branding configuration (logo, colors, messaging)
- **Data Validation**: Item ID encoding provides secondary validation of partner identity for data integrity
- **QR Code URLs**: QR codes point directly to branded partner URLs without redirects for optimal user experience
- **Scalable Architecture**: Supports up to 46,655 partners before requiring system refactor

## Current Implementation Status

### Portal System
- **Main Dashboard** (`/portal/`): Central hub with overview metrics and navigation
- **Profile Management** (`/portal/profile/`): User profile and maker progression
- **Admin Panel** (`/portal/admin/`): System administration and user management
- **Operations Dashboard** (`/portal/operations/`): Complete logistics management with fullscreen capability
- **CRM System** (`/portal/crm/`): Partner relationship management
- **Partner Portal** (`/portal/partner/`): Client-facing dashboard
- **Financial Dashboard** (`/portal/financial/`): Accounting and transaction management

### Operations Management Features
- **Fullscreen Modal System**: Logistics management supports fullscreen view with shared state
- **Data Table Component**: Enhanced with external sorting state management for persistent filtering/sorting
- **Shared State Management**: All data tables maintain state when switching between fullscreen and regular views
- **Three Core Workflows**:
  - Collections Management: Pickup scheduling and route optimization
  - Processing Workflow: Manufacturing and QR code assignment
  - Fulfillment Operations: Order processing and delivery tracking

### Component Architecture
- **Enhanced DataTable**: Supports external state management for sorting/filtering persistence
- **Responsive Navigation**: Color-coded portal navigation with mobile-first design
- **Modal System**: shadcn/ui Dialog components for fullscreen operations
- **State Management**: React useState for shared sorting/filtering across view modes

## Recent Architectural Changes

### January 2025 - Operations Dashboard Enhancements
- **Fullscreen Logistics Management**: Added ability to fullscreen the entire logistics section while maintaining tab navigation
- **Shared State Implementation**: Modified DataTable component to support external state management
- **State Persistence**: Collections, Processing, and Fulfillment tables now maintain sorting/filtering when switching between fullscreen and regular views
- **Icon Improvements**: Updated QR code icons to be more visually distinct from maximize icons

### File Structure
```
app/
├── portal/
│   ├── admin/page.tsx           # Admin dashboard
│   ├── crm/page.tsx             # CRM management
│   ├── financial/page.tsx       # Financial operations
│   ├── operations/page.tsx      # Logistics management (enhanced with fullscreen)
│   ├── partner/page.tsx         # Partner portal
│   ├── profile/page.tsx         # User profiles
│   ├── layout.tsx               # Portal navigation layout
│   └── page.tsx                 # Main dashboard
├── components/
│   ├── ui/
│   │   ├── data-table.tsx       # Enhanced with external state management
│   │   ├── dialog.tsx           # Modal components
│   │   └── [other shadcn components]
│   ├── Navigation.tsx           # Main site navigation
│   ├── Footer.tsx               # Site footer
│   └── PopArtElements.tsx       # Brand design elements
├── api/
│   ├── items/sample/route.ts    # Sample data endpoints
│   └── track/[id]/route.ts      # QR code tracking
└── [other pages and routes]
```

## Technical Implementation Notes

### State Management Patterns
- **External State Control**: DataTable component accepts optional `sortField`, `sortDirection`, and `onSort` props
- **Shared Variables**: Operations page maintains separate state variables for each data table
- **State Persistence**: Switching between fullscreen and regular views preserves all filtering and sorting

### UI/UX Patterns
- **Fullscreen Modals**: Use shadcn/ui Dialog with full viewport sizing
- **Icon Consistency**: Lucide React icons with visual distinction between similar functions
- **Color Coding**: Each portal section has distinct brand color theming
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Development Guidelines
- **State Management**: Always implement shared state for components that appear in multiple view modes
- **Component Reusability**: Design components to accept external state management when needed
- **Visual Clarity**: Ensure icons and interactive elements have clear visual distinctions
- **Operations Consolidation**: Keep related operations functions in single files rather than complex folder structures