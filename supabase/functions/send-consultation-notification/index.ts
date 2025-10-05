import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ConsultationRequest = await req.json();
    console.log("Sending notification for consultation request:", {
      email: data.email,
      company: data.company,
    });

    // Send notification to admin
    const emailResponse = await resend.emails.send({
      from: "G&G Design LLC <noreply@updates.gngaero.com>",
      to: ["davidg@gngdesignllc.com"], // Your admin email
      subject: `New Consultation Request from ${data.firstName} ${data.lastName}`,
      html: `
        <h1>New Consultation Request</h1>
        <p>You've received a new consultation request with the following details:</p>
        
        <h2>Client Information</h2>
        <ul>
          <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Company:</strong> ${data.company}</li>
        </ul>
        
        <h2>Service Interest</h2>
        <p>${data.service}</p>
        
        <h2>Project Details</h2>
        <p>${data.message}</p>
        
        <hr style="margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">This is an automated notification from your G&G Design LLC website contact form.</p>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    // Send confirmation to client
    const clientEmailResponse = await resend.emails.send({
      from: "G&G Design LLC <noreply@updates.gngaero.com>",
      to: [data.email],
      subject: "Thank You for Your Consultation Request",
      html: `
        <h1>Thank You for Contacting G&G Design LLC</h1>
        <p>Dear ${data.firstName},</p>
        
        <p>We have received your consultation request and appreciate your interest in our aviation services.</p>
        
        <p>Our team will review your project details and respond within 24 hours. For urgent matters, feel free to call us at 610 996 7934.</p>
        
        <h2>Your Request Summary</h2>
        <ul>
          <li><strong>Service Interest:</strong> ${data.service}</li>
          <li><strong>Company:</strong> ${data.company}</li>
        </ul>
        
        <p>We look forward to helping you with your aviation project!</p>
        
        <p>Best regards,<br>
        <strong>G&G Design LLC Team</strong><br>
        1121 Koble Lane<br>
        West Chester, PA 19382<br>
        Phone: 610 996 7934</p>
      `,
    });

    console.log("Client confirmation sent successfully:", clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: emailResponse,
        clientEmail: clientEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-consultation-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
