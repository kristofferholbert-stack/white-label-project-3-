/*
  # Initial Schema Setup for White Label Wonder

  ## Overview
  This migration creates the foundational database schema for the White Label Wonder platform,
  including user profiles, client management, and solution stacks.

  ## New Tables

  ### 1. profiles
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, not null)
  - `full_name` (text)
  - `company_name` (text)
  - `role` (text) - user role: 'agency', 'client', 'vendor'
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. clients
  - `id` (uuid, primary key)
  - `agency_id` (uuid, references profiles) - the agency that owns this client
  - `name` (text, not null)
  - `industry` (text)
  - `company_size` (text)
  - `contact_email` (text)
  - `contact_phone` (text)
  - `status` (text) - 'active', 'inactive', 'pending'
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. stacks
  - `id` (uuid, primary key)
  - `client_id` (uuid, references clients) - optional, null for template stacks
  - `name` (text, not null)
  - `description` (text)
  - `category` (text) - e.g., 'marketing', 'crm', 'analytics'
  - `tools` (jsonb) - array of tools in the stack
  - `status` (text) - 'draft', 'active', 'archived'
  - `is_template` (boolean) - whether this is a reusable template
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can read/update their own profile
  - Agencies can manage their own clients
  - Users can view stacks they created or that belong to their clients
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  company_name text,
  role text DEFAULT 'agency',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  industry text,
  company_size text,
  contact_email text,
  contact_phone text,
  status text DEFAULT 'active',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agencies can view own clients"
  ON clients FOR SELECT
  TO authenticated
  USING (agency_id = auth.uid());

CREATE POLICY "Agencies can insert own clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (agency_id = auth.uid());

CREATE POLICY "Agencies can update own clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (agency_id = auth.uid())
  WITH CHECK (agency_id = auth.uid());

CREATE POLICY "Agencies can delete own clients"
  ON clients FOR DELETE
  TO authenticated
  USING (agency_id = auth.uid());

-- Create stacks table
CREATE TABLE IF NOT EXISTS stacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  category text,
  tools jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'draft',
  is_template boolean DEFAULT false,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stacks"
  ON stacks FOR SELECT
  TO authenticated
  USING (created_by = auth.uid() OR is_template = true);

CREATE POLICY "Users can insert own stacks"
  ON stacks FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own stacks"
  ON stacks FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can delete own stacks"
  ON stacks FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clients_agency_id ON clients(agency_id);
CREATE INDEX IF NOT EXISTS idx_stacks_client_id ON stacks(client_id);
CREATE INDEX IF NOT EXISTS idx_stacks_created_by ON stacks(created_by);
CREATE INDEX IF NOT EXISTS idx_stacks_is_template ON stacks(is_template);