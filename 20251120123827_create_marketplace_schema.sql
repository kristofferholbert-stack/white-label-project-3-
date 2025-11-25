/*
  # White Label Wonder Marketplace Schema

  ## Overview
  Complete database schema for a comprehensive marketplace platform where agencies can:
  - Browse and purchase white-label solutions and stacks
  - Subscribe to membership tiers for access to resell kits and resources
  - Manage their clients and vendor relationships
  - Access implementation services and support

  ## New Tables

  ### 1. solutions
  Complete catalog of white-label solutions available in the marketplace
  - `id` (uuid, primary key)
  - `name` (text, not null) - Solution name
  - `company_name` (text) - Vendor company name
  - `company_website` (text) - Vendor website
  - `tagline` (text) - Short tagline
  - `short_description` (text) - Brief description
  - `detailed_description` (text) - Full description
  - `primary_category` (text) - Main category
  - `sub_category` (text) - Subcategory
  - `tags` (jsonb) - Array of tags
  - `logo` (text) - Logo URL
  - `rating` (numeric) - Average rating
  - `implementations` (int) - Number of implementations
  - `is_verified` (boolean) - Verification status
  - `is_featured` (boolean) - Featured status
  - `whitelabel_type` (text) - Type of white-labeling
  - `pricing_model` (jsonb) - Array of pricing models
  - `agency_margin` (numeric) - Margin percentage
  - `starting_price` (text) - Starting price
  - `setup_fee` (text) - Setup fee
  - `minimum_commitment` (text) - Minimum commitment period
  - `implementation_time` (text) - Time to implement
  - `integration_methods` (jsonb) - Integration options
  - `ideal_client_size` (jsonb) - Ideal client sizes
  - `features` (jsonb) - Feature list
  - `partner_support_model` (text) - Support model
  - `agency_readiness` (jsonb) - Readiness features
  - `value_addons` (jsonb) - Additional value propositions
  - `vendor_trust` (jsonb) - Trust indicators
  - `resell_range` (text) - Resale price range
  - `vendor_id` (uuid, references profiles) - Owner vendor
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. solution_stacks
  Curated combinations of solutions for specific use cases
  - `id` (uuid, primary key)
  - `name` (text, not null) - Stack name
  - `category` (text) - Stack category
  - `is_featured` (boolean) - Featured status
  - `image` (text) - Stack image URL
  - `target_niche` (text) - Target market niche
  - `target_team_size` (jsonb) - Target team sizes
  - `target_goal` (text) - Primary goal
  - `description` (text) - Stack description
  - `pitch` (text) - Sales pitch
  - `tags` (jsonb) - Array of tags
  - `solution_ids` (jsonb) - Array of solution IDs in stack
  - `suggested_resale_price` (text) - Suggested resale price
  - `typical_margin` (text) - Typical profit margin
  - `replaces` (jsonb) - Tools this stack replaces
  - `estimated_agency_cost` (text) - Cost for agency
  - `estimated_launch_time` (text) - Time to launch
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. resell_kits
  Downloadable kits with marketing and sales materials
  - `id` (uuid, primary key)
  - `title` (text, not null) - Kit title
  - `price` (numeric) - Price in cents
  - `value` (text) - Perceived value
  - `description` (text) - Kit description
  - `tags` (jsonb) - Array of tags
  - `features` (jsonb) - List of included features
  - `category` (text) - Kit category
  - `is_featured` (boolean) - Featured status
  - `assets` (jsonb) - Asset URLs and metadata
  - `required_tier` (text) - Membership tier required
  - `download_count` (int) - Number of downloads
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. membership_tiers
  Subscription tiers for platform access
  - `id` (uuid, primary key)
  - `name` (text, not null) - Tier name (e.g., 'Free', 'Pro', 'Enterprise')
  - `price_monthly` (numeric) - Monthly price in cents
  - `price_annual` (numeric) - Annual price in cents
  - `features` (jsonb) - Feature list
  - `max_clients` (int) - Maximum clients allowed
  - `max_downloads` (int) - Maximum kit downloads per month
  - `support_level` (text) - Support tier
  - `is_active` (boolean) - Whether tier is available
  - `sort_order` (int) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. user_memberships
  Track user subscription to membership tiers
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles) - User with membership
  - `tier_id` (uuid, references membership_tiers) - Subscribed tier
  - `status` (text) - 'active', 'cancelled', 'expired'
  - `billing_period` (text) - 'monthly' or 'annual'
  - `start_date` (timestamptz) - Subscription start
  - `end_date` (timestamptz) - Subscription end
  - `auto_renew` (boolean) - Auto-renewal status
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. purchases
  Track solution, stack, and kit purchases
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles) - Buyer
  - `item_type` (text) - 'solution', 'stack', 'resell_kit'
  - `item_id` (uuid) - ID of purchased item
  - `amount` (numeric) - Purchase amount in cents
  - `status` (text) - 'pending', 'completed', 'refunded'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. solution_reviews
  Reviews for solutions from agencies
  - `id` (uuid, primary key)
  - `solution_id` (uuid, references solutions)
  - `user_id` (uuid, references profiles) - Reviewer
  - `rating` (int) - Rating 1-5
  - `title` (text) - Review title
  - `comment` (text) - Review text
  - `is_verified_purchase` (boolean) - Verified buyer
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. managed_vendors
  Agencies track their vendor relationships
  - `id` (uuid, primary key)
  - `agency_id` (uuid, references profiles)
  - `solution_id` (uuid, references solutions)
  - `name` (text) - Custom vendor name
  - `monthly_cost` (numeric) - Monthly cost in cents
  - `contract_renewal_date` (date) - Renewal date
  - `status` (text) - 'Active', 'Trial', 'Inactive'
  - `support_contact` (text) - Support contact info
  - `notes` (text) - Agency notes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 9. agency_clients (extends existing clients table)
  Enhanced client tracking for agencies
  - `monthly_subscription_price` (numeric) - What agency charges client
  - `playbook` (jsonb) - Launch playbook data
  - `managed_vendor_ids` (jsonb) - Array of managed vendor IDs

  ### 10. favorites
  User favorites for solutions and stacks
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `item_type` (text) - 'solution' or 'stack'
  - `item_id` (uuid) - ID of favorited item
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for marketplace items (solutions, stacks, resell_kits)
  - Users can only modify their own data
  - Vendors can manage their solutions
  - Purchase and membership data is private to users
  - Reviews require verified purchases
*/

