# PopCycle - Circular Plastic Tracking System

## Overview
PopCycle is a comprehensive circular economy platform designed to transform corporate plastic waste into trackable, educational products. It establishes a self-reinforcing ecosystem that connects waste collection, manufacturing, education, and community engagement through QR code-based provenance tracking. The system functions as a unified Next.js PWA, serving as the central in-house system for managing all operations, from partner CRM and logistics scheduling to maker skill tracking and community engagement. Its primary business vision is to minimize external dependencies, integrating only with essential services for communication (Google Workspace) and finance (QuickBooks/Stripe), ensuring maximum operational control and a complete in-house solution for the entire circular economy process.

## User Preferences
Preferred communication style: Simple, everyday language.
Brand colors: Must use exact HSL values - pop-green: hsl(142, 100%, 35%), pop-blue: hsl(214, 100%, 50%), pop-red: hsl(347, 100%, 60%), pop-black: hsl(0, 0%, 0%), pop-gray: hsl(0, 0%, 20%).
User preference confirmed: Operations functions contained in single file rather than complex sub-folder organization.
User preference: Individual transaction lists preferred over categorized summaries for financial data visibility.

## System Architecture
PopCycle is built as a unified Next.js PWA with MongoDB, managing all core operations. The system now includes a separate rover subsite at `/rovers/` for the Insight Rovers educational robotics platform.

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
    - **Dual QR Code System**: Each item has an offline backup QR code (minimal JSON) and a customer-facing QR code linking to `https://popcycle.io/track/ABC123`. IDs are human-readable, prefixed UUIDs (e.g., `BI-`, `BA-`, `IT-`). QR codes are re-lasered post-manufacturing. The system tracks the transformation chain from waste collection to delivery with real-time status updates.
    - **Logistics & Operations Management**: Includes pickup scheduling with route optimization, mobile staff apps for collection and inventory, and PWA thin clients at production stations for coordination (e.g., weighing/photo station with HID scale integration, laser station).
    - **Community & Education Platform**: Features a universal maker identity, skill trees, achievement systems, step-by-step assembly guides, and workshop management.
    - **E-commerce & Product Systems**: Manages product catalog, order fulfillment, customer communication, and impact reporting.

### User Access Architecture
- **User Identity System**: All users begin as makers; access is capability-based. Staff roles (`admin`, `operations_staff`, `crm_staff`) grant additional dashboard access. `orgId` provides read-only access to partner reporting.
- **Authentication Strategy**: Single Sign-On across authorized areas. Production stations use quick staff authentication. Universal provenance access is available via QR codes.
- **Dashboard Architecture**: Route-based portal navigation under `/portal/` with color-coded themes for different dashboards: Main, Profile, Admin, Operations, CRM, Partner, and Financial. Operations functions are consolidated into a single page. Production workflow is streamlined across two stations: Weighing/Photo/Creation and Laser Processing, both integrated via PWA thin clients.

## External Dependencies

- **Database**: MongoDB serves as the single source of truth for all business operations data, including CRM, logistics, user progression, and provenance tracking.
- **UI Components**: shadcn/ui built on Radix UI primitives, styled with Tailwind CSS, and using Lucide React icons.
- **Communication**: Google Workspace for email automation, calendar synchronization, and communication workflows.
- **Financial Management**: QuickBooks for comprehensive accounting, invoice generation, and revenue tracking.
- **Payment Processing**: Stripe for secure transactions and subscription management.
- **Hardware Integration**: USB HID scales and external USB cameras integrated directly into production station PWAs.
- **File Storage**: Asset management via `attached_assets` directory structure.