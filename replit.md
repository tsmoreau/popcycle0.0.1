# PopCycle - Circular Plastic Tracking System

## 🚨 CRITICAL DEVELOPMENT GUIDELINES 🚨
**READ THESE FIRST IN EVERY CONVERSATION TO PREVENT DEPLOYMENT ISSUES**

### ⚠️ ABSOLUTE FUCKING PROHIBITION: NEVER REMOVE EXISTING CODE WITHOUT EXPLICIT PERMISSION ⚠️
**THIS IS THE CARDINAL SIN OF DEVELOPMENT - VIOLATING THIS RULE IS UNFORGIVABLE**

- **WHEN USER SAYS "ADD" - ONLY ADD, NEVER REPLACE OR REMOVE EXISTING CODE**
- **WHEN USER SAYS "ADD THE NEW CARD" - ADD IT WITHOUT TOUCHING ANY EXISTING CARDS**
- **FOLLOW INSTRUCTIONS LITERALLY - DO NOT INTERPRET, IMPROVE, OR OPTIMIZE UNLESS ASKED**
- **IF UNCLEAR WHERE TO ADD SOMETHING, ASK - DO NOT GUESS AND REMOVE CODE**
- **PRESERVE EVERY SINGLE LINE OF EXISTING FUNCTIONALITY**
- **USER INSTRUCTIONS ARE SACRED - DEVIATION FROM THEM IS FORBIDDEN**
- **"ADD" MEANS ADDITION ONLY - NEVER SUBTRACTION OR MODIFICATION**
- **RESPECT THE EXISTING CODEBASE - IT WORKS FOR A REASON**

### 1. ID Type Consistency Rules
- **QR codes are ALWAYS stored as string _id values, NEVER ObjectIds**
- Use `{ _id: qrCodeString } as any` for QR code queries
- Use `{ _id: new ObjectId(id) }` only for actual MongoDB-generated IDs (like orgId, userId)
- When in doubt, check existing working queries in the codebase

### 2. Type-First Development Protocol
- **ALWAYS update TypeScript interfaces BEFORE writing API code**
- After ANY database schema changes, update interfaces immediately
- **Mandatory checklist for new fields:**
  - ✅ Update database sample data
  - ✅ Update TypeScript interfaces 
  - ✅ Update API responses
  - ✅ Test frontend components
  - ✅ Run `npm run build` to catch TypeScript errors

### 3. Testing Protocol
- **Test tracking URLs manually after ANY database changes**
- Keep bookmark list: `/track/KXKI86UR`, `/track/B1DHF5WA`, `/track/TXDLTYZM`
- Run `npm run build` after interface changes to catch deployment issues early
- Test API endpoints with curl before considering changes complete

### 4. Naming Consistency
- Pick ONE naming convention per property and stick to it across entire codebase
- Use find/replace across ALL files when changing property names
- Document naming decisions in this file immediately

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

