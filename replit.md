# PopCycle - Circular Plastic Tracking System

## Overview
PopCycle is a comprehensive circular economy platform designed to transform corporate plastic waste into trackable, educational products. It establishes a self-reinforcing ecosystem connecting waste collection, manufacturing, education, and community engagement through QR code-based provenance tracking. The system functions as a unified Next.js PWA, serving as the central in-house system for managing all operations, from partner CRM and logistics scheduling to maker skill tracking and community engagement. Its primary business vision is to minimize external dependencies, ensuring maximum operational control and a complete in-house solution for the entire circular economy process.

## User Preferences
Preferred communication style: Simple, everyday language.
Brand colors: Must use exact HSL values - pop-green: hsl(142, 100%, 35%), pop-blue: hsl(214, 100%, 50%), pop-red: hsl(347, 100%, 60%), pop-black: hsl(0, 0%, 0%), pop-gray: hsl(0, 0%, 20%).
User preference confirmed: Operations functions contained in single file rather than complex sub-folder organization.
User preference: Individual transaction lists preferred over categorized summaries for financial data visibility.
User preference: State management must be shared between fullscreen and regular views - filtering/sorting must persist when switching between view modes.
User preference: Visual icon distinctions are important - QR code and maximize icons should be clearly different.
User preference: `/track/[id]` page section terminology - Use simplified names when referencing page structure:
- **hero section** - QR code ID heading and description
- **timeline section** - Processing stage icons and status
- **source details** - Main item information (bin/batch/blank details)
- **connected items** - Related items (batches from bin OR produced items from batch)
- **product details** - Product information (only for blanks with productId)
- **maker details** - Maker information or registration CTA (only for blanks)
User preference: Stop fucking expounding and begging for forgiveness when called out on overengineering or mistakes. Just acknowledge briefly and move forward.

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
    - **Universal QR Code System**: Ultra-clean alphanumeric IDs serve as both QR codes and database primary keys with minimal embedded type encoding. Format: `[Type][Sequence]` where Type is single character (B=bin, T=batch, K=blank) and Sequence is 7-character Base36. Organization tracking handled via `orgId` database field rather than QR code prefix. Supports three distinct views: Bin tracking, Batch tracking, and Blank tracking. Tracks transformation from waste collection to delivery.
    - **Logistics & Operations Management**: Includes pickup scheduling, route optimization, mobile staff apps, and PWA thin clients at production stations.
    - **Community & Education Platform**: Features universal maker identity, skill trees, achievement systems, assembly guides, and workshop management.
    - **E-commerce & Product Systems**: Manages product catalog, order fulfillment, customer communication, and impact reporting.
    - **Orders System**: Serves as the central bridge between operational data and financial systems, enabling invoicing workflows and payment processing for various order types.

### User Access Architecture
- **User Identity System**: Capability-based access; all users begin as makers, staff roles grant additional dashboard access. `orgId` provides read-only access for partner reporting.
- **Authentication Strategy**: NextAuth handles authentication only (Google Workspace SSO for all users, magic links as backup). All user data stored in MongoDB User schema. Session management via JWT tokens.
- **Dashboard Architecture**: Route-based portal navigation under `/portal/` with color-coded themes for different dashboards: Main, Profile, Admin, Operations, CRM, Partner, and Financial. Operations functions are consolidated into a single page.

## External Dependencies

- **Database**: MongoDB
- **Authentication**: NextAuth
- **File Storage**: Private AWS S3 bucket
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS, Lucide React icons
- **Communication**: Google Workspace
- **Financial Management**: QuickBooks
- **Payment Processing**: Stripe
- **Hardware Integration**: USB HID scales and external USB cameras (for production station PWAs)
- **Shipping (Future/Conditional)**: Shippo/EasyPost