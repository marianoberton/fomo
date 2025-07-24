# Sistema Multitenant de Gestión de Leads

## Esquema de Base de Datos

### 1. Tabla: `tenants`
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE NOT NULL,
  api_key VARCHAR(255) UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_tenants_domain ON tenants(domain);
CREATE INDEX idx_tenants_api_key ON tenants(api_key);
```

### 2. Tabla: `contact_leads`
```sql
CREATE TABLE contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Datos del lead
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  pain_point TEXT NOT NULL,
  phone VARCHAR(50),
  
  -- Metadatos
  source VARCHAR(100) DEFAULT 'website_form',
  status VARCHAR(50) DEFAULT 'new',
  assigned_to UUID,
  priority VARCHAR(20) DEFAULT 'medium',
  
  -- Información técnica
  metadata JSONB DEFAULT '{}',
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  ip_address INET,
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_contact_leads_tenant_id ON contact_leads(tenant_id);
CREATE INDEX idx_contact_leads_email ON contact_leads(email);
CREATE INDEX idx_contact_leads_status ON contact_leads(status);
CREATE INDEX idx_contact_leads_submitted_at ON contact_leads(submitted_at);
CREATE INDEX idx_contact_leads_assigned_to ON contact_leads(assigned_to);
```

### 3. Tabla: `lead_activities`
```sql
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES contact_leads(id) ON DELETE CASCADE,
  
  activity_type VARCHAR(100) NOT NULL, -- 'status_change', 'note_added', 'email_sent', 'call_made'
  description TEXT,
  old_value TEXT,
  new_value TEXT,
  performed_by UUID, -- ID del usuario que realizó la acción
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_lead_activities_tenant_id ON lead_activities(tenant_id);
CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_created_at ON lead_activities(created_at);
```

### 4. Tabla: `users` (para el sistema de gestión)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'agent', -- 'admin', 'manager', 'agent'
  
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
```

