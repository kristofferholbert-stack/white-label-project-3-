/*
  # Add Admin Seed Policies

  ## Overview
  Temporarily add policies to allow seeding data for public tables.
  These policies allow inserts without vendor_id for initial data seeding.

  ## Changes
  - Add insert policies for solutions without vendor requirement
  - Add insert policies for solution_stacks without creator requirement
  - Add insert policies for resell_kits and membership_tiers
*/

-- Drop restrictive insert policies temporarily and recreate with more permissive rules for seeding

-- Solutions: Allow inserts without vendor_id for seeding
DROP POLICY IF EXISTS "Vendors can create solutions" ON solutions;

CREATE POLICY "Anyone can create solutions for seeding"
  ON solutions FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Solution Stacks: Allow inserts without created_by for seeding
DROP POLICY IF EXISTS "Authenticated users can create stacks" ON solution_stacks;

CREATE POLICY "Anyone can create stacks for seeding"
  ON solution_stacks FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Resell Kits: Already viewable by all, just need insert
CREATE POLICY "Allow insert resell kits for seeding"
  ON resell_kits FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Membership Tiers: Already viewable by all, just need insert
CREATE POLICY "Allow insert membership tiers for seeding"
  ON membership_tiers FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);
