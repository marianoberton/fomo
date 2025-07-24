-- Tabla para leads del formulario de PYMEs (más detallado)
CREATE TABLE pyme_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  
  -- Campos del formulario
  full_name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL, -- WhatsApp
  website VARCHAR(255),
  country VARCHAR(100) NOT NULL,
  how_found_us TEXT NOT NULL,
  monthly_revenue VARCHAR(100) NOT NULL, -- Rango de facturación
  additional_info TEXT,
  
  -- Metadatos
  source VARCHAR(100) DEFAULT 'pyme_form',
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  lead_score INTEGER DEFAULT 0,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Información técnica
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  ip_address INET,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),
  
  -- Gestión
  assigned_to UUID REFERENCES user_profiles(id),
  notes TEXT,
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  next_follow_up_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX idx_pyme_leads_email ON pyme_leads(email);
CREATE INDEX idx_pyme_leads_status ON pyme_leads(status);
CREATE INDEX idx_pyme_leads_company_id ON pyme_leads(company_id);
CREATE INDEX idx_pyme_leads_submitted_at ON pyme_leads(submitted_at);
CREATE INDEX idx_pyme_leads_priority ON pyme_leads(priority);
CREATE INDEX idx_pyme_leads_assigned_to ON pyme_leads(assigned_to);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_pyme_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_pyme_leads_updated_at
    BEFORE UPDATE ON pyme_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_pyme_leads_updated_at();

-- RLS (Row Level Security)
ALTER TABLE pyme_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde el formulario web
CREATE POLICY "Allow public insert" ON pyme_leads
  FOR INSERT WITH CHECK (true);

-- Política para que usuarios de la empresa puedan ver sus leads
CREATE POLICY "Users can view company leads" ON pyme_leads
  FOR SELECT USING (
    company_id IN (
      SELECT company_id 
      FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- Política para que usuarios puedan actualizar leads de su empresa
CREATE POLICY "Users can update company leads" ON pyme_leads
  FOR UPDATE USING (
    company_id IN (
      SELECT company_id 
      FROM user_profiles 
      WHERE id = auth.uid()
    )
  ); 