### 5. Tabla: `notifications`
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  type VARCHAR(100) NOT NULL, -- 'new_lead', 'lead_assigned', 'status_change'
  title VARCHAR(255) NOT NULL,
  message TEXT,
  
  -- Destinatarios
  recipient_email VARCHAR(255),
  recipient_user_id UUID,
  
  -- Estado
  sent_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  
  -- Datos relacionados
  related_lead_id UUID REFERENCES contact_leads(id),
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_notifications_tenant_id ON notifications(tenant_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

## Políticas RLS (Row Level Security)

### Para `contact_leads`:
```sql
-- Habilitar RLS
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Política para seleccionar leads del tenant
CREATE POLICY "Users can view leads from their tenant" ON contact_leads
  FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Política para insertar leads
CREATE POLICY "Allow insert for valid tenant" ON contact_leads
  FOR INSERT WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Política para actualizar
CREATE POLICY "Users can update leads from their tenant" ON contact_leads
  FOR UPDATE USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### Para `lead_activities`:
```sql
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view activities from their tenant" ON lead_activities
  FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY "Users can insert activities for their tenant" ON lead_activities
  FOR INSERT WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

## APIs Necesarias

### 1. Endpoint de Recepción de Leads
```typescript
// POST /api/leads/submit
interface SubmitLeadRequest {
  tenant_id: string;
  name: string;
  email: string;
  company: string;
  website?: string;
  pain_point: string;
  phone?: string;
  source?: string;
  metadata?: {
    submitted_at: string;
    user_agent?: string;
    referrer?: string;
    page_url?: string;
  };
}

interface SubmitLeadResponse {
  success: boolean;
  lead_id: string;
  message: string;
}
```

### 2. Gestión de Leads
```typescript
// GET /api/leads
interface GetLeadsQuery {
  page?: number;
  limit?: number;
  status?: string;
  assigned_to?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

// PUT /api/leads/:id/status
interface UpdateLeadStatusRequest {
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
  note?: string;
}

// PUT /api/leads/:id/assign
interface AssignLeadRequest {
  assigned_to: string;
  note?: string;
}
```

### 3. Notificaciones
```typescript
// POST /api/notifications/send
interface SendNotificationRequest {
  type: string;
  title: string;
  message: string;
  recipient_email?: string;
  recipient_user_id?: string;
  related_lead_id?: string;
}
```

## Configuración del Servidor

### Variables de Entorno
```env
# Base de datos
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# CORS
ALLOWED_ORIGINS=https://fomo.company,https://other-client.com

# Email (para notificaciones)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...

# Webhook (opcional)
WEBHOOK_SECRET=...
```

### Middleware de Autenticación
```typescript
// middleware/tenant-auth.ts
export async function validateTenantAuth(req: Request) {
  const tenantId = req.body.tenant_id || req.headers['x-tenant-id'];
  const apiKey = req.headers['x-api-key'];
  
  // Validar tenant y API key
  const tenant = await supabase
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .eq('api_key', apiKey)
    .single();
    
  if (!tenant.data) {
    throw new Error('Invalid tenant or API key');
  }
  
  // Establecer contexto de tenant para RLS
  await supabase.rpc('set_config', {
    parameter: 'app.current_tenant_id',
    value: tenantId
  });
  
  return tenant.data;
}
```

### CORS Configuration
```typescript
// cors.ts
const corsOptions = {
  origin: function (origin: string, callback: Function) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    
    // Permitir requests sin origin (móviles, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id', 'x-api-key']
};
```

## Funciones Trigger para Automatización

### Trigger para crear actividad en cambios de lead
```sql
CREATE OR REPLACE FUNCTION log_lead_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Log cambio de status
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO lead_activities (tenant_id, lead_id, activity_type, description, old_value, new_value)
    VALUES (NEW.tenant_id, NEW.id, 'status_change', 
           'Status changed from ' || COALESCE(OLD.status, 'null') || ' to ' || NEW.status,
           OLD.status, NEW.status);
  END IF;
  
  -- Log asignación
  IF OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
    INSERT INTO lead_activities (tenant_id, lead_id, activity_type, description, old_value, new_value)
    VALUES (NEW.tenant_id, NEW.id, 'assignment_change', 
           'Lead reassigned',
           OLD.assigned_to::text, NEW.assigned_to::text);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lead_changes_trigger
  AFTER UPDATE ON contact_leads
  FOR EACH ROW
  EXECUTE FUNCTION log_lead_changes();
```

### Trigger para notificaciones automáticas
```sql
CREATE OR REPLACE FUNCTION create_lead_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Crear notificación para nuevo lead
  INSERT INTO notifications (tenant_id, type, title, message, related_lead_id)
  VALUES (NEW.tenant_id, 'new_lead', 
         'New lead received', 
         'New lead from ' || NEW.company || ' (' || NEW.email || ')',
         NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_lead_notification_trigger
  AFTER INSERT ON contact_leads
  FOR EACH ROW
  EXECUTE FUNCTION create_lead_notification();
```

## Ejemplo de Implementación del Endpoint Principal

```typescript
// pages/api/leads/submit.ts (Next.js) o routes/leads.ts (Express)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar tenant
    const tenant = await validateTenantAuth(request);
    
    // Validar datos requeridos
    const { name, email, company, pain_point } = body;
    if (!name || !email || !company || !pain_point) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insertar lead
    const { data: lead, error } = await supabase
      .from('contact_leads')
      .insert({
        tenant_id: body.tenant_id,
        name,
        email,
        company,
        website: body.website,
        pain_point,
        phone: body.phone,
        source: body.source || 'website_form',
        metadata: body.metadata || {},
        user_agent: request.headers.get('user-agent'),
        referrer: request.headers.get('referer'),
        ip_address: getClientIP(request)
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

## Datos de Ejemplo para Testing

```sql
-- Insertar tenant de ejemplo
INSERT INTO tenants (id, name, domain, api_key) VALUES 
('123e4567-e89b-12d3-a456-426614174000', 'FOMO Company', 'fomo.company', 'fomo_api_key_12345');

-- Insertar usuario administrador
INSERT INTO users (tenant_id, email, password_hash, name, role) VALUES 
('123e4567-e89b-12d3-a456-426614174000', 'admin@fomo.company', '$2b$10$...', 'Admin User', 'admin');
```

Con esta estructura tienes todo lo necesario para implementar el sistema multitenant. Solo necesitas adaptarlo a tu stack tecnológico preferido (Next.js, Express, FastAPI, etc.) y configurar las variables de entorno apropiadas. 