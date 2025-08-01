# PopCycle - Circular Plastic Tracking System

## Overview

PopCycle is a comprehensive circular economy platform that transforms corporate plastic waste into trackable, educational products. The system creates a self-reinforcing ecosystem connecting waste collection, manufacturing, education, and community engagement through QR code-based provenance tracking. Built as a full-stack TypeScript application, it demonstrates circular economy principles by turning abstract sustainability concepts into tangible, hands-on experiences through maker education and robotics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom PopCycle brand colors and pop-art aesthetic
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling and request logging
- **Data Layer**: In-memory storage implementation (IStorage interface) ready for database integration
- **Schema Validation**: Zod schemas shared between client and server for type safety

### Data Models
- **PlasticItem**: Core tracking entity with QR codes, source company, material type, processing status, and transformation journey
- **Partner**: Corporate, educational, and community organizations contributing to the circular economy
- **Metrics**: Aggregated sustainability impact data (total pieces, weight, carbon offset)

### QR Code Tracking System
- **URL Pattern**: `https://popcycle.io/p/ABC123` for individual item tracking
- **Provenance Chain**: Complete lifecycle from waste collection through manufacturing to end-user delivery
- **Status Tracking**: Multi-stage workflow (collected → processed → assembled → delivered)
- **Educational Integration**: Links to workshop participation and skill development

### Development Workflow
- **Hot Reload**: Vite development server with HMR for rapid iteration
- **Build Process**: Separate client (Vite) and server (esbuild) build pipelines
- **Type Safety**: Shared schema definitions ensure consistency across full stack
- **Error Handling**: Centralized error boundary with development-friendly error modals

## External Dependencies

### Database Integration (Prepared)
- **ORM**: Drizzle ORM configured for PostgreSQL with Neon Database serverless
- **Migration System**: Drizzle Kit for schema migrations and database management
- **Schema Location**: `./shared/schema.ts` for centralized data definitions

### UI Component Library
- **Design System**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Icons**: Lucide React icon library
- **Form Components**: Comprehensive form controls with validation support

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Session Management**: Express session handling prepared with connect-pg-simple
- **Error Tracking**: Runtime error overlay for development debugging
- **Code Quality**: TypeScript strict mode with comprehensive type checking

### Third-Party Services (Ready for Integration)
- **Database**: Neon Database serverless PostgreSQL (configured via DATABASE_URL)
- **QR Code Generation**: Framework prepared for QR code generation and scanning
- **File Storage**: Asset management through `attached_assets` directory structure