# Codebase Structure

This document describes the organized folder structure of the White Label Wonder application.

## 📁 Project Structure

```
project/
├── src/                       # Main application source code
│   ├── pages/                 # Page components (35 files)
│   ├── components/            # Reusable UI components (42 files)
│   ├── services/              # API and service integrations (7 files)
│   ├── context/               # React Context providers (2 files)
│   ├── types/                 # TypeScript type definitions (2 files)
│   └── constants/             # Constants and static data (10 files)
├── supabase/                  # Supabase configuration
│   └── migrations/            # Database migrations
├── App.tsx                    # Main application component
├── index.tsx                  # Application entry point
├── vite.config.ts             # Vite configuration
└── [config files]             # Other configuration files
```

## 📂 Detailed Structure

### `/src/pages/` (35 page components)

**Main Pages:**
- `AboutPage.tsx` - About page
- `HomePage.tsx` - Landing/home page
- `ContactPage.tsx` - Contact page
- `TermsPage.tsx` - Terms of service
- `PrivacyPage.tsx` - Privacy policy

**Authentication:**
- `LoginPage.tsx` - User login
- `SignUpPage.tsx` - User registration

**Dashboard:**
- `DashboardPage.tsx` - Agency dashboard
- `VendorDashboardPage.tsx` - Vendor dashboard

**Client Management:**
- `ClientsPage.tsx` - Client list view
- `AddClientPage.tsx` - Add new client
- `ClientDetailPage.tsx` - Client details
- `ClientPortalPage.tsx` - Client-facing portal

**Marketplace & Solutions:**
- `MarketplacePage.tsx` - Solution marketplace
- `SolutionDetailPage.tsx` - Individual solution details
- `SystemDetailPage.tsx` - System stack details
- `InspirationsPage.tsx` - Inspiration gallery
- `ResellKitsPage.tsx` - Resellable kits
- `KitViewerPage.tsx` - Kit content viewer
- `MyPurchasesPage.tsx` - User's purchases

**Business Operations:**
- `BusinessInABoxPage.tsx` - Business-in-a-box offerings
- `IntakePage.tsx` - Client intake quiz
- `StackActivationPage.tsx` - Stack activation flow
- `MembershipPage.tsx` - Membership information
- `ImplementationPage.tsx` - Implementation guide
- `NichePickerPage.tsx` - Niche selection tool
- `ProtocolDownloadPage.tsx` - Protocol downloads
- `GetStartedPage.tsx` - Getting started guide
- `PlaybooksPage.tsx` - Playbook library

**Marketing:**
- `ForAgenciesPage.tsx` - Agency landing page
- `ForPartnersPage.tsx` - Partner landing page
- `ResellerPage.tsx` - Reseller information
- `BlogPage.tsx` - Blog listing
- `BlogPostPage.tsx` - Individual blog post

**Vendor:**
- `VendorSubmitPage.tsx` - Vendor submission form

### `/src/components/` (42 UI components)

**Layout Components:**
- `Header.tsx` - Site header/navigation
- `Footer.tsx` - Site footer
- `ProgressBar.tsx` - Progress indicator

**Modals:**
- `AddVendorModal.tsx` - Add vendor modal
- `BonusUnlockModal.tsx` - Bonus unlock modal
- `ComparisonModal.tsx` - Solution comparison modal
- `LaunchSystemModal.tsx` - System launch modal
- `RevenueGoalModal.tsx` - Revenue goal setting modal
- `StackActivationModal.tsx` - Stack activation modal

**Cards:**
- `SearchSolutionCard.tsx` - Solution search result card
- `SolutionCard.tsx` - Solution display card
- `StackCard.tsx` - Stack display card
- `TripwireCard.tsx` - Tripwire offer card

**Filters:**
- `CategoryFilterSection.tsx` - Category filter section
- `FilterAccordion.tsx` - Filter accordion component
- `FilterSection.tsx` - General filter section
- `FilterSummaryCard.tsx` - Filter summary display
- `MobileFilterDrawer.tsx` - Mobile filter drawer

**Dashboards:**
- `GrowthDashboard.tsx` - Growth metrics dashboard
- `OpsDashboard.tsx` - Operations dashboard
- `ReputationDashboard.tsx` - Reputation management dashboard
- `VendorStats.tsx` - Vendor statistics display

