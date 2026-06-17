
-- Restrict has_role() so anon/authenticated cannot invoke it directly via the API.
-- RLS policy evaluation still works because policies execute with the table owner's privileges.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- Lock down storage.objects for the private 'GnG Design' bucket.
-- Only the service_role (edge functions/admin) can read or modify objects.
CREATE POLICY "GnG Design bucket: service role read"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'GnG Design');

CREATE POLICY "GnG Design bucket: service role insert"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'GnG Design');

CREATE POLICY "GnG Design bucket: service role update"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'GnG Design')
WITH CHECK (bucket_id = 'GnG Design');

CREATE POLICY "GnG Design bucket: service role delete"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'GnG Design');
