import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  try {
    const body = await request.json();

    console.log('Processing contact lead:', body);

    // Validations (as before)
    if (!body.name?.trim() || !body.email?.trim() || !body.company?.trim() || !(body.painPoint || body.pain_point)?.trim()) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const company_id = '14d2c0ed-f148-4abb-a82e-d19fba9526a8'; // Your company_id

    // Check if company exists
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('id', company_id)
      .single();

    if (companyError || !company) {
      console.error('Company not found:', company_id, companyError);
      return NextResponse.json({ success: false, error: 'Invalid company configuration' }, { status: 400 });
    }

    const leadEmail = body.email.toLowerCase().trim();

    // Check for existing lead
    const { data: existingLead } = await supabase
      .from('contact_leads')
      .select('id')
      .eq('company_id', company_id)
      .eq('email', leadEmail)
      .single();

    const leadData = {
      company_id,
      name: body.name.trim(),
      email: leadEmail,
      company: body.company.trim(),
      website: body.website?.trim() || null,
      pain_point: (body.painPoint || body.pain_point)?.trim(),
      phone: body.phone?.trim() || null,
      source: body.source || 'website_form',
      user_agent: request.headers.get('user-agent') || '',
      referrer: request.headers.get('referer') || '',
      page_url: body.page_url || request.headers.get('referer'),
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0].trim(),
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_content: body.utm_content || null,
      utm_term: body.utm_term || null,
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    const enrichedLeadData = {
        ...leadData,
        lead_score: calculateLeadScore(leadData),
        priority: getLeadPriority(leadData),
    }

    if (existingLead) {
      // Update existing lead
      const { data: updatedLead, error: updateError } = await supabase
        .from('contact_leads')
        .update({ ...enrichedLeadData, status: 'contacted' })
        .eq('id', existingLead.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating contact lead:', updateError);
        return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
      }
      console.log('Contact lead updated successfully:', updatedLead);
      return NextResponse.json({ success: true, message: 'Contact lead updated', lead: updatedLead, action: 'updated' });

    } else {
      // Insert new lead
      const { data: newLead, error: insertError } = await supabase
        .from('contact_leads')
        .insert({ ...enrichedLeadData, status: 'new' })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating contact lead:', insertError);
        return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 });
      }
      console.log('Contact lead created successfully:', newLead);
      return NextResponse.json({ success: true, message: 'Contact lead created', lead: newLead, action: 'created' });
    }

  } catch (error) {
    console.error('Error processing contact lead:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions (as before)
function calculateLeadScore(data: any): number {
  let score = 50;
  if (data.website) score += 10;
  if (data.phone) score += 5;
  if (data.utm_source) score += 5;
  if (data.utm_campaign) score += 5;
  const painPoint = (data.pain_point || '').toLowerCase();
  if (painPoint.includes('automatizar') || painPoint.includes('proceso')) score += 15;
  if (painPoint.includes('crm') || painPoint.includes('integracion')) score += 10;
  if (painPoint.includes('dashboard') || painPoint.includes('visibilidad')) score += 10;
  return Math.min(score, 100);
}

function getLeadPriority(data: any): string {
  const score = calculateLeadScore(data);
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
} 