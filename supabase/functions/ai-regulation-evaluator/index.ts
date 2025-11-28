import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectDescription, regulatoryBody, projectType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert aviation regulatory consultant specializing in FAA and EASA certification and compliance. Your role is to:

1. Analyze aviation projects and identify applicable regulations
2. Outline certification pathways and compliance requirements
3. Identify potential timeline accelerators using modern AI-assisted methodologies
4. Suggest preparation strategies to streamline the certification process
5. Highlight critical documentation and testing requirements

Provide structured, actionable insights that help aviation companies prepare for compliance faster and more efficiently. Focus on:
- Specific regulation references (e.g., FAR Part 23, EASA CS-23)
- Certification basis recommendations
- AI/automation opportunities in compliance workflow
- Timeline estimation and optimization strategies
- Risk areas requiring early attention`;

    const userPrompt = `Project Type: ${projectType}
Regulatory Body: ${regulatoryBody}
Project Description: ${projectDescription}

Please provide:
1. Applicable Regulations & Standards
2. Certification Pathway Overview
3. Key Compliance Requirements
4. Timeline Optimization Strategies (including AI-assisted approaches)
5. Critical Preparation Steps
6. Potential Challenges & Mitigation`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI service credits depleted. Please contact support.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI Gateway error');
    }

    const data = await response.json();
    const evaluation = data.choices[0].message.content;

    return new Response(JSON.stringify({ evaluation }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-regulation-evaluator:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
