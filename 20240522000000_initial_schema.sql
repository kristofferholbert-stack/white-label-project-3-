
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Public Profile)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text check (role in ('agency', 'vendor')) default 'agency',
  company_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MANAGED VENDORS TABLE
create table public.managed_vendors (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  solution_id text, -- References solutions.id (text based id from constants)
  name text not null,
  logo text,
  monthly_cost numeric,
  contract_renewal_date date,
  status text check (status in ('Active', 'Trial', 'Inactive')),
  support_contact text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CLIENTS TABLE
create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  contact_email text,
  status text check (status in ('Onboarding', 'Active', 'Churned')),
  monthly_subscription_price numeric,
  managed_vendor_ids text[], -- Array of vendor IDs
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PLAYBOOKS TABLE
create table public.playbooks (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.clients(id) on delete cascade not null,
  data jsonb not null, -- Stores LaunchPlaybook object
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SOLUTIONS TABLE (From Constants)
create table public.solutions (
  id text primary key,
  name text not null,
  company_name text,
  data jsonb not null -- Stores full Solution object
);

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text check (status in ('active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'trialing', 'unpaid')),
  plan_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- Users
alter table public.users enable row level security;
create policy "Users can view their own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert their own profile" on public.users for insert with check (auth.uid() = id);

-- Managed Vendors
alter table public.managed_vendors enable row level security;
create policy "Users can view their own vendors" on public.managed_vendors for select using (auth.uid() = user_id);
create policy "Users can insert their own vendors" on public.managed_vendors for insert with check (auth.uid() = user_id);
create policy "Users can update their own vendors" on public.managed_vendors for update using (auth.uid() = user_id);
create policy "Users can delete their own vendors" on public.managed_vendors for delete using (auth.uid() = user_id);

-- Clients
alter table public.clients enable row level security;
create policy "Users can view their own clients" on public.clients for select using (auth.uid() = user_id);
create policy "Users can insert their own clients" on public.clients for insert with check (auth.uid() = user_id);
create policy "Users can update their own clients" on public.clients for update using (auth.uid() = user_id);
create policy "Users can delete their own clients" on public.clients for delete using (auth.uid() = user_id);

-- Playbooks
alter table public.playbooks enable row level security;
-- Allow access if the client belongs to the user
create policy "Users can view playbooks for their clients" on public.playbooks for select using (
  exists (
    select 1 from public.clients
    where public.clients.id = public.playbooks.client_id
    and public.clients.user_id = auth.uid()
  )
);
create policy "Users can insert playbooks for their clients" on public.playbooks for insert with check (
  exists (
    select 1 from public.clients
    where public.clients.id = public.playbooks.client_id
    and public.clients.user_id = auth.uid()
  )
);
create policy "Users can update playbooks for their clients" on public.playbooks for update using (
  exists (
    select 1 from public.clients
    where public.clients.id = public.playbooks.client_id
    and public.clients.user_id = auth.uid()
  )
);
create policy "Users can delete playbooks for their clients" on public.playbooks for delete using (
  exists (
    select 1 from public.clients
    where public.clients.id = public.playbooks.client_id
    and public.clients.user_id = auth.uid()
  )
);

-- Solutions (Read-only for everyone, or authenticated)
alter table public.solutions enable row level security;
create policy "Everyone can view solutions" on public.solutions for select using (true);

-- Subscriptions
alter table public.subscriptions enable row level security;
create policy "Users can view their own subscription" on public.subscriptions for select using (auth.uid() = user_id);

-- Trigger for creating user profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid conflict on re-runs (though create trigger usually fails if exists)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
-- Seed data for solutions
INSERT INTO solutions (id, name, company_name, data) VALUES
('cal-com-scheduling', 'Cal.com White-Label Scheduling', 'Cal.com', '{"id":"cal-com-scheduling","name":"Cal.com White-Label Scheduling","companyName":"Cal.com","companyWebsite":"https://cal.com/","tagline":"The open-source scheduling infrastructure for everyone.","shortDescription":"A 100% white-label, open-source scheduling platform that agencies can self-host or use via the cloud.","detailedDescription":"Cal.com is a highly flexible and developer-friendly scheduling platform. Its open-source nature allows for deep customization, and its white-label options enable agencies to offer a completely branded scheduling solution to their clients. It can be self-hosted for full control or used via their cloud service for ease of use.","primaryCategory":"Business Operations & SaaS","subCategory":"Booking & Scheduling","tags":["Scheduling","Open Source","API-first"],"logo":"https://i.imgur.com/ODs02d2.png","rating":4.9,"implementations":10000,"isVerified":true,"isFeatured":true,"whitelabelType":"Full White Label","pricingModel":["Monthly Subscription","Per-User/Per-Seat Pricing"],"agencyMargin":40,"startingPrice":"2/user/month","setupFee":"No Setup Fee","minimumCommitment":"Monthly","implementationTime":"Instant / Self-service","integrationMethods":["REST API","Webhook Support","Embeddable Iframe / Widget"],"idealClientSize":["Small Business (1-50 employees)","Mid-Market (51-1000 employees)","Enterprise (1000+ employees)"],"features":["Fully brandable and customizable scheduling pages","Open-source with self-hosting option","Routing forms for complex scheduling logic","Team scheduling and round-robin assignments","Extensive integrations with calendars and apps"],"partnerSupportModel":"Hybrid","reviews":[{"id":"rev-cal-1","agencyName":"Growth Gurus","rating":5,"title":"An absolute game-changer for us","comment":"The flexibility of the API allowed us to build a scheduling experience that is perfectly tailored to our clients. Self-hosting gives us full control. Highly recommend!","date":"2023-09-15"},{"id":"rev-cal-2","agencyName":"SaaS Wizards","rating":4,"title":"Great product, steep learning curve","comment":"Powerful tool, but be prepared to invest some developer time to get the most out of it. The end result is worth it though.","date":"2023-08-20"}],"agencyReadiness":{"hasCustomDomain":true,"canRemoveBranding":true,"hasWhiteLabelMobileApp":false,"hasResellerBilling":true},"valueAddons":["Open Source Codebase"],"vendorTrust":{"hasPublicRoadmap":true,"hasSLA":true,"hasDataMigration":true},"resellRange":"$50-$150/mo"}'),
('reviewboost-ai', 'ReviewBoost AI', 'ReviewBoost', '{"id":"reviewboost-ai","name":"ReviewBoost AI","companyName":"ReviewBoost","companyWebsite":"https://reviewboost.example.com/","tagline":"Automate review generation on autopilot.","shortDescription":"A white-label platform to help local businesses automatically collect more positive reviews on Google, Yelp, and more.","detailedDescription":"ReviewBoost AI connects with a business''s CRM or payment system to automatically text or email customers after a transaction, asking for a review. It intelligently routes happy customers to review sites and unhappy customers to a private feedback form, protecting the business''s online reputation.","primaryCategory":"Marketing & Advertising","subCategory":"Reputation & Reviews","tags":["Reputation Management","Local SEO","Automation"],"logo":"https://picsum.photos/seed/reviews/100/100","rating":4.8,"implementations":2500,"isVerified":true,"isFeatured":true,"whitelabelType":"Full White Label","pricingModel":["Volume-Based Tiers","Per-User/Per-Seat Pricing"],"agencyMargin":60,"startingPrice":"49/month","setupFee":"50 one-time","minimumCommitment":"Monthly","implementationTime":"1-3 Business Days","integrationMethods":["Zapier Integration","REST API"],"idealClientSize":["Small Business (1-50 employees)"],"features":["Automated review requests via SMS and email","Sentiment analysis to filter feedback","Dashboard for monitoring reviews across sites","Customizable branding and messaging","Direct integration with major review platforms"],"partnerSupportModel":"Agency-led","reviews":[{"id":"rev-rb-1","agencyName":"Local SEO Pros","rating":5,"title":"Our clients love this!","comment":"We''ve seen a 300% increase in positive reviews for our clients since implementing ReviewBoost. It''s easy to set up and pretty much runs itself.","date":"2023-10-05"}],"agencyReadiness":{"hasCustomDomain":true,"canRemoveBranding":true,"hasWhiteLabelMobileApp":false,"hasResellerBilling":true},"valueAddons":["White-Label Knowledge Base","Industry Templates"],"vendorTrust":{"hasPublicRoadmap":false,"hasSLA":true,"hasDataMigration":false},"resellRange":"$299-$499/mo"}'),
('sol-1', 'Payment Processing via Stripe Connect', 'Stripe', '{"id":"sol-1","name":"Payment Processing via Stripe Connect","companyName":"Stripe","companyWebsite":"https://stripe.com/connect","tagline":"The payments platform for platforms.","shortDescription":"Offer branded payment processing and financial services to your clients.","detailedDescription":"Stripe Connect is a white-label solution that allows platforms and agencies to facilitate payments for their clients. You can build a fully branded payment experience, manage payouts, and offer financial services, all while Stripe handles the complexity of payment processing, security, and compliance.","primaryCategory":"Fintech, Blockchain & Web3","subCategory":"Payments & Banking","tags":["Payments","API / SDK-first","High Margin"],"logo":"https://picsum.photos/seed/stripe/100/100","rating":4.9,"implementations":25000,"isVerified":true,"whitelabelType":"API / SDK-first","pricingModel":["Usage-Based","Revenue Share"],"agencyMargin":40,"startingPrice":"Usage-Based","setupFee":"No Setup Fee","minimumCommitment":"None","implementationTime":"1-2 Weeks","integrationMethods":["REST API","SDK/Library"],"idealClientSize":["Small Business (1-50 employees)","Mid-Market (51-1000 employees)"],"features":["Fully Branded & Customizable Payment UI","Onboard and Verify Clients Securely (KYC)","Facilitate Payments for Multiple Parties","Manage Complex Payouts and Fund Flows"],"partnerSupportModel":"Direct to Vendor","reviews":[],"agencyReadiness":{"hasCustomDomain":true,"canRemoveBranding":true,"hasWhiteLabelMobileApp":false,"hasResellerBilling":true},"valueAddons":[],"vendorTrust":{"hasPublicRoadmap":true,"hasSLA":true,"hasDataMigration":true}}'),
('sol-2', 'Agency-Ready Social Media Scheduler', 'SocialBloom', '{"id":"sol-2","name":"Agency-Ready Social Media Scheduler","companyName":"SocialBloom","companyWebsite":"https://socialbloom.example.com","tagline":"A complete social media management platform under your brand.","shortDescription":"A complete social media management platform under your brand.","detailedDescription":"SocialBloom offers a fully white-labeled dashboard for scheduling posts, tracking analytics, and managing client approvals. Provide your clients with a powerful social media tool that carries your agency''s branding throughout.","primaryCategory":"Marketing & Advertising","subCategory":"Social Media Marketing","tags":["Social Media","Turnkey Solution","Easy to Use"],"logo":"https://picsum.photos/seed/social/100/100","rating":4.8,"implementations":5000,"isVerified":true,"isFeatured":true,"whitelabelType":"Full White Label","pricingModel":["Per-User/Per-Seat Pricing","Volume-Based Tiers"],"agencyMargin":50,"startingPrice":"9/month","setupFee":"No Setup Fee","minimumCommitment":"Quarterly","implementationTime":"1-3 Business Days","integrationMethods":["No-code Integration","Zapier Integration"],"idealClientSize":["Small Business (1-50 employees)"],"features":["Content Calendar & Scheduling","Client Approval Workflows","Branded Analytics Reports","Inbox Management"],"partnerSupportModel":"Agency-led","reviews":[{"id":"rev-sb-1","agencyName":"Marketing Mavericks","rating":5,"title":"The perfect turnkey solution","comment":"We were up and running in a day. Our clients find it intuitive and the branded reports are a professional touch that they appreciate.","date":"2023-09-01"},{"id":"rev-sb-2","agencyName":"Brand Builders Co.","rating":4,"title":"Solid and reliable","comment":"It does exactly what it says it will. Doesn''t have all the bells and whistles of some enterprise tools, but for the price and ease of use, it''s unbeatable for SMB clients.","date":"2023-07-11"}],"agencyReadiness":{"hasCustomDomain":true,"canRemoveBranding":true,"hasWhiteLabelMobileApp":true,"hasResellerBilling":true},"valueAddons":["Pre-built Content Calendar Templates","Automation Workflows"],"vendorTrust":{"hasPublicRoadmap":true,"hasSLA":true,"hasDataMigration":false}}');