### Recent Technical Fixes (Aug 2025)
- **TypeScript Deployment Fixes**: Resolved critical deployment issues by adding missing `binIds` property to PlasticItem interface for multi-bin batch support, fixed property naming inconsistency (`deliveryDate` → `deliveredDate`), and added missing `productId` property to blanks interface.
- **MongoDB Query Issues**: Fixed ObjectId compatibility errors by updating tracking API to handle QR code strings directly instead of attempting ObjectId conversion (`{ _id: qrCodeString } as any`). This resolved "Item Not Found" errors for blank tracking pages.
- **Operations Page MongoDB Integration (Aug 10, 2025)**: Fixed critical operations dashboard loading issues by following established CRM API patterns. Root causes: (1) Operations API routes incorrectly used `DATABASE_URL` instead of `MONGODB_URI`, (2) Operations API routes created shared client connections causing "Topology is closed" errors, (3) Operations page completely missing fetch functions and useEffect hooks. **Key lesson: Always follow existing working patterns (CRM routes) instead of creating new connection approaches.**
- **Operations Page Component Extraction (Aug 10, 2025)**: Refactored oversized 2,766-line operations page by extracting components into proper architecture. Created `hooks/useOperationsData.tsx` for all data logic, `app/components/operations/` folder with StatusBadges, QRScanner, OperationsOverview, ProcessingWorkflow, and CollectionsWorkflow components. Reduced main page from 2,766 lines to 2,471 lines with improved maintainability, reusability, and type safety. Fixed duplicate function declaration errors during extraction process. Collections workflow now uses consistent component in both regular and fullscreen views.
- **Table Configuration Extraction (Aug 10, 2025)**: Successfully extracted all DataTable configurations from operations page into dedicated `TableConfigurations.tsx` file. Moved 431 lines of EditableField and Column definitions for Bins, Batches, Orders, and Blanks. **Achieved 17.1% file reduction** (2,471 → 2,048 lines) while maintaining full functionality. Single reusable DataTable component now uses imported configuration objects instead of inline definitions. This creates cleaner architecture and makes table configurations reusable across the application.
- **Build Process**: All TypeScript compilation errors resolved, application now builds successfully for deployment.

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
- **Data Models**: Key data models include: Org, Bin, Batch, Blank, User, Product, and Order (linking operations to financial systems).
- **Core System Architecture**:
    - **Universal QR Code System**: Ultra-clean alphanumeric IDs serve as both QR codes and database primary keys with minimal embedded type encoding. Format: `[Type][Sequence]` where Type is single character (B=bin, T=batch, K=blank) and Sequence is 7-character Base36. Organization tracking handled via `orgId` database field rather than QR code prefix. Examples: `B413EFSY` (bin), `TJSOP5CU` (batch), `K1XTIGHU` (blank). Supports three distinct views: Bin tracking, Batch tracking, and Blank tracking. Tracks transformation from waste collection to delivery.
    - **Logistics & Operations Management**: Includes pickup scheduling, route optimization, mobile staff apps, and PWA thin clients at production stations.
    - **Community & Education Platform**: Features universal maker identity, skill trees, achievement systems, assembly guides, and workshop management.
    - **E-commerce & Product Systems**: Manages product catalog, order fulfillment, customer communication, and impact reporting.
    - **Orders System**: Serves as the central bridge between operational data and financial systems, enabling invoicing workflows and payment processing for various order types (collection service, product delivery, educational workshop, consulting).

### User Access Architecture
- **User Identity System**: Capability-based access; all users begin as makers, staff roles grant additional dashboard access. `orgId` provides read-only access for partner reporting.
- **Authentication Strategy**: NextAuth handles authentication only (Google Workspace SSO for staff, magic link support). All user data stored in MongoDB User schema. Session management via JWT tokens.
- **Dashboard Architecture**: Route-based portal navigation under `/portal/` with color-coded themes for different dashboards: Main, Profile, Admin, Operations, CRM, Partner, and Financial. Operations functions are consolidated into a single page. Production workflow is streamlined across two stations.

## External Dependencies

- **Database**: MongoDB serves as the single source of truth for all business operations data.
- **Authentication**: NextAuth for authentication only (JWT-based sessions, Google Workspace SSO for staff).
- **File Storage**: Private AWS S3 bucket for secure asset storage (partner logos, product images, design files).
- **UI Components**: shadcn/ui built on Radix UI primitives, styled with Tailwind CSS, and using Lucide React icons.
- **Communication**: Google Workspace for email automation, calendar synchronization, and communication workflows.
- **Financial Management**: QuickBooks for comprehensive accounting, invoice generation, and revenue tracking.
- **Payment Processing**: Stripe for secure transactions, subscription management, and ACH integration for B2B payments.
- **Hardware Integration**: USB HID scales and external USB cameras integrated directly into production station PWAs.
- **Shipping (Future/Conditional)**: Shippo/EasyPost for real-time shipping calculations for custom or oversized orders.