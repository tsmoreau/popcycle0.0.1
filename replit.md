# PopCycle - Circular Plastic Tracking System

## Overview

PopCycle is a comprehensive circular economy platform that transforms corporate plastic waste into trackable, educational products. The system creates a self-reinforcing ecosystem connecting waste collection, manufacturing, education, and community engagement through QR code-based provenance tracking. Built as a unified Next.js PWA with MongoDB, it serves as the single in-house system managing all operations - from partner CRM and logistics scheduling to maker skill tracking and community engagement - while integrating with external services only for communications (Google Workspace) and finance (QuickBooks/Stripe).

**Current Development Focus**: Building comprehensive circular economy platform with dual QR code system, production workflow automation, and unified business management through PWA architecture.

## User Preferences

Preferred communication style: Simple, everyday language.
Brand colors: Must use exact HSL values - pop-green: hsl(142, 100%, 35%), pop-blue: hsl(214, 100%, 50%), pop-red: hsl(347, 100%, 60%), pop-black: hsl(0, 0%, 0%), pop-gray: hsl(0, 0%, 20%).

## Current State (Updated Jan 2025)

### Hero Section Styling
- Each page has unique color hero sections with full-bleed backgrounds
- Home: White background (original style)
- Shop: Green background with black bottom border
- Services: Blue background (no border)
- About: Red background (no border) 
- Track: Black background with white bottom border
- Partners page removed per user request

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and TypeScript
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom PopCycle brand colors and pop-art aesthetic inspired by Experimental Jetset and constructivism with green color palette
- **Design Philosophy**: Timeless systematic approach with bold geometric elements and restrained minimalism that balances institutional weight with pop art energy

### Backend Architecture
- **Framework**: Next.js API Routes for serverless functions serving as unified business system
- **Database**: MongoDB for flexible document storage handling all operational data
- **API Design**: RESTful API routes supporting CRM, logistics, user tracking, and QR code tracking
- **Data Layer**: Unified MongoDB collections managing partner relationships, pickup scheduling, maker progression, and provenance tracking
- **Architecture**: Single PWA handling all business operations with strategic external integrations for finance and communications

### Data Models
- **Org**: Client partners with CRM pipeline status, contact information, contracts, and interaction history
- **Bin**: Physical branded containers with QR codes at partner locations, pickup schedules, and capacity tracking
- **Batch**: Collection records with provenance chain, processing status, and transformation tracking
- **Item**: Individual trackable products with QR codes, assembly status, and maker progression integration
- **User**: Capability-based identity system where all users start as makers and accumulate access rights over time
- **Product**: Design templates, assembly guides, customization options, and inventory specifications

### Core System Architecture

#### QR Code & Provenance Tracking
- **Dual QR Code System**: Each item features redundant tracking codes for reliability and user experience
  - **Offline Backup QR**: Large, non-customer-facing code containing minimal provenance JSON for permanent accessibility
  - **Customer QR Code**: Clean, front-facing code linking to `https://popcycle.io/track/ABC123` for public engagement
- **ID Structure**: Human-readable prefixed identifiers using UUID-based generation for collision-free tracking
  - `BI-` prefix for bins, `BA-` for batches, `IT-` for items
  - Stateless `/track/[id]` page handles any valid ID type through prefix detection
- **Manufacturing Integration**: Both QR codes re-lasered at final manufacturing to survive CNC cutting processes
- **Transformation Chain**: Waste collection → batch processing → blank production → maker assembly → delivery
- **Real-time Status**: Live updates across physical operations with mobile staff workflows
- **Educational Integration**: Assembly tutorials, maker skill progression, and community achievement systems
- **Redundant Data Storage**: Critical provenance information stored both in QR payload and database for offline accessibility

#### Logistics & Operations Management
- **Pickup Scheduling**: Route optimization with calendar integration and real-time status updates
- **Mobile Workflows**: Staff apps for collection, batch creation, and inventory management
- **Production Stations**: PWA thin clients at manufacturing stations for real-time coordination
  - Weighing/Photo Station: HID scale integration, webcam capture, one-button item creation
  - Laser Station: QR code display for copy/paste into Lightburn, completion tracking
- **Hardware Integration**: USB HID scales for automatic weight input, external USB cameras via `navigator.mediaDevices.getUserMedia()`
- **Capacity Planning**: Bin monitoring, production scheduling, and resource allocation
- **Quality Control**: Batch tracking, processing metrics, and compliance documentation

#### Community & Education Platform
- **Universal Maker Identity**: All users maintain maker progression regardless of additional roles or partner affiliations
- **Maker Progression**: Skill trees, achievement systems, and assembly history tracking
- **Tutorial System**: Step-by-step assembly guides with progress validation
- **Community Features**: Mentorship matching, project sharing, and peer recognition
- **Workshop Management**: Event scheduling, registration, and skill certification

#### E-commerce & Product Systems
- **Product Catalog**: Customizable items with real-time inventory and provenance display
- **Order Fulfillment**: Integration with maker assembly workflows and shipping coordination
- **Customer Communication**: Automated updates throughout the transformation and delivery process
- **Impact Reporting**: Partner-specific metrics, sustainability data, and circular economy storytelling