-- Create solutions table
CREATE TABLE IF NOT EXISTS solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company_name text,
  company_website text,
  tagline text,
  short_description text,
  detailed_description text,
  primary_category text,
  sub_category text,
  tags jsonb DEFAULT '[]'::jsonb,
  logo text,
  rating numeric DEFAULT 0,
  implementations int DEFAULT 0,
  is_verified boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  whitelabel_type text,
  pricing_model jsonb DEFAULT '[]'::jsonb,
  agency_margin numeric DEFAULT 0,
  starting_price text,
  setup_fee text,
  minimum_commitment text,
  implementation_time text,
  integration_methods jsonb DEFAULT '[]'::jsonb,
  ideal_client_size jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  partner_support_model text,
  agency_readiness jsonb DEFAULT '{}'::jsonb,
  value_addons jsonb DEFAULT '[]'::jsonb,
  vendor_trust jsonb DEFAULT '{}'::jsonb,
  resell_range text,
  vendor_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view solutions"
  ON solutions FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Vendors can create solutions"
  ON solutions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update own solutions"
  ON solutions FOR UPDATE
  TO authenticated
  USING (auth.uid() = vendor_id)
  WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can delete own solutions"
  ON solutions FOR DELETE
  TO authenticated
  USING (auth.uid() = vendor_id);

-- Create solution_stacks table
CREATE TABLE IF NOT EXISTS solution_stacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text,
  is_featured boolean DEFAULT false,
  image text,
  target_niche text,
  target_team_size jsonb DEFAULT '[]'::jsonb,
  target_goal text,
  description text,
  pitch text,
  tags jsonb DEFAULT '[]'::jsonb,
  solution_ids jsonb DEFAULT '[]'::jsonb,
  suggested_resale_price text,
  typical_margin text,
  replaces jsonb DEFAULT '[]'::jsonb,
  estimated_agency_cost text,
  estimated_launch_time text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE solution_stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stacks"
  ON solution_stacks FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create stacks"
  ON solution_stacks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own stacks"
  ON solution_stacks FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own stacks"
  ON solution_stacks FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create resell_kits table
