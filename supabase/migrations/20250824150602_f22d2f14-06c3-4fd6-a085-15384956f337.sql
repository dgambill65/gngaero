-- Harden data access for sensitive table: consultation_requests
-- Keep public INSERTs for the contact form, restrict SELECTs to service role only

-- Ensure RLS is enabled
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Restrictive SELECT: only service_role (server/dashboard) may read
DROP POLICY IF EXISTS "Service role can select consultation requests" ON public.consultation_requests;
CREATE POLICY "Service role can select consultation requests"
ON public.consultation_requests
FOR SELECT
TO service_role
USING (true);