### Development Workflow
- **Hot Reload**: Next.js development server with Fast Refresh for rapid iteration
- **Build Process**: Next.js unified build system for client and server
- **Type Safety**: TypeScript with strict mode for comprehensive type checking
- **Error Handling**: Next.js error boundaries with development-friendly overlays

## External Dependencies

### Unified Database Architecture
- **Database**: MongoDB as single source of truth for all business operations
- **Connection**: Native MongoDB driver with connection pooling
- **Data Structure**: Integrated collections supporting CRM (orgs), logistics (bins/batches), user progression (makers), and provenance tracking (items)
- **Philosophy**: All operational data in-house, external services only for finance and communications

### UI Component Library
- **Design System**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Icons**: Lucide React icon library
- **Form Components**: Comprehensive form controls with validation support

### Development Tools
- **Next.js Development**: Hot reload with built-in development server
- **Error Tracking**: Runtime error overlay for development debugging
- **Code Quality**: TypeScript strict mode with comprehensive type checking

### Third-Party Services
- **Database**: MongoDB for document storage and QR code tracking
- **QR Code Generation**: Framework prepared for QR code generation and scanning
- **File Storage**: Asset management through `attached_assets` directory structure

## Business Operations Architecture

The PWA serves as the complete business management system with five integrated dashboard views of the same MongoDB data:

### Partner Management (CRM)
Built into PWA dashboard using `orgs` collection with lead pipeline tracking, communication logs, and contract management. Google Workspace integration for automated correspondence.

### Operations & Logistics
Staff interfaces for pickup scheduling and route optimization using `bins` and `batches` collections. Real-time status updates and mobile collection workflows.

### Maker Community & Skills
Rich user progression system with nested maker profiles, skill trees, assembly history, and community features. All tracking data stored within user documents.

### Complete Operational Stack
**Four-Tool Business Infrastructure:**
- **PopCycle PWA**: All business operations (CRM, logistics, user tracking, provenance)
- **Google Workspace**: Communications, email automation, calendar integration
- **QuickBooks**: Comprehensive accounting and financial reporting
- **Stripe**: Payment processing and transaction management

**Philosophy**: Everything needed to run the entire circular economy operation with minimal external dependencies and maximum operational control.

## Dashboard Architecture

### Portal Structure
All business dashboards organized under `/portal/` with role-based access:

- **Admin Dashboard** (`/portal/admin`) - User management, system settings, permissions
- **Operations Dashboard** (`/portal/operations`) - Bins, batches, pickups, logistics workflow
- **CRM Dashboard** (`/portal/crm`) - Sales pipeline, relationship management, events management
- **Partner Dashboard** (`/portal/partner`) - Client self-service portal with bins, impact reports
- **Financial Dashboard** (`/portal/financial`) - Revenue tracking, cost analysis, QuickBooks integration

### Production Workflow Architecture
- **Station 1 - Weighing/Photo/Creation**: Batch ID input, HID scale integration, webcam capture, database entry creation, QR code generation
- **Station 2 - Laser Processing**: Queue management, QR code display for Lightburn integration, completion status updates
- **PWA Integration**: Thin client approach using browser-based interfaces at each production station for real-time data coordination

### User Access Architecture

#### User Identity System
**Default User Type**: All users begin as makers with user profile and progression tracking. The system employs capability-based access where users accumulate permissions and dashboard access over time without losing their foundational maker identity.

**Staff Designation**: `role` field exists only for staff positions ("admin", "operations_staff", "crm_staff"). Absence of role indicates standard maker user.

**Partner Affiliation**: `orgId` field grants read-only access to partner reporting dashboard for that organization's data. Partner dashboards are purely reporting tools with zero write permissions.

#### Access Control Matrix
- **Standard Maker**: User profile with maker progression
- **Partner-Affiliated Maker**: User profile + read-only partner reporting dashboard
- **Staff**: User profile + authorized staff dashboard(s) based on role
- **Staff with Partner Affiliation**: User profile + staff dashboard(s) + partner reporting dashboard

#### Authentication Strategy
**Single Sign-On** across all authorized areas. **Production Stations** use quick staff authentication for manufacturing workflows. **Universal Provenance Access** allows all users to view complete transformation chains via QR code tracking.

### User-Facing Pages
- **User Profile** - Universal maker progression, skills, assembly history for all users
- **Public Pages** - Home, shop, services, about, track (accessible without authentication)

## System Integration Architecture

### External Service Coordination
- **Google Workspace Integration**: Automated email campaigns, calendar synchronization, and communication workflows
- **QuickBooks Synchronization**: Real-time financial data, invoice generation, and revenue tracking
- **Stripe Payment Processing**: Secure transactions with order fulfillment integration and subscription management
- **Mobile Operations**: Staff applications for pickup scheduling, batch processing, and real-time status updates

### Data Synchronization Strategy
- **Real-time Updates**: Live status tracking across physical operations and digital interfaces
- **Offline Capability**: Mobile staff workflows with sync-when-connected functionality  
- **Integration Resilience**: Graceful handling of external service downtime with local operation continuity
- **Audit Trails**: Complete activity logging for compliance, debugging, and operational optimization