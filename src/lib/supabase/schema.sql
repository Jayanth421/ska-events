-- ============================================================
-- SKA Events Database Schema — Full Schema
-- Run this entire file in Supabase → SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CORE TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS languages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  native_name VARCHAR(100) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS translations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  language_code VARCHAR(10) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
  translation_key TEXT NOT NULL,
  translated_value TEXT NOT NULL,
  module VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(language_code, translation_key)
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  preferred_language VARCHAR(10) DEFAULT 'en' REFERENCES languages(code),
  full_name TEXT,
  email TEXT,
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOOKINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(200),
  event_type VARCHAR(100) NOT NULL,
  event_date DATE,
  guests VARCHAR(50),
  package_name VARCHAR(200),
  city VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EVENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  event_type VARCHAR(100) NOT NULL DEFAULT 'wedding',
  event_date DATE,
  venue VARCHAR(300),
  client_name VARCHAR(200),
  budget VARCHAR(100),
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming','ongoing','completed','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VENDORS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'other',
  phone VARCHAR(20),
  email VARCHAR(200),
  city VARCHAR(100),
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','inactive')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GALLERY ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  src TEXT NOT NULL,
  title VARCHAR(300) NOT NULL,
  title_te VARCHAR(300),
  category VARCHAR(50) NOT NULL DEFAULT 'weddings'
    CHECK (category IN ('weddings','engagements','birthdays','corporate','other')),
  sort_order SMALLINT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PLANNING PACKAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS planning_packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  title_en VARCHAR(300) NOT NULL,
  title_te VARCHAR(300),
  description_en TEXT NOT NULL,
  description_te TEXT,
  price_en VARCHAR(100) NOT NULL,
  price_te VARCHAR(100),
  badge_en VARCHAR(100),
  badge_te VARCHAR(100),
  image_url TEXT,
  features_en TEXT[] DEFAULT '{}',
  features_te TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  sort_order SMALLINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_translations_language_code ON translations(language_code);
CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(translation_key);
CREATE INDEX IF NOT EXISTS idx_translations_module ON translations(module);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_vendors_category ON vendors(category);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items(active);
CREATE INDEX IF NOT EXISTS idx_planning_packages_active ON planning_packages(active);
CREATE INDEX IF NOT EXISTS idx_planning_packages_key ON planning_packages(key);

-- ============================================================
-- AUTO-UPDATE TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ language 'plpgsql';

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_languages_updated_at') THEN
    CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_translations_updated_at') THEN
    CREATE TRIGGER update_translations_updated_at BEFORE UPDATE ON translations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bookings_updated_at') THEN
    CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_events_updated_at') THEN
    CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_vendors_updated_at') THEN
    CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_gallery_items_updated_at') THEN
    CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_planning_packages_updated_at') THEN
    CREATE TRIGGER update_planning_packages_updated_at BEFORE UPDATE ON planning_packages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  END IF;
END $$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE languages         ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations      ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE events            ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors           ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE planning_packages ENABLE ROW LEVEL SECURITY;

DO $policies$
BEGIN

  -- Languages
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='languages' AND policyname='languages_public_read') THEN
    CREATE POLICY "languages_public_read" ON languages FOR SELECT USING (active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='languages' AND policyname='languages_auth_write') THEN
    CREATE POLICY "languages_auth_write" ON languages FOR ALL USING (auth.role() = 'authenticated');
  END IF;

  -- Translations
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='translations' AND policyname='translations_public_read') THEN
    CREATE POLICY "translations_public_read" ON translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='translations' AND policyname='translations_auth_write') THEN
    CREATE POLICY "translations_auth_write" ON translations FOR ALL USING (auth.role() = 'authenticated');
  END IF;

  -- Profiles
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='profiles' AND policyname='profiles_own_select') THEN
    CREATE POLICY "profiles_own_select" ON profiles FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='profiles' AND policyname='profiles_own_update') THEN
    CREATE POLICY "profiles_own_update" ON profiles FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='profiles' AND policyname='profiles_own_insert') THEN
    CREATE POLICY "profiles_own_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Bookings
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='bookings' AND policyname='bookings_auth_all') THEN
    CREATE POLICY "bookings_auth_all" ON bookings FOR ALL USING (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='bookings' AND policyname='bookings_public_insert') THEN
    CREATE POLICY "bookings_public_insert" ON bookings FOR INSERT WITH CHECK (true);
  END IF;

  -- Events
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='events' AND policyname='events_auth_all') THEN
    CREATE POLICY "events_auth_all" ON events FOR ALL USING (auth.role() = 'authenticated');
  END IF;

  -- Vendors
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='vendors' AND policyname='vendors_auth_all') THEN
    CREATE POLICY "vendors_auth_all" ON vendors FOR ALL USING (auth.role() = 'authenticated');
  END IF;

  -- Gallery items
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='gallery_items' AND policyname='gallery_items_public_read') THEN
    CREATE POLICY "gallery_items_public_read" ON gallery_items FOR SELECT USING (active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='gallery_items' AND policyname='gallery_items_auth_all') THEN
    CREATE POLICY "gallery_items_auth_all" ON gallery_items FOR ALL USING (auth.role() = 'authenticated');
  END IF;

  -- Planning packages
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='planning_packages' AND policyname='planning_packages_public_read') THEN
    CREATE POLICY "planning_packages_public_read" ON planning_packages FOR SELECT USING (active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='planning_packages' AND policyname='planning_packages_auth_all') THEN
    CREATE POLICY "planning_packages_auth_all" ON planning_packages FOR ALL USING (auth.role() = 'authenticated');
  END IF;

END $policies$;

-- ============================================================
-- STORAGE BUCKET  (run once — skip if bucket already exists)
-- ============================================================
-- Creates a public "gallery" bucket for image uploads.
-- Run this in Supabase → SQL Editor:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  5242880,   -- 5 MB per file
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users (admins) to upload/update/delete
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'gallery_admin_upload'
  ) THEN
    CREATE POLICY "gallery_admin_upload"
      ON storage.objects FOR INSERT TO authenticated
      WITH CHECK (bucket_id = 'gallery');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'gallery_admin_update'
  ) THEN
    CREATE POLICY "gallery_admin_update"
      ON storage.objects FOR UPDATE TO authenticated
      USING (bucket_id = 'gallery');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'gallery_admin_delete'
  ) THEN
    CREATE POLICY "gallery_admin_delete"
      ON storage.objects FOR DELETE TO authenticated
      USING (bucket_id = 'gallery');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'gallery_public_read'
  ) THEN
    CREATE POLICY "gallery_public_read"
      ON storage.objects FOR SELECT TO public
      USING (bucket_id = 'gallery');
  END IF;
END $$;

-- ============================================================
-- SEED LANGUAGES
-- ============================================================
INSERT INTO languages (code, name, native_name, active) VALUES
  ('en', 'English', 'English', true),
  ('te', 'Telugu',  'తెలుగు',  true)
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- ✅ HOW TO CREATE AN ADMIN USER
-- ============================================================
-- STEP 1: Supabase Dashboard → Authentication → Users → Add User
--         Email: admin@skaevents.com | Password: your choice | ✅ Auto Confirm
--
-- STEP 2: Run in SQL Editor (replace email):
--   UPDATE auth.users
--   SET raw_user_meta_data = raw_user_meta_data || '{"role":"admin","is_admin":true}'
--   WHERE email = 'admin@skaevents.com';
--
-- STEP 3: Visit /en/admin/login and sign in.
-- ============================================================