CREATE TABLE IF NOT EXISTS resell_kits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price numeric DEFAULT 0,
  value text,
  description text,
  tags jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  category text,
  is_featured boolean DEFAULT false,
  assets jsonb DEFAULT '[]'::jsonb,
  required_tier text DEFAULT 'free',
  download_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resell_kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resell kits"
  ON resell_kits FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create membership_tiers table
CREATE TABLE IF NOT EXISTS membership_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price_monthly numeric DEFAULT 0,
  price_annual numeric DEFAULT 0,
  features jsonb DEFAULT '[]'::jsonb,
  max_clients int DEFAULT 0,
  max_downloads int DEFAULT 0,
  support_level text,
  is_active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE membership_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view membership tiers"
  ON membership_tiers FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- Create user_memberships table
CREATE TABLE IF NOT EXISTS user_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier_id uuid NOT NULL REFERENCES membership_tiers(id) ON DELETE RESTRICT,
  status text DEFAULT 'active',
  billing_period text DEFAULT 'monthly',
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  auto_renew boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memberships"
  ON user_memberships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own memberships"
  ON user_memberships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memberships"
  ON user_memberships FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  amount numeric DEFAULT 0,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create purchases"
  ON purchases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create solution_reviews table
CREATE TABLE IF NOT EXISTS solution_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  solution_id uuid NOT NULL REFERENCES solutions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  is_verified_purchase boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(solution_id, user_id)
);

ALTER TABLE solution_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON solution_reviews FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create reviews"
  ON solution_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON solution_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON solution_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create managed_vendors table
CREATE TABLE IF NOT EXISTS managed_vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  solution_id uuid NOT NULL REFERENCES solutions(id) ON DELETE CASCADE,
  name text NOT NULL,
  monthly_cost numeric DEFAULT 0,
  contract_renewal_date date,
  status text DEFAULT 'Active',
  support_contact text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE managed_vendors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agencies can view own vendors"
  ON managed_vendors FOR SELECT
  TO authenticated
  USING (auth.uid() = agency_id);

CREATE POLICY "Agencies can insert own vendors"
  ON managed_vendors FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = agency_id);

CREATE POLICY "Agencies can update own vendors"
  ON managed_vendors FOR UPDATE
  TO authenticated
  USING (auth.uid() = agency_id)
  WITH CHECK (auth.uid() = agency_id);

CREATE POLICY "Agencies can delete own vendors"
  ON managed_vendors FOR DELETE
  TO authenticated
  USING (auth.uid() = agency_id);

-- Enhance existing clients table with additional fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'monthly_subscription_price'
  ) THEN
    ALTER TABLE clients ADD COLUMN monthly_subscription_price numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'playbook'
  ) THEN
    ALTER TABLE clients ADD COLUMN playbook jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'managed_vendor_ids'
  ) THEN
    ALTER TABLE clients ADD COLUMN managed_vendor_ids jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_solutions_vendor_id ON solutions(vendor_id);
CREATE INDEX IF NOT EXISTS idx_solutions_category ON solutions(primary_category);
CREATE INDEX IF NOT EXISTS idx_solutions_featured ON solutions(is_featured);
CREATE INDEX IF NOT EXISTS idx_solution_stacks_created_by ON solution_stacks(created_by);
CREATE INDEX IF NOT EXISTS idx_solution_stacks_category ON solution_stacks(category);
CREATE INDEX IF NOT EXISTS idx_user_memberships_user_id ON user_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_memberships_status ON user_memberships(status);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_item_type ON purchases(item_type);
CREATE INDEX IF NOT EXISTS idx_solution_reviews_solution_id ON solution_reviews(solution_id);
CREATE INDEX IF NOT EXISTS idx_managed_vendors_agency_id ON managed_vendors(agency_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_solutions_updated_at') THEN
    CREATE TRIGGER update_solutions_updated_at
      BEFORE UPDATE ON solutions
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_solution_stacks_updated_at') THEN
    CREATE TRIGGER update_solution_stacks_updated_at
      BEFORE UPDATE ON solution_stacks
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_clients_updated_at') THEN
    CREATE TRIGGER update_clients_updated_at
      BEFORE UPDATE ON clients
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;