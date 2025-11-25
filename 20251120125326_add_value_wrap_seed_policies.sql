/*
  # Add Insert Policies for Value Wrap Seeding

  ## Overview
  Add policies to allow seeding of value wrap tables

  ## Changes
  - Add insert policies for public tables
*/

-- Allow inserts for identity levels
CREATE POLICY "Allow insert identity levels for seeding"
  ON agency_identity_levels FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Allow inserts for launch kits
CREATE POLICY "Allow insert launch kits for seeding"
  ON launch_kits FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Allow inserts for bonus assets
CREATE POLICY "Allow insert bonus assets for seeding"
  ON bonus_assets FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Allow inserts for benchmark metrics
CREATE POLICY "Allow insert benchmark metrics for seeding"
  ON benchmark_metrics FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);