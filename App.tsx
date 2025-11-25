
import React, { useState, useCallback, useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { AddClientPage } from './pages/AddClientPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { AgencyCopilot } from './components/AgencyCopilot';
import { ForAgenciesPage } from './pages/ForAgenciesPage';
import { ForPartnersPage } from './pages/ForPartnersPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { VendorDashboardPage } from './pages/VendorDashboardPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { SystemDetailPage } from './pages/SystemDetailPage';
import { InspirationsPage } from './pages/InspirationsPage';
import { BusinessInABoxPage } from './pages/BusinessInABoxPage';
import { IntakePage } from './pages/IntakePage';
import { StackActivationPage } from './pages/StackActivationPage';
import { LaunchSystemModal } from './components/LaunchSystemModal';
import { ResellKitsPage } from './pages/ResellKitsPage';
import { KitViewerPage } from './pages/KitViewerPage';
import { MembershipPage } from './pages/MembershipPage';
import { ImplementationPage } from './pages/ImplementationPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { VendorSubmitPage } from './pages/VendorSubmitPage';
import { MyPurchasesPage } from './pages/MyPurchasesPage';
import { DemoModePage } from './pages/DemoModePage';
import { NichePickerPage } from './pages/NichePickerPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProtocolDownloadPage } from './pages/ProtocolDownloadPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { PlaybooksPage } from './pages/PlaybooksPage';
import { BlueprintLoader } from './components/BlueprintLoader';
import { ENHANCED_INSPIRATIONS, CURATED_STACKS, BLOG_POSTS, DUMMY_MANAGED_VENDORS, DUMMY_CLIENTS, DUMMY_AGENCY_PROFILE, ALL_SOLUTIONS } from './constants';
import { getFiltersFromQuery, generateLaunchPlaybook } from './services/geminiService';
import type { Page, BlogPost, JourneyData, Priorities, Filters, Solution, ManagedVendor, Client, LaunchPlaybook, AgencyProfile, SolutionStack } from './types';


function AppContent() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [page, setPage] = useState<Page>((window.location.hash.replace('#', '') as Page) || 'home');
  const [activeKitId, setActiveKitId] = useState<string | null>(null);

  // Handle hash-based navigation
  React.useEffect(() => {
      const handleHashChange = () => {
          const rawHash = window.location.hash.replace('#', '');
          const [pathWithQuery] = rawHash.split('?');
          const [basePage, ...subPath] = pathWithQuery.split('/');

          // For routes with sub-paths like kitViewer/kitId/lessonId
          if (basePage) {
            setPage(basePage as Page);

            // Handle kitViewer sub-route
            if (basePage === 'kitViewer' && subPath.length > 0) {
              const kitId = subPath[0];
              if (kitId) {
                setActiveKitId(kitId);
              }
            }
          }
      };
      // Handle initial hash if present
      handleHashChange();

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [managedVendors, setManagedVendors] = useState<ManagedVendor[]>(DUMMY_MANAGED_VENDORS);
  const [clients, setClients] = useState<Client[]>(DUMMY_CLIENTS);
  const [agencyProfile] = useState<AgencyProfile>(DUMMY_AGENCY_PROFILE);
  const [searchInitialData, setSearchInitialData] = useState<JourneyData | null>(null);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [activeStack, setActiveStack] = useState<SolutionStack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [stackToLaunch, setStackToLaunch] = useState<SolutionStack | null>(null);

  const [isBuildingBlueprint, setIsBuildingBlueprint] = useState(false);

  // Lifted Comparison State
  const [comparisonList, setComparisonList] = useState<string[]>([]);

  const handleNavigate = useCallback((newPage: Page, context?: any) => {
    setPage(newPage);
    setActivePost(null);
    if (newPage !== 'clientDetail' && newPage !== 'clientPortal') {
        setActiveClient(null);
    }
    if (newPage !== 'solutionDetail') {
        setActiveSolution(null);
    }
    if (newPage !== 'systemDetail') {
        setActiveStack(null);
    }
    if (newPage !== 'search') {
        setSearchInitialData(null);
    }
    if (newPage !== 'kitViewer') {
        setActiveKitId(null);
    }

    if ((newPage === 'clientDetail' || newPage === 'clientPortal') && context?.clientId) {
        const client = clients.find(c => c.id === context.clientId);
        if (client) {
            setActiveClient(client);
        } else {
             setPage('clients');
        }
    }

    if (newPage === 'solutionDetail' && context?.solution) {
        setActiveSolution(context.solution);
    }

    if (newPage === 'systemDetail' && context?.stack) {
        setActiveStack(context.stack);
    }

    // Handle Stack Context for Activation Page
    if (newPage === 'stackActivation' && context?.stack) {
        setStackToLaunch(context.stack);
    }

    // Handle Kit Viewer navigation
    if (newPage === 'kitViewer' && context?.kitId) {
        setActiveKitId(context.kitId);
    }

    window.scrollTo(0, 0);
  }, [clients]);
  
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    handleNavigate('home');
  };

  const handleSelectPost = useCallback((postId: string) => {
    const post = BLOG_POSTS.find(p => p.id === postId);
    if (post) {
      setActivePost(post);
      setPage('blogPost');
      window.scrollTo(0, 0);
    }
  }, []);

  const handleAddVendor = (vendor: Omit<ManagedVendor, 'id'>) => {
    setManagedVendors(prev => [
      ...prev,
      { ...vendor, id: `mv-${Date.now()}` }
    ]);
  };
  
  const handleUpdateVendor = (updatedVendor: ManagedVendor) => {
    setManagedVendors(prev => prev.map(v => v.id === updatedVendor.id ? updatedVendor : v));
  };

  const handleDeleteVendor = (vendorId: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
        setManagedVendors(prev => prev.filter(v => v.id !== vendorId));
    }
  };

  const addNewClientToState = (newClientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...newClientData,
      id: `client-${Date.now()}`,
    };
    setClients(prev => [...prev, newClient]);
    handleNavigate('clientDetail', { clientId: newClient.id });
  };
  
  const handleManualAddClient = (
    clientCoreData: Omit<Client, 'id' | 'playbook' | 'status' | 'monthlySubscriptionPrice'>,
    playbook: LaunchPlaybook,
  ) => {
    const clientData: Omit<Client, 'id'> = {
      ...clientCoreData,
      playbook,
      status: 'Onboarding',
      monthlySubscriptionPrice: 0,
    };
    addNewClientToState(clientData);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
    setActiveClient(updatedClient);
  };

  const handleStartSearch = async (goal: string, priorities: Priorities) => {
    setIsLoading(true);
    setError(null);
    try {
        const initialFilters = await getFiltersFromQuery(goal);
        const searchData: JourneyData = {
            goal,
            priorities,
            filters: initialFilters,
        };
        setSearchInitialData(searchData);
        handleNavigate('marketplace');
    } catch (err) {
        setError("Failed to process your request. Please try again.");
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSelectInspiration = (inspirationPrompt: string) => {
    // 1. Find the Inspiration object to get the target Stack ID
    const inspiration = ENHANCED_INSPIRATIONS.find(i => i.prompt === inspirationPrompt);

    if (inspiration && inspiration.targetStackId) {
        // 2. Find the actual Stack data
        const targetStack = CURATED_STACKS.find(s => s.id === inspiration.targetStackId);

        if (targetStack) {
            // 3. Trigger "The Construction" Animation
            setIsBuildingBlueprint(true);

            // 4. Wait for animation (fake processing time), then navigate
            setTimeout(() => {
                setIsBuildingBlueprint(false);
                // Direct Flight to System Detail
                setActiveStack(targetStack);
                setPage('systemDetail');
                window.scrollTo(0, 0);
            }, 3500); // 3.5 seconds of anticipation
            return;
        }
    }

    // Fallback: If no specific stack is mapped, use the old Search flow
    const defaultPriorities: Priorities = { marginVsCost: 75, speedVsCustomization: 25, easeVsPower: 50 };
    handleStartSearch(inspirationPrompt, defaultPriorities);
  };
  
  const handleLaunchSystem = (stack: SolutionStack) => {
      setStackToLaunch(stack);
      handleNavigate('stackActivation', { stack });
      // setIsLaunchModalOpen(true); // Old modal flow disabled
  };

  const handleConfirmLaunch = async (clientDetails: { name: string, email: string }) => {
    if (!stackToLaunch) return;

    const stackSolutionIds = stackToLaunch.solutionIds;
    const managedVendorIds = managedVendors
        .filter(vendor => stackSolutionIds.includes(vendor.solutionId))
        .map(vendor => vendor.id);

    const playbook = await generateLaunchPlaybook(clientDetails.name, stackSolutionIds);

    const clientData: Omit<Client, 'id'> = {
        name: clientDetails.name,
        contactEmail: clientDetails.email,
        managedVendorIds,
        playbook,
        status: 'Onboarding',
        monthlySubscriptionPrice: 0,
    };
    
    addNewClientToState(clientData);
    setIsLaunchModalOpen(false);
    setStackToLaunch(null);
  };


  const renderPage = () => {
    const protectedPages: Page[] = ['dashboard', 'clients', 'addClient', 'clientDetail', 'vendorDashboard', 'myPurchases', 'playbooks'];

    if (authLoading) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (protectedPages.includes(page) && !authUser) {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    switch(page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSelectInspiration={handleSelectInspiration} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'signup':
        return <SignUpPage onNavigate={handleNavigate} />;
      case 'search':
      case 'marketplace':
        return <MarketplacePage
            key={JSON.stringify(searchInitialData)}
            initialData={searchInitialData}
            onNavigate={handleNavigate}
            onLaunchSystem={handleLaunchSystem}
            comparisonList={comparisonList}
            onToggleCompare={(id) => {
                if (id === 'CLEAR_ALL') setComparisonList([]);
                else setComparisonList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(0,3));
            }}
        />;
      case 'inspirations':
        return <InspirationsPage onSelectInspiration={handleSelectInspiration} onBack={() => handleNavigate('marketplace')} />;
      case 'solutionDetail':
        return activeSolution ?
            <SolutionDetailPage
                solution={activeSolution}
                onBack={() => handleNavigate('marketplace')}
                onNavigate={handleNavigate}
                isSelected={comparisonList.includes(activeSolution.id)}
                onToggleCompare={(id) => setComparisonList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(0,3))}
            /> :
            <MarketplacePage onNavigate={handleNavigate} onLaunchSystem={handleLaunchSystem} />;
      case 'systemDetail':
        // If no activeStack, try to find it from query params like ?id=stack-authority
        if (!activeStack) {
             const rawHash = window.location.hash.replace('#', '');
             const [_, queryString] = rawHash.split('?');
             const urlParams = new URLSearchParams(queryString);
             const stackId = urlParams.get('id');
             const stackFromUrl = CURATED_STACKS.find(s => s.id === stackId);
             if (stackFromUrl) {
                 return <SystemDetailPage stack={stackFromUrl} onBack={() => handleNavigate('marketplace')} onLaunch={handleLaunchSystem} onNavigate={handleNavigate} />;
             }
        }
        return activeStack ? <SystemDetailPage stack={activeStack} onBack={() => handleNavigate('marketplace')} onLaunch={handleLaunchSystem} onNavigate={handleNavigate} /> : <MarketplacePage onNavigate={handleNavigate} onLaunchSystem={handleLaunchSystem} />;
      case 'stacks':
        return <MarketplacePage
            onNavigate={handleNavigate}
            onLaunchSystem={handleLaunchSystem}
            defaultTab='stacks'
            comparisonList={comparisonList}
            onToggleCompare={(id) => {
                if (id === 'CLEAR_ALL') setComparisonList([]);
                else setComparisonList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(0,3));
            }}
        />;
      // Route for Vendor Submit
      case 'vendorSubmit':
        return <VendorSubmitPage onNavigate={handleNavigate} />;
      // Route for My Purchases
      case 'myPurchases':
        return <MyPurchasesPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage
            vendors={managedVendors}
            clients={clients}
            onAddVendor={handleAddVendor}
            onUpdateVendor={handleUpdateVendor}
            onDeleteVendor={handleDeleteVendor}
            onNavigate={handleNavigate}
            onLaunchSystem={handleLaunchSystem}
        />;
      case 'vendorDashboard':
        return <VendorDashboardPage />;
      case 'clients':
        return <ClientsPage clients={clients} onNavigate={handleNavigate} />;
      case 'playbooks':
        return <PlaybooksPage clients={clients} onNavigate={handleNavigate} />;
      case 'addClient':
        return <AddClientPage
            managedVendors={managedVendors}
            onAddClient={handleManualAddClient}
            onBack={() => handleNavigate('clients')}
        />;
      case 'clientDetail':
        return activeClient ? <ClientDetailPage
            client={activeClient}
            onUpdateClient={handleUpdateClient}
            onBack={() => handleNavigate('clients')}
            managedVendors={managedVendors}
            onNavigate={handleNavigate}
        /> : <ClientsPage clients={clients} onNavigate={handleNavigate} />;
      case 'clientPortal':
        return activeClient ? <ClientPortalPage
            client={activeClient}
            agencyProfile={agencyProfile}
            managedVendors={managedVendors}
        /> : <ClientsPage clients={clients} onNavigate={handleNavigate} />;
      case 'businessInABox':
        return <BusinessInABoxPage
            onStartSearch={handleStartSearch}
            isLoading={isLoading}
        />;
      case 'forAgencies':
        return <ForAgenciesPage
            onStartSearch={handleStartSearch}
            isLoading={isLoading}
            error={error}
        />;
      case 'forPartners':
        return <ForPartnersPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage posts={BLOG_POSTS} onSelectPost={handleSelectPost} />;
      case 'blogPost':
        return activePost ? <BlogPostPage post={activePost} onBack={() => handleNavigate('blog')} /> : <BlogPage posts={BLOG_POSTS} onSelectPost={handleSelectPost} />;
      case 'intake':
        return <IntakePage onNavigate={handleNavigate} />;
      case 'stackActivation':
        return <StackActivationPage stack={stackToLaunch} />;

      // New Monetization Pages
      case 'resellKits':
        return <ResellKitsPage onNavigate={handleNavigate} />;
      case 'kitViewer':
        return activeKitId ? (
          <KitViewerPage kitId={activeKitId} onBack={() => handleNavigate('resellKits')} />
        ) : (
          <ResellKitsPage onNavigate={handleNavigate} />
        );
      case 'membership':
        return <MembershipPage />;
      case 'implementation':
        return <ImplementationPage />;
      case 'demoMode':
        return <DemoModePage />;
      case 'nichePicker':
        return <NichePickerPage />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'protocolDownload':
        return <ProtocolDownloadPage onNavigate={handleNavigate} />;
      case 'getStarted':
        return <GetStartedPage onNavigate={handleNavigate} />;

      default:
        return <HomePage onNavigate={handleNavigate} onSelectInspiration={handleSelectInspiration} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {isBuildingBlueprint && <BlueprintLoader />}
      {page !== 'clientPortal' && page !== 'intake' && page !== 'stackActivation' && page !== 'demoMode' && <Header user={authUser ? { email: authUser.email || '', type: 'agency' } : null} onNavigate={handleNavigate} onLogout={handleLogout} />}
      <div className="flex-grow">
        {renderPage()}
      </div>
      {page !== 'clientPortal' && page !== 'intake' && page !== 'stackActivation' && page !== 'demoMode' && !['login', 'signup'].includes(page) && <Footer onNavigate={handleNavigate} onSelectPost={handleSelectPost} />}
      {authUser && page !== 'clientPortal' && page !== 'intake' && page !== 'stackActivation' && page !== 'demoMode' && <AgencyCopilot
        clients={clients}
        managedVendors={managedVendors}
        activeClient={activeClient}
      />}
      {isLaunchModalOpen && stackToLaunch && (
          <LaunchSystemModal 
            isOpen={isLaunchModalOpen}
            onClose={() => setIsLaunchModalOpen(false)}
            stack={stackToLaunch}
            onConfirmLaunch={handleConfirmLaunch}
            managedVendors={managedVendors}
          />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