**Specialized Components:**
- `AgencyCopilot.tsx` - AI assistant component
- `AiLoadingAnimation.tsx` - AI loading animation
- `BlueprintLoader.tsx` - Blueprint loading component
- `ComparisonTray.tsx` - Comparison tray
- `CompletionCertificate.tsx` - Course completion certificate
- `CopyBlock.tsx` - Copyable code block
- `CourseUpsellWidget.tsx` - Course upsell widget
- `Feedback.tsx` - Feedback form
- `GapAnalysis.tsx` - Gap analysis tool
- `HeroStackComponents.tsx` - Hero section for stacks
- `IdentityBadge.tsx` - Identity badge display
- `JourneyStepper.tsx` - Multi-step journey component
- `ListingOptimizer.tsx` - Listing optimization tool
- `LockedOverlay.tsx` - Content lock overlay
- `NicheRoulette.tsx` - Niche selection roulette
- `ResultsSection.tsx` - Results display section
- `StackDetailPanel.tsx` - Stack detail panel

**Wizard Steps:**
- `Step1Goal.tsx` - Wizard step 1
- `Step2Priorities.tsx` - Wizard step 2
- `Step3Details.tsx` - Wizard step 3

### `/src/services/` (7 files)

- `supabase.ts` - Supabase client configuration
- `geminiService.ts` - Google Gemini AI integration
- `marketplaceService.ts` - Marketplace business logic
- `stripeService.ts` - Stripe payment integration
- `seedDatabase.ts` - Database seeding utilities
- `seedValueWrap.ts` - Value wrap seeding helpers
- `index.ts` - Service exports

### `/src/context/` (2 files)

- `AuthProvider.tsx` - Authentication context provider
- `AuthContext.tsx` - Authentication context definition
- `index.ts` - Context exports

### `/src/types/` (2 files)

- `types.ts` - All TypeScript type definitions
- `index.ts` - Type exports

### `/src/constants/` (10 files)

- `constants.ts` - Main application constants
- `assets.ts` - Asset references and URLs
- `affiliates.ts` - Affiliate program data
- `RESELL_KITS_NEW.ts` - Resellable kit definitions
- `kitModules.ts` - Kit module configurations
- `localSeoKitContent.ts` - Local SEO kit content
- `localSeoKitContentPart2.ts` - Local SEO kit content (continued)
- `reputationKitContentPart2.ts` - Reputation kit content
- `tripwire-content.ts` - Tripwire offer content
- `index.ts` - Constants exports

## 🔄 Barrel Exports

Each directory includes an `index.ts` file for convenient barrel exports:

```typescript
// Instead of:
import { HomePage } from './src/pages/HomePage';
import { DashboardPage } from './src/pages/DashboardPage';

// You can use:
import { HomePage, DashboardPage } from './src/pages';
```

## 📦 Import Guidelines

### From Root Files (App.tsx, index.tsx):
```typescript
import { ComponentName } from './src/components/ComponentName';
import { PageName } from './src/pages/PageName';
import { serviceName } from './src/services/serviceName';
```

### From Within `/src/`:
```typescript
import { ComponentName } from '../components/ComponentName';
import type { TypeName } from '../types/types';
import { CONSTANT_NAME } from '../constants/constants';
```

## 🎯 Benefits of This Structure

1. **Improved Navigation** - Files are organized by purpose and easy to find
2. **Scalability** - Structure supports growth without becoming unwieldy
3. **Separation of Concerns** - Clear boundaries between pages, components, services
4. **Better Onboarding** - New developers can quickly understand the codebase
5. **Industry Standard** - Follows React/TypeScript best practices
6. **Reduced Cognitive Load** - No more scrolling through 98 files in one directory

## 📊 File Count Summary

- **Pages**: 35 page components
- **Components**: 42 reusable UI components
- **Services**: 7 service/API integration files
- **Context**: 2 React Context provider files
- **Types**: 2 TypeScript definition files
- **Constants**: 10 constant and static data files
- **Total Organized**: 98 files

---

**Last Updated**: November 2025
**Structure Version**: 1.0.0
