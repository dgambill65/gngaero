import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BUCKET = "whitepapers";
const DOCUMENT = "MKT-05 Rev H — F&DT Planning for Hybrid eVTOL Structures";
const FROM = "GnG Aero Consulting <noreply@updates.gngaero.com>";
const ADMIN_EMAIL = "davidg@gngdesignllc.com";
const EXPIRES_IN = 15 * 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ROLES = [
  "Founder or executive",
  "Engineering lead",
  "Structures or certification engineer",
  "Program or project manager",
  "Investor",
  "Other",
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json().catch(() => null);
    if (!payload || typeof payload !== "object") {
      return json({ error: "Invalid request body." }, 400);
    }

    const { firstName, lastName, email, company, role, consent, website } =
      payload as Record<string, unknown>;

    // Silent bot trap — honeypot filled in, pretend everything is fine.
    if (typeof website === "string" && website.trim() !== "") {
      return json({ success: true });
    }

    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const fields = {
      firstName: str(firstName),
      lastName: str(lastName),
      email: str(email),
      company: str(company),
      role: str(role),
    };

    const errors: Record<string, string> = {};
    if (fields.firstName.length < 2 || fields.firstName.length > 100) errors.firstName = "First name is required.";
    if (fields.lastName.length < 2 || fields.lastName.length > 100) errors.lastName = "Last name is required.";
    if (!EMAIL_RE.test(fields.email) || fields.email.length > 255) errors.email = "A valid work email is required.";
    if (fields.company.length < 2 || fields.company.length > 200) errors.company = "Company is required.";
    if (!ROLES.includes(fields.role)) errors.role = "Please select a role.";

    if (Object.keys(errors).length > 0) {
      return json({ error: "Validation failed.", fields: errors }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const referrer = req.headers.get("referer") ?? req.headers.get("origin");
    const userAgent = req.headers.get("user-agent");

    const { error: insertError } = await supabase.from("whitepaper_leads").insert({
      first_name: fields.firstName,
      last_name: fields.lastName,
      email: fields.email,
      company: fields.company,
      role: fields.role,
      document: DOCUMENT,
      consent: consent === true,
      referrer: referrer?.slice(0, 500) ?? null,
      user_agent: userAgent?.slice(0, 500) ?? null,
    });

    if (insertError) {
      console.error("Failed to record whitepaper lead:", insertError);
      return json({ error: "Could not record your request. Please try again." }, 500);
    }

    const makeSignedUrl = async () => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(OBJECT_PATH, EXPIRES_IN);
      if (error || !data?.signedUrl) throw error ?? new Error("No signed URL returned.");
      return data.signedUrl;
    };

    let signedUrl: string;
    try {
      signedUrl = await makeSignedUrl();
    } catch (err) {
      console.error("Failed to create signed URL:", err);
      return json({ error: "The document is temporarily unavailable. Please try again shortly." }, 500);
    }

    // Emails are best-effort: a failure must never block the download.
    try {
      const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
      const safe = {
        firstName: escapeHtml(fields.firstName),
        lastName: escapeHtml(fields.lastName),
        email: escapeHtml(fields.email),
        company: escapeHtml(fields.company),
        role: escapeHtml(fields.role),
      };

      await resend.emails.send({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `White paper download — ${fields.firstName} ${fields.lastName}, ${fields.company}`,
        html: `
          <h2 style="margin:0 0 4px;">White paper download</h2>
          <p style="margin:0 0 16px;color:#666;">${escapeHtml(DOCUMENT)}</p>
          <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
            <tr><td style="color:#666;">Name</td><td><strong>${safe.firstName} ${safe.lastName}</strong></td></tr>
            <tr><td style="color:#666;">Work email</td><td><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td style="color:#666;">Company</td><td><strong>${safe.company}</strong></td></tr>
            <tr><td style="color:#666;">Role</td><td>${safe.role}</td></tr>
            <tr><td style="color:#666;">Marketing consent</td><td>${consent === true ? "Yes" : "No"}</td></tr>
          </table>
          <hr style="margin:20px 0;" />
          <p style="color:#666;font-size:12px;">Automated notification from the GnG Aero Consulting website.</p>
        `,
      });

      let requesterUrl = signedUrl;
      try {
        requesterUrl = await makeSignedUrl();
      } catch (err) {
        console.error("Failed to mint a second signed URL for the requester email:", err);
      }

      await resend.emails.send({
        from: FROM,
        to: [fields.email],
        subject: "Your copy: Fatigue & Damage Tolerance Planning for Hybrid eVTOL Structures",
        html: `
          <p>${safe.firstName},</p>
          <p>Thank you for requesting <em>Fatigue &amp; Damage Tolerance Planning for Hybrid eVTOL Structures</em>. Here is your copy:</p>
          <p><a href="${requesterUrl}">Download the PDF</a></p>
          <p>The link expires in 15 minutes. If it lapses, you can request another from the Resources section at gngaero.com.</p>
          <p>Regards,<br />
          David Gambill<br />
          GnG Aero Consulting<br />
          West Chester, PA</p>
        `,
      });
    } catch (emailError) {
      console.error("Resend email delivery failed (download still returned):", emailError);
    }

    return json({ url: signedUrl });
  } catch (error) {
    console.error("Unhandled error in request-whitepaper:", error);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
