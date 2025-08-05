# PopCycle - Circular Plastic Tracking System

## Overview

PopCycle is a comprehensive circular economy platform that transforms corporate plastic waste into trackable, educational products. The system creates a self-reinforcing ecosystem connecting waste collection, manufacturing, education, and community engagement through QR code-based provenance tracking. Built as a Next.js full-stack application with MongoDB, it demonstrates circular economy principles by turning abstract sustainability concepts into tangible, hands-on experiences through maker education and robotics.

**Latest Feature**: Maker registration system allowing customers to declare assembly completion, creating a fourth "Assembled" step in the transformation journey timeline. Features email verification through planned NextAuth.js integration for data integrity.

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
- **Framework**: Next.js API Routes for serverless functions
- **Database**: MongoDB for flexible document storage
- **API Design**: RESTful API routes with server-side rendering capabilities
- **Data Layer**: MongoDB collections with QR code-based tracking
- **Architecture**: Serverless functions that combine data fetching and page rendering for optimal scaling

### Data Models
- **Org**: Client partners (Discovery Cube, Ace Hotel, etc.) with contact information and organizational details
- **Bin**: Physical branded containers with QR codes at partner locations, linked to organizations
- **Batch**: Collection records created when bins are emptied, inheriting provenance from bins
- **Item**: Individual physical blanks or finished products with unique QR codes, linked to batches
- **User**: People who interact with the system, assemble items, and track their maker skills
- **Product**: Design files, templates, and specifications for each item type (rovers, coasters, etc.)

### QR Code Tracking System
- **URL Pattern**: `https://popcycle.io/p/ABC123` for individual item tracking
- **Provenance Chain**: Complete lifecycle from waste collection through manufacturing to end-user delivery
- **Status Tracking**: Multi-stage workflow (collected → processed → assembled → delivered)
- **Educational Integration**: Links to workshop participation and skill development

### Development Workflow
- **Hot Reload**: Next.js development server with Fast Refresh for rapid iteration
- **Build Process**: Next.js unified build system for client and server
- **Type Safety**: TypeScript with strict mode for comprehensive type checking
- **Error Handling**: Next.js error boundaries with development-friendly overlays

## External Dependencies

### Database Integration 
- **Database**: MongoDB for flexible document storage and tracking
- **Connection**: Native MongoDB driver with connection pooling
- **Data Structure**: JSON documents for plastic items, partners, and metrics

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

## In-House Systems Strategy

### CRM (Partner Management)
- **Implementation**: MongoDB views/queries within existing PWA dashboard
- **Data Source**: Existing `orgs` collection with added status fields (lead, prospect, active, churned)
- **Features**: Lead pipeline tracking, nested communication logs, contract status management
- **Integration**: Google Workspace API for automated email/calendar generation

### Logistics (Pickup Scheduling)  
- **Implementation**: Staff-facing views of bin/batch data with operational workflows
- **Features**: Geographic route planning, real-time pickup status updates, historical optimization
- **Mobile Interface**: Staff apps to update bin status and create batch records on collection
- **Integration**: Calendar sync for schedules, notification system for route changes

### User Tracking and Skill Development
- **Implementation**: Rich nested documents within user collection tracking complete maker journey
- **Features**: Skill progression trees, achievement systems, assembly history with photos
- **Community**: Maker profiles, story sharing, mentorship matching, gamification
- **Data Architecture**: All tracking stored as nested user data for complete maker profiles

### External Service Integration
- **Financial**: QuickBooks for comprehensive accounting, Stripe for payment processing
- **Communication**: Google Workspace for email/calendar automation
- **Philosophy**: In-house systems for competitive advantage, external services for commoditized functions