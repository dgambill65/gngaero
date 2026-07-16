DROP POLICY IF EXISTS "Enable read access for all users" ON public."Contacts";
REVOKE SELECT ON public."Contacts" FROM anon;
CREATE POLICY "Only admins can view contacts" ON public."Contacts" FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));