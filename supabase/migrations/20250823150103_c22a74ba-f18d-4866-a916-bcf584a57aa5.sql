-- Create consultation_requests table
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert consultation requests (public form)
CREATE POLICY "Anyone can submit consultation requests" 
ON public.consultation_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow viewing own requests (for future user auth)
CREATE POLICY "Users can view their own requests" 
ON public.consultation_requests 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();