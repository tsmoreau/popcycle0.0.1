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
- **Data Models**: Key data models include: Org, Bin, Batch, Blank, User, Product, and Order (linking operations to financial systems).
- **Core System Architecture**:
    - **Universal QR Code System**: Clean alphanumeric IDs serve as both QR codes and database primary keys with embedded partner branding and subtle type encoding. Format: `[Partner][Type][Sequence]` where Partner is "000" for PopCycle or sequential numbers for partners, Type is single character (B=bin, T=batch, K=blank), and Sequence is 5-character Base36. Examples: `000BJDZ1Z` (PopCycle bin), `001T4AFYH` (partner batch). Supports three distinct views: Bin tracking, Batch tracking, and Blank tracking. Tracks transformation from waste collection to delivery.
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