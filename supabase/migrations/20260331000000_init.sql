-- Jetking Admin CMS + RAG schema
-- Apply with: supabase db push  OR  psql $DATABASE_URL -f …

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Content ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS courses (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('degree','diploma','certification','short')),
  duration TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  summary TEXT NOT NULL,
  outcomes JSONB NOT NULL DEFAULT '[]',
  modules JSONB NOT NULL DEFAULT '[]',
  certifications JSONB NOT NULL DEFAULT '[]',
  fees JSONB NOT NULL DEFAULT '{"disclosed":false}',
  persona_relevance JSONB NOT NULL DEFAULT '{}',
  hero_image JSONB,
  seo JSONB NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cities (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  intro TEXT NOT NULL,
  seo JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS centres (
  city_slug TEXT NOT NULL REFERENCES cities(slug) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  address_line TEXT NOT NULL,
  locality TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  phone TEXT,
  geo JSONB,
  courses_offered JSONB NOT NULL DEFAULT '[]',
  seo JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (city_slug, slug)
);

CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body JSONB NOT NULL DEFAULT '[]',
  author TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  category TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  persona_relevance JSONB NOT NULL DEFAULT '{}',
  hero_image JSONB,
  seo JSONB NOT NULL DEFAULT '{}',
  legacy_path TEXT,
  kind TEXT NOT NULL DEFAULT 'blog' CHECK (kind IN ('blog','news')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  topic TEXT NOT NULL,
  persona_relevance JSONB NOT NULL DEFAULT '{}',
  related_course_slugs JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS policies (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body JSONB NOT NULL DEFAULT '[]',
  seo JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faculty (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  specialisations JSONB NOT NULL DEFAULT '[]',
  centre_slugs JSONB NOT NULL DEFAULT '[]',
  seo JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS placements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body JSONB NOT NULL DEFAULT '[]',
  stats JSONB NOT NULL DEFAULT '[]',
  seo JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trust_signals (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Personalization ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS homepage_variants (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  banner JSONB,
  cta JSONB,
  testimonials JSONB,
  stories JSONB,
  video JSONB,
  course_boost JSONB NOT NULL DEFAULT '[]',
  centre_boost JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS persona_rules (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  priority INT NOT NULL DEFAULT 0,
  match_all BOOLEAN NOT NULL DEFAULT true,
  conditions JSONB NOT NULL DEFAULT '[]',
  homepage_variant_id TEXT REFERENCES homepage_variants(id) ON DELETE SET NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── RAG ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  source_slug TEXT,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE TABLE IF NOT EXISTS guide_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona TEXT,
  question TEXT NOT NULL,
  outcome TEXT NOT NULL,
  citations JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  props JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Staff profiles (Supabase Auth uid)
CREATE TABLE IF NOT EXISTS staff_profiles (
  user_id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin','editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cosine similarity search used by the Guide vector retriever.
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  filter_types text[] DEFAULT NULL
)
RETURNS TABLE (
  id text,
  type text,
  title text,
  url text,
  source_slug text,
  content text,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    d.id,
    d.type,
    d.title,
    d.url,
    d.source_slug,
    d.content,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM documents d
  WHERE d.embedding IS NOT NULL
    AND (filter_types IS NULL OR d.type = ANY (filter_types))
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
$$;
