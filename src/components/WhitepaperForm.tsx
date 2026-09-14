import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, FileDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ROLES = [
  "Founder or executive",
  "Engineering lead",
  "Structures or certification engineer",
  "Program or project manager",
  "Investor",
  "Other",
] as const;

const formSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name").max(100),
  lastName: z.string().trim().min(2, "Please enter your last name").max(100),
  email: z.string().trim().email("Please enter a valid work email").max(255),
  company: z.string().trim().min(2, "Please enter your company").max(200),
  role: z.enum(ROLES, { errorMap: () => ({ message: "Please select your role" }) }),
  consent: z.boolean(),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface WhitepaperFormProps {
  /** Traffic source, typically from a ?src= query parameter. */
  source?: string | null;
}

const WhitepaperForm = ({ source = null }: WhitepaperFormProps) => {
  const { toast } = useToast();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      role: undefined,
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setErrorMessage(null);
    try {
      const { data, error } = await supabase.functions.invoke("request-whitepaper", {
        body: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          company: values.company,
          role: values.role,
          consent: values.consent,
          website: values.website ?? "",
          source: source ?? null,
        },
      });

      if (error) throw error;

      const url = (data as { url?: string } | null)?.url;
      if (!url) throw new Error("No download link was returned.");

      setDownloadUrl(url);
    } catch (err) {
      console.error("White paper request failed:", err);
      const message =
        "We could not prepare your download just now. Please try again in a moment.";
      setErrorMessage(message);
      toast({
        title: "Download request failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  if (downloadUrl) {
    return (
      <div>
        <div className="flex items-start gap-3 mb-5">
          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Your copy is ready</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A copy has also been emailed to you. This link expires in 15 minutes —
              request another here any time.
            </p>
          </div>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            <FileDown className="h-4 w-4 mr-2" />
            Download the PDF
          </a>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        aria-label="Request the white paper"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input autoComplete="given-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input autoComplete="family-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input autoComplete="organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0.5"
                />
              </FormControl>
              <FormLabel className="font-normal leading-snug cursor-pointer">
                Send me occasional technical updates from GnG Aero Consulting
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="sr-only">
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input autoComplete="off" tabIndex={-1} aria-hidden="true" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Preparing your download…
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4 mr-2" />
                Get the PDF
              </>
            )}
          </Button>

          {errorMessage && (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          <FormDescription className="text-xs">
            We use your details to send the paper and, occasionally, related technical
            writing. No third parties, unsubscribe any time.
          </FormDescription>
        </div>
      </form>
    </Form>
  );
};

export default WhitepaperForm;
