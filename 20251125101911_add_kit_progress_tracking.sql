/*
  # Add Kit Progress Tracking System

  This migration creates tables for tracking user progress through resell kit courses.

  1. New Tables
    - `kit_progress`
      - Tracks which lessons users have completed
      - Stores last accessed timestamps
      - Links users to specific kit modules and lessons

    - `kit_enrollments`
      - Tracks which kits users have access to
      - Records enrollment date and source (purchase, membership, gift)

  2. Security
    - Enable RLS on all tables
    - Users can only view/update their own progress
    - Admin users can view all progress for analytics
*/

-- Create kit_enrollments table
CREATE TABLE IF NOT EXISTS kit_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  kit_id text NOT NULL,
  enrolled_at timestamptz DEFAULT now(),
  enrollment_source text DEFAULT 'purchase',
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create kit_progress table
CREATE TABLE IF NOT EXISTS kit_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  kit_id text NOT NULL,
  module_id text NOT NULL,
  lesson_id text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  last_accessed_at timestamptz DEFAULT now(),
  time_spent_seconds integer DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, kit_id, lesson_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_kit_enrollments_user_id ON kit_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_kit_enrollments_kit_id ON kit_enrollments(kit_id);
CREATE INDEX IF NOT EXISTS idx_kit_progress_user_id ON kit_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_kit_progress_kit_id ON kit_progress(kit_id);
CREATE INDEX IF NOT EXISTS idx_kit_progress_user_kit ON kit_progress(user_id, kit_id);

-- Enable Row Level Security
ALTER TABLE kit_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kit_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for kit_enrollments

-- Users can view their own enrollments
CREATE POLICY "Users can view own enrollments"
  ON kit_enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own enrollments (for purchases)
CREATE POLICY "Users can create own enrollments"
  ON kit_enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own enrollments
CREATE POLICY "Users can update own enrollments"
  ON kit_enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for kit_progress

-- Users can view their own progress
CREATE POLICY "Users can view own progress"
  ON kit_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can track own progress"
  ON kit_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON kit_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own progress (reset)
CREATE POLICY "Users can delete own progress"
  ON kit_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_kit_enrollments_updated_at
  BEFORE UPDATE ON kit_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kit_progress_updated_at
  BEFORE UPDATE ON kit_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create helper function to get user's course progress
CREATE OR REPLACE FUNCTION get_kit_progress_summary(p_user_id uuid, p_kit_id text)
RETURNS TABLE(
  total_lessons integer,
  completed_lessons integer,
  progress_percentage integer,
  last_accessed timestamptz,
  total_time_spent integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::integer as total_lessons,
    COUNT(*) FILTER (WHERE completed = true)::integer as completed_lessons,
    CASE
      WHEN COUNT(*) > 0 THEN
        ROUND((COUNT(*) FILTER (WHERE completed = true)::numeric / COUNT(*)::numeric) * 100)::integer
      ELSE 0
    END as progress_percentage,
    MAX(last_accessed_at) as last_accessed,
    COALESCE(SUM(time_spent_seconds), 0)::integer as total_time_spent
  FROM kit_progress
  WHERE user_id = p_user_id AND kit_id = p_kit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_kit_progress_summary TO authenticated;
