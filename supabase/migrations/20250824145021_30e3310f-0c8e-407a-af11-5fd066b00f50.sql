-- Fix critical security issue: Remove overly permissive SELECT policy
-- The consultation_requests table currently allows anyone to read all customer data
-- Since this is a contact form, customers should not be able to view other submissions

-- Drop the current insecure SELECT policy
DROP POLICY IF EXISTS "Users can view their own requests" ON public.consultation_requests;

-- Keep the INSERT policy for form submissions
-- Note: The INSERT policy "Anyone can submit consultation requests" is appropriate
-- as this allows visitors to submit contact forms without authentication