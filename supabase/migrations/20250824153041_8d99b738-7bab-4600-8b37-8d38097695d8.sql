-- Fix security issue: Restrict customer consultation data access
-- Replace the overly permissive SELECT policy with proper access controls

-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Service role can select consultation requests" ON public.consultation_requests;

-- Create a restrictive SELECT policy that only allows service_role access
-- This ensures only server-side operations (like admin dashboards) can read customer data
CREATE POLICY "Admin only access to consultation requests"
ON public.consultation_requests
FOR SELECT
TO service_role
USING (true);

-- Ensure public users can still submit consultation requests (keep existing INSERT policy)
-- The INSERT policy "Anyone can submit consultation requests" should remain unchanged

-- Add a comment for clarity
COMMENT ON POLICY "Admin only access to consultation requests" ON public.consultation_requests 
IS 'Only service role (admin/server) can read sensitive customer consultation data. Public users can only submit via INSERT.';