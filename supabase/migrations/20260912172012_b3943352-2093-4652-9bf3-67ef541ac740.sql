CREATE TABLE public.whitepaper_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  document text NOT NULL DEFAULT 'MKT-05 Rev H — F&DT Planning for Hybrid eVTOL Structures',
  consent boolean NOT NULL DEFAULT false,
  referrer text,
  user_agent text
);

GRANT SELECT ON public.whitepaper_leads TO authenticated;
GRANT ALL ON public.whitepaper_leads TO service_role;

ALTER TABLE public.whitepaper_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view whitepaper leads"
  ON public.whitepaper_leads FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role full access to whitepaper leads"
  ON public.whitepaper_leads FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX whitepaper_leads_email_idx ON public.whitepaper_leads (email);
CREATE INDEX whitepaper_leads_created_at_idx ON public.whitepaper_leads (created_at DESC);

CREATE POLICY "Service role manages whitepapers bucket"
  ON storage.objects FOR ALL TO service_role
  USING (bucket_id = 'whitepapers') WITH CHECK (bucket_id = 'whitepapers');