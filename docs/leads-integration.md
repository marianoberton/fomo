# Integración de Formulario de Contacto con Sistema Multitenant

## Descripción General

El formulario de contacto de FOMO está integrado con un sistema multitenant externo que gestiona leads de múltiples clientes. Cada lead se almacena en una base de datos Supabase y aparece en una bandeja de entrada específica para cada tenant.

## Arquitectura de la Integración

```mermaid
graph TD
    A[Formulario Web] --> B[submitContactLead()]
    B --> C[Sistema Multitenant]
    C --> D[Supabase Database]
    C --> E[Bandeja de Leads]
    
    B --> F[Fallback Email]
    B --> G[Analytics Tracking]
    
    C --> H[Notificaciones]
    H --> I[Email Admin]
    H --> J[Webhook Opcional]
```

## Configuración Inicial

### 1. Variables de Entorno

```bash
# Ejecutar script de configuración
npm run setup:leads
```

O configurar manualmente en `.env.local`:

```env
# Leads API Configuration (External Multitenant System)
NEXT_PUBLIC_LEADS_API_URL=https://tu-sistema-multitenant.com
NEXT_PUBLIC_TENANT_ID=tu-tenant-id-aqui
```

### 2. Estructura de Datos

#### Datos del Formulario
```typescript
interface ContactFormData {
  name: string;          // Nombre completo
  email: string;         // Email del contacto
  company: string;       // Nombre de la empresa
  website: string;       // Website o redes sociales
  painPoint: string;     // Principal desafío descrito
  phone: string;         // Teléfono (opcional)
}
```

#### Payload Enviado al Sistema Multitenant
```json
{
  "tenant_id": "uuid-del-tenant",
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Mi Empresa SRL",
  "website": "www.miempresa.com",
  "pain_point": "Necesitamos automatizar procesos manuales...",
  "phone": "+54 11 1234-5678",
  "source": "website_form",
  "metadata": {
    "submitted_at": "2024-01-15T10:30:00Z",
    "user_agent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "page_url": "https://fomo.com.ar/#contact-form"
  }
}
```

## Flujo de Envío

### 1. Envío Principal
```typescript
const result = await submitContactLead(contactData);

if (result.success) {
  // Lead guardado exitosamente
  trackFormSubmission(contactData, true);
  showSuccessMessage();
} else {
  // Falló el envío principal, intentar fallback
  attemptFallback();
}
```

### 2. Fallback Email
Si el sistema multitenant no está disponible:
```typescript
const fallbackSuccess = await sendFallbackEmail(contactData);
```

### 3. Tracking de Analytics
```typescript
// Facebook Pixel
fbq('track', 'Lead', {
  content_name: 'Contact Form Submission',
  content_category: 'Lead Generation',
  value: 1,
  currency: 'ARS'
});

// Google Analytics (opcional)
gtag('event', 'form_submit', {
  event_category: 'Contact',
  event_label: 'Contact Form'
});
```

## Requisitos del Sistema Multitenant

### 1. Endpoint de API

**POST** `/api/leads/submit`

```typescript
// Request Body
{
  tenant_id: string;
  name: string;
  email: string;
  company: string;
  website?: string;
  pain_point: string;
  phone?: string;
  source: string;
  metadata?: object;
}

// Response Success
{
  success: true,
  id: "uuid-del-lead",
  message: "Lead created successfully"
}

// Response Error
{
  success: false,
  error: "Error message",
  code: "ERROR_CODE"
}
```

### 2. Tabla de Base de Datos

```sql
CREATE TABLE contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT,
  pain_point TEXT NOT NULL,
  phone TEXT,
  source TEXT DEFAULT 'website_form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);
```

### 3. Políticas RLS (Row Level Security)

```sql
-- Los leads solo pueden ser vistos por usuarios del mismo tenant
CREATE POLICY "Users can view leads from their tenant" ON contact_leads
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM user_tenants 
      WHERE user_id = auth.uid()
    )
  );

-- Solo usuarios con rol 'admin' o 'sales' pueden crear leads
CREATE POLICY "Admins and sales can create leads" ON contact_leads
  FOR INSERT WITH CHECK (
    tenant_id IN (
      SELECT ut.tenant_id FROM user_tenants ut
      JOIN user_roles ur ON ut.user_id = ur.user_id
      WHERE ut.user_id = auth.uid()
      AND ur.role IN ('admin', 'sales')
    )
  );
```

### 4. CORS Configuration

```javascript
// Next.js API route o servidor Express
const corsOptions = {
  origin: [
    'https://fomo.com.ar',
    'https://www.fomo.com.ar',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Accept']
};
```

## Funcionalidades de la Bandeja de Leads

### 1. Vista de Lista
- Filtros por status, fecha, prioridad
- Búsqueda por nombre, empresa, email
- Paginación
- Ordenamiento por fecha, prioridad

### 2. Gestión de Leads
- Asignación a usuarios del tenant
- Cambio de estado (new → contacted → qualified → closed)
- Notas internas por lead
- Historial de actividades

### 3. Notificaciones
- Email automático al admin cuando llega un nuevo lead
- Notificaciones en tiempo real en la interfaz
- Webhook opcional para integraciones externas

## Monitoreo y Debugging

### 1. Logs del Cliente
```javascript
// Verificar envío exitoso
console.log('Lead submitted successfully:', result);

// Verificar errores
console.error('Lead submission failed:', error);

// Verificar fallback
console.warn('Using fallback email method');
```

### 2. Métricas Importantes
- Tasa de éxito de envío de leads
- Tiempo de respuesta del API
- Uso de fallback vs envío principal
- Conversión de leads a clientes

### 3. Troubleshooting

**Error: "Configuration error: Missing API URL or Tenant ID"**
- Verificar variables de entorno en `.env.local`
- Ejecutar `npm run setup:leads`

**Error: "HTTP error! status: 404"**
- Verificar que el endpoint `/api/leads/submit` existe
- Verificar URL del sistema multitenant

**Error: "CORS policy"**
- Configurar CORS en el sistema multitenant
- Agregar dominio a la lista de orígenes permitidos

## Próximas Mejoras

- [ ] **Validación de duplicados** - Evitar leads duplicados por email
- [ ] **Scoring automático** - Clasificar leads por potencial
- [ ] **Integración con CRM** - Sincronizar con sistemas externos
- [ ] **A/B testing** - Probar diferentes versiones del formulario
- [ ] **Campos dinámicos** - Personalizar formulario por tenant

## Soporte y Mantenimiento

Para problemas con la integración:
1. Revisar logs de la consola del navegador
2. Verificar variables de entorno
3. Comprobar conectividad con el sistema multitenant
4. Revisar políticas RLS en Supabase

**Contacto técnico**: dev@fomo.com.ar 