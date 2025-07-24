# Tablas Supabase para Formulario de Contacto

## 1. Tabla Principal: `contact_leads`

```sql
CREATE TABLE contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Datos del formulario (pasos 1-4)
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  pain_point TEXT NOT NULL,
  phone VARCHAR(50),
  
  -- Metadatos del envío
  source VARCHAR(100) DEFAULT 'website_form',
  status VARCHAR(50) DEFAULT 'new',
  
  -- Información técnica
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  ip_address INET,
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX idx_contact_leads_email ON contact_leads(email);
CREATE INDEX idx_contact_leads_status ON contact_leads(status);
CREATE INDEX idx_contact_leads_submitted_at ON contact_leads(submitted_at);
CREATE INDEX idx_contact_leads_company ON contact_leads(company);
```

## 2. Tabla de Actividades: `lead_activities` (Opcional)

```sql
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES contact_leads(id) ON DELETE CASCADE,
  
  activity_type VARCHAR(100) NOT NULL, -- 'status_change', 'note_added', 'email_sent', 'viewed'
  description TEXT,
  old_value TEXT,
  new_value TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_created_at ON lead_activities(created_at);
```

## 3. API Endpoint para recibir el formulario

```typescript
// /api/leads/submit
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar datos requeridos
    const { name, email, company, pain_point } = body;
    if (!name || !email || !company || !pain_point) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insertar lead en Supabase
    const { data: lead, error } = await supabase
      .from('contact_leads')
      .insert({
        name,
        email,
        company,
        website: body.website || null,
        pain_point,
        phone: body.phone || null,
        source: 'website_form',
        user_agent: request.headers.get('user-agent'),
        referrer: request.headers.get('referer'),
        page_url: body.metadata?.page_url
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating lead:', error);
      return Response.json(
        { success: false, message: 'Failed to create lead' },
        { status: 500 }
      );
    }
    
    return Response.json({
      success: true,
      lead_id: lead.id,
      message: 'Lead created successfully'
    });
    
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## 4. Variables de Entorno

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

## 5. Configuración RLS (Row Level Security)

```sql
-- Permitir inserción pública para el formulario
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde el formulario web
CREATE POLICY "Allow public insert" ON contact_leads
  FOR INSERT WITH CHECK (true);

-- Política para lectura (solo para admins autenticados)
CREATE POLICY "Admins can read all" ON contact_leads
  FOR SELECT USING (auth.role() = 'authenticated');
```

## 6. Trigger para notificaciones automáticas (Opcional)

```sql
-- Función para enviar notificación por email
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
BEGIN
  -- Aquí puedes agregar lógica para enviar email o webhook
  -- Por ejemplo, usando Supabase Edge Functions o servicios externos
  
  PERFORM pg_notify('new_lead', json_build_object(
    'id', NEW.id,
    'name', NEW.name,
    'email', NEW.email,
    'company', NEW.company
  )::text);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger que se ejecuta cuando se inserta un nuevo lead
CREATE TRIGGER new_lead_notification
  AFTER INSERT ON contact_leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();
```

## 7. Consultas útiles para gestión

```sql
-- Ver todos los leads ordenados por fecha
SELECT 
  id,
  name,
  email,
  company,
  pain_point,
  status,
  submitted_at
FROM contact_leads 
ORDER BY submitted_at DESC;

-- Contar leads por día
SELECT 
  DATE(submitted_at) as date,
  COUNT(*) as leads_count
FROM contact_leads 
GROUP BY DATE(submitted_at)
ORDER BY date DESC;

-- Leads pendientes (sin contactar)
SELECT * FROM contact_leads 
WHERE status = 'new'
ORDER BY submitted_at ASC;

-- Actualizar status de un lead
UPDATE contact_leads 
SET status = 'contacted' 
WHERE id = 'lead-id-aqui';
```

## Estados del Lead

Los estados que puedes usar en la columna `status`:

- `new` - Recién llegado (default)
- `contacted` - Ya se contactó
- `qualified` - Lead calificado
- `proposal` - Propuesta enviada
- `closed` - Cerrado/convertido
- `lost` - Perdido

Con estas tablas ya tienes todo lo necesario para recibir y gestionar los leads del formulario de contacto. Es una implementación simple pero completa. 