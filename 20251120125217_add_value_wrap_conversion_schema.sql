/*
  # Value Wrap Conversion System Schema

  ## Overview
  Implements the "Value Wrap" high-conversion strategy with identity-based progression,
  bonus kits, and retention mechanics.

  ## New Tables

  ### 1. agency_identity_levels
  Define progression levels with thresholds and benefits
  - `id` (uuid, primary key)
  - `name` (text) - 'Side Hustler', 'Agency Builder', 'Empire Scale'
  - `slug` (text) - URL-friendly identifier
  - `min_mrr` (numeric) - Minimum MRR to reach this level
  - `max_mrr` (numeric) - Maximum MRR for this level
  - `badge_icon` (text) - Icon/emoji for badge
  - `badge_color` (text) - CSS color for badge
  - `description` (text) - Level description
  - `benefits` (jsonb) - Array of benefits at this level
  - `sort_order` (int) - Display order

  ### 2. launch_kits
  Bonus asset packages linked to solutions and stacks
  - `id` (uuid, primary key)
  - `title` (text) - Kit name
  - `description` (text) - What's included
  - `total_value` (numeric) - Claimed dollar value (e.g., 99700 = $997)
  - `item_type` (text) - 'solution', 'stack', 'category'
  - `item_id` (uuid) - Related solution/stack ID
  - `category` (text) - For category-wide kits
  - `assets` (jsonb) - Array of asset objects with URLs
  - `access_tier` (text) - 'free', 'verified_trial', 'pro', 'enterprise'
  - `is_featured` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. bonus_assets
  Individual downloadable assets in launch kits
  - `id` (uuid, primary key)
  - `launch_kit_id` (uuid, references launch_kits)
  - `title` (text) - Asset name
  - `description` (text) - Asset description
  - `asset_type` (text) - 'template', 'script', 'checklist', 'video', 'tool'
  - `file_url` (text) - Download URL
  - `file_size` (text) - Human readable size
  - `estimated_value` (numeric) - Dollar value claim
  - `sort_order` (int)
  - `created_at` (timestamptz)

  ### 4. user_progression
  Track user journey through identity levels
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `current_level_id` (uuid, references agency_identity_levels)
  - `current_mrr` (numeric) - User's reported MRR
  - `target_mrr` (numeric) - Next level target
  - `intake_responses` (jsonb) - Store full intake quiz results
  - `completed_steps` (jsonb) - Array of completed setup steps
  - `unlocked_bonuses` (jsonb) - Array of unlocked launch kit IDs
  - `trial_verifications` (jsonb) - Array of verified vendor trials
  - `onboarding_completed` (boolean)
  - `last_updated` (timestamptz)
  - `created_at` (timestamptz)

  ### 5. affiliate_tracking
  Track affiliate link clicks and conversions
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `solution_id` (uuid, references solutions)
  - `stack_id` (uuid, references solution_stacks)
  - `affiliate_url` (text) - The affiliate link clicked
  - `bonus_unlocked` (boolean) - Whether user unlocked bonus
  - `trial_verified` (boolean) - Whether trial was verified
  - `verification_screenshot` (text) - URL to verification proof
  - `clicked_at` (timestamptz)
  - `verified_at` (timestamptz)

  ### 6. benchmark_metrics
  Store aggregate benchmarking data
  - `id` (uuid, primary key)
  - `category` (text) - Service category
  - `metric_type` (text) - 'pricing', 'margin', 'client_count', 'churn'
  - `percentile_25` (numeric)
  - `percentile_50` (numeric)
  - `percentile_75` (numeric)
  - `percentile_90` (numeric)
  - `sample_size` (int)
  - `last_calculated` (timestamptz)

  ### 7. setup_prerequisites
  Checklist items for launching stacks
  - `id` (uuid, primary key)
  - `stack_id` (uuid, references solution_stacks)
  - `title` (text) - Prerequisite name
  - `description` (text) - What's needed
  - `category` (text) - 'legal', 'technical', 'financial'
  - `affiliate_link` (text) - Optional affiliate link for service
  - `help_url` (text) - Tutorial or guide link
  - `is_required` (boolean)
  - `sort_order` (int)

  ### 8. user_setup_progress
  Track completion of prerequisites
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `prerequisite_id` (uuid, references setup_prerequisites)
  - `completed` (boolean)
  - `notes` (text)
  - `completed_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can view their own progression and setup data
  - Launch kits and assets are publicly viewable
  - Affiliate tracking is private to users
  - Benchmark metrics are publicly readable
*/

-- Create agency_identity_levels table
CREATE TABLE IF NOT EXISTS agency_identity_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  min_mrr numeric DEFAULT 0,
  max_mrr numeric,
  badge_icon text,
  badge_color text,
  description text,
  benefits jsonb DEFAULT '[]'::jsonb,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agency_identity_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view identity levels"
  ON agency_identity_levels FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create launch_kits table
CREATE TABLE IF NOT EXISTS launch_kits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  total_value numeric DEFAULT 0,
  item_type text,
  item_id uuid,
  category text,
  assets jsonb DEFAULT '[]'::jsonb,
  access_tier text DEFAULT 'free',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE launch_kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view launch kits"
  ON launch_kits FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create bonus_assets table
CREATE TABLE IF NOT EXISTS bonus_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  launch_kit_id uuid REFERENCES launch_kits(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  asset_type text,
  file_url text,
  file_size text,
  estimated_value numeric DEFAULT 0,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bonus_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view bonus assets"
  ON bonus_assets FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create user_progression table
CREATE TABLE IF NOT EXISTS user_progression (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  current_level_id uuid REFERENCES agency_identity_levels(id),
  current_mrr numeric DEFAULT 0,
  target_mrr numeric DEFAULT 0,
  intake_responses jsonb DEFAULT '{}'::jsonb,
  completed_steps jsonb DEFAULT '[]'::jsonb,
  unlocked_bonuses jsonb DEFAULT '[]'::jsonb,
  trial_verifications jsonb DEFAULT '[]'::jsonb,
  onboarding_completed boolean DEFAULT false,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_progression ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progression"
  ON user_progression FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progression"
  ON user_progression FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progression"
  ON user_progression FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create affiliate_tracking table
CREATE TABLE IF NOT EXISTS affiliate_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  solution_id uuid REFERENCES solutions(id) ON DELETE SET NULL,
  stack_id uuid REFERENCES solution_stacks(id) ON DELETE SET NULL,
  affiliate_url text,
  bonus_unlocked boolean DEFAULT false,
  trial_verified boolean DEFAULT false,
  verification_screenshot text,
  clicked_at timestamptz DEFAULT now(),
  verified_at timestamptz
);

ALTER TABLE affiliate_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own affiliate tracking"
  ON affiliate_tracking FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert affiliate tracking"
  ON affiliate_tracking FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own affiliate tracking"
  ON affiliate_tracking FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create benchmark_metrics table
CREATE TABLE IF NOT EXISTS benchmark_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  metric_type text NOT NULL,
  percentile_25 numeric,
  percentile_50 numeric,
  percentile_75 numeric,
  percentile_90 numeric,
  sample_size int DEFAULT 0,
  last_calculated timestamptz DEFAULT now(),
  UNIQUE(category, metric_type)
);

ALTER TABLE benchmark_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view benchmark metrics"
  ON benchmark_metrics FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create setup_prerequisites table
CREATE TABLE IF NOT EXISTS setup_prerequisites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stack_id uuid REFERENCES solution_stacks(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text,
  affiliate_link text,
  help_url text,
  is_required boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE setup_prerequisites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view prerequisites"
  ON setup_prerequisites FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create user_setup_progress table
CREATE TABLE IF NOT EXISTS user_setup_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  prerequisite_id uuid NOT NULL REFERENCES setup_prerequisites(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  notes text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, prerequisite_id)
);

ALTER TABLE user_setup_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own setup progress"
  ON user_setup_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own setup progress"
  ON user_setup_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own setup progress"
  ON user_setup_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_progression_user_id ON user_progression(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progression_level ON user_progression(current_level_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_tracking_user_id ON affiliate_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_tracking_solution ON affiliate_tracking(solution_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_tracking_stack ON affiliate_tracking(stack_id);
CREATE INDEX IF NOT EXISTS idx_launch_kits_item ON launch_kits(item_type, item_id);
CREATE INDEX IF NOT EXISTS idx_bonus_assets_kit ON bonus_assets(launch_kit_id);
CREATE INDEX IF NOT EXISTS idx_setup_prerequisites_stack ON setup_prerequisites(stack_id);
CREATE INDEX IF NOT EXISTS idx_user_setup_progress_user ON user_setup_progress(user_id);

-- Add trigger for updated_at on launch_kits
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_launch_kits_updated_at') THEN
    CREATE TRIGGER update_launch_kits_updated_at
      BEFORE UPDATE ON launch_kits
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;