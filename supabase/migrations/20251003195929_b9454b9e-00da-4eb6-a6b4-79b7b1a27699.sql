-- Fix critical security issue: Properly restrict consultation_requests access
-- Only authenticated admin users should be able to read consultation requests

-- First, drop all existing SELECT policies on consultation_requests
DROP POLICY IF EXISTS "Admin only access to consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Service role can select consultation requests" ON public.consultation_requests;

-- Create an enum for user roles
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
  END IF;
END $$;

-- Create user_roles table to manage admin access
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create RLS policy: Only admins can read consultation requests
CREATE POLICY "Only admins can view consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Service role can always access (for server-side operations)
CREATE POLICY "Service role full access to consultation requests"
ON public.consultation_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Keep the public INSERT policy (anyone can submit requests)
-- The existing "Anyone can submit consultation requests" policy remains unchanged

-- Allow users to see their own role
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only service role can manage roles (prevent privilege escalation)
CREATE POLICY "Service role can manage user roles"
ON public.user_roles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add helpful comment
COMMENT ON TABLE public.user_roles IS 'Stores user roles. Only admins can view consultation requests. Roles must be assigned server-side to prevent privilege escalation.';
COMMENT ON FUNCTION public.has_role IS 'Security definer function to check user roles without triggering RLS recursion.';
