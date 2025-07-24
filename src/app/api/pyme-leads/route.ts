import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  try {
    const body = await request.json();

    console.log('Processing PYME lead:', body);

    // Validaciones
    const requiredFields = ['full_name', 'company', 'position', 'email', 'phone', 'country', 'how_found_us', 'monthly_revenue'];
    const missingFields = requiredFields.filter(field => !body[field]?.trim());
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        success: false, 
        error: `Campos requeridos faltantes: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, error: 'Formato de email inválido' }, { status: 400 });
    }

    // Validar phone (WhatsApp)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(body.phone.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json({ success: false, error: 'Formato de teléfono inválido' }, { status: 400 });
    }

    const company_id = '14d2c0ed-f148-4abb-a82e-d19fba9526a8'; // Tu company_id

    // Verificar que la empresa existe
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('id', company_id)
      .single();

    if (companyError || !company) {
      console.error('Company not found:', company_id, companyError);
      return NextResponse.json({ success: false, error: 'Configuración de empresa inválida' }, { status: 400 });
    }

    // Verificar que la tabla pyme_leads existe
    const { data: tableCheck, error: tableError } = await supabase
      .from('pyme_leads')
      .select('id')
      .limit(1);
    
    if (tableError) {
      console.error('Table pyme_leads error:', tableError);
      return NextResponse.json({ success: false, error: `Error de tabla: ${tableError.message}` }, { status: 500 });
    }

    const leadEmail = body.email.toLowerCase().trim();

    // Verificar si ya existe un lead con el mismo email
    const { data: existingLead } = await supabase
      .from('pyme_leads')
      .select('id')
      .eq('company_id', company_id)
      .eq('email', leadEmail)
      .single();

    const leadData = {
      company_id,
      full_name: body.full_name.trim(),
      company: body.company.trim(),
      position: body.position.trim(),
      email: leadEmail,
      phone: body.phone.trim(),
      website: body.website?.trim() || null,
      country: body.country.trim(),
      how_found_us: body.how_found_us.trim(),
      monthly_revenue: body.monthly_revenue.trim(),
      additional_info: body.additional_info?.trim() || null,
      source: 'pyme_form',
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
      lead_score: calculatePymeLeadScore(leadData),
      priority: getPymeLeadPriority(leadData),
    };

    console.log('Enriched lead data before insert:', JSON.stringify(enrichedLeadData, null, 2));

    if (existingLead) {
      // Actualizar lead existente
      const { data: updatedLead, error: updateError } = await supabase
        .from('pyme_leads')
        .update({ ...enrichedLeadData, status: 'contacted' })
        .eq('id', existingLead.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error actualizando lead PYME:', updateError);
        return NextResponse.json({ success: false, error: 'Error al actualizar lead' }, { status: 500 });
      }
      console.log('Lead PYME actualizado exitosamente:', updatedLead);
      return NextResponse.json({ 
        success: true, 
        message: 'Lead PYME actualizado', 
        lead: updatedLead, 
        action: 'updated' 
      });

    } else {
      // Insertar nuevo lead
      const { data: newLead, error: insertError } = await supabase
        .from('pyme_leads')
        .insert({ ...enrichedLeadData, status: 'new' })
        .select()
        .single();

      if (insertError) {
        console.error('Error creando lead PYME:', insertError);
        console.error('Error details:', JSON.stringify(insertError, null, 2));
        return NextResponse.json({ success: false, error: `Error al crear lead: ${insertError.message || 'Error desconocido'}` }, { status: 500 });
      }
      console.log('Lead PYME creado exitosamente:', newLead);
      
      // Notificar al equipo si es lead de alta prioridad
      if (newLead.priority === 'high' || newLead.priority === 'urgent') {
        await notifyHighPriorityLead(newLead);
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Lead PYME creado exitosamente', 
        lead: newLead, 
        action: 'created' 
      });
    }

  } catch (error) {
    console.error('Error procesando lead PYME:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Función para calcular lead score específico para PYMEs
function calculatePymeLeadScore(data: any): number {
  let score = 50; // Score base

  // Score por facturación mensual
  const revenue = data.monthly_revenue.toLowerCase();
  if (revenue.includes('más de 250 millones')) score += 40;
  else if (revenue.includes('50-250 millones')) score += 30;
  else if (revenue.includes('10-50 millones')) score += 20;
  else if (revenue.includes('1-10 millones')) score += 10;
  else if (revenue.includes('menos de 1 millón')) score += 0;

  // Score por puesto
  const position = data.position.toLowerCase();
  if (position.includes('ceo') || position.includes('director') || position.includes('gerente general')) score += 20;
  else if (position.includes('gerente') || position.includes('manager')) score += 15;
  else if (position.includes('coordinador') || position.includes('jefe')) score += 10;

  // Score por tener website
  if (data.website) score += 10;

  // Score por cómo nos conoció
  const howFound = data.how_found_us.toLowerCase();
  if (howFound.includes('referencia') || howFound.includes('recomendación')) score += 15;
  else if (howFound.includes('google') || howFound.includes('búsqueda')) score += 10;
  else if (howFound.includes('linkedin') || howFound.includes('redes sociales')) score += 8;

  // Score por información adicional detallada
  if (data.additional_info && data.additional_info.length > 100) score += 5;

  return Math.min(score, 100); // Máximo 100
}

// Función para determinar prioridad de lead PYME
function getPymeLeadPriority(data: any): string {
  const score = calculatePymeLeadScore(data);
  
  // Criterios especiales para urgente
  const revenue = data.monthly_revenue.toLowerCase();
  const position = data.position.toLowerCase();
  const howFound = data.how_found_us.toLowerCase();
  
  if (score >= 90 || 
      (revenue.includes('más de 250 millones') && position.includes('ceo')) ||
      (revenue.includes('más de 50 millones') && (position.includes('ceo') || position.includes('director'))) ||
      howFound.includes('referencia')) {
    return 'urgent';
  }
  
  if (score >= 75) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

// Función para notificar leads de alta prioridad
async function notifyHighPriorityLead(lead: any) {
  try {
    console.log(`🚨 LEAD PYME DE ALTA PRIORIDAD:`, {
      name: lead.full_name,
      company: lead.company,
      position: lead.position,
      email: lead.email,
      revenue: lead.monthly_revenue,
      score: lead.lead_score,
      priority: lead.priority,
      how_found: lead.how_found_us
    });

    // Aquí puedes implementar notificaciones:
    // - Email urgente al equipo de ventas
    // - Notificación push
    // - Slack notification
    // - WhatsApp al equipo

  } catch (error) {
    console.error('Error enviando notificación de alta prioridad:', error);
  }
} 