ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS age INTEGER,
  ADD COLUMN IF NOT EXISTS conviction TEXT,
  ADD COLUMN IF NOT EXISTS chronic_diseases TEXT,
  ADD COLUMN IF NOT EXISTS dispensary_record TEXT,
  ADD COLUMN IF NOT EXISTS docs_photos JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS relations_files JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS tickets_files JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS contract_files JSONB DEFAULT '[]';

UPDATE clients SET full_name = name WHERE full_name IS NULL OR full_name = '';
