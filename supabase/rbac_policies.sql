-- ============================
-- RLS: USERS TABLE
-- ============================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin_full_access" ON users
  FOR ALL USING (auth.jwt() ->> 'role' = 'superadmin');

CREATE POLICY "admin_read" ON users
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('superadmin', 'admin'));

-- ============================
-- RLS: INSTITUTIONS TABLE
-- ============================

ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "editor_manage_institutions" ON institutions
  FOR ALL USING (auth.jwt() ->> 'role' IN ('superadmin', 'admin', 'editor'));

-- ============================
-- RLS: PROGRAMS TABLE
-- ============================

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "editor_manage_programs" ON programs
  FOR ALL USING (auth.jwt() ->> 'role' IN ('superadmin', 'admin', 'editor'));

-- ============================
-- RLS: COUNTRIES TABLE
-- ============================

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_manage_countries" ON countries
  FOR ALL USING (auth.jwt() ->> 'role' IN ('superadmin', 'admin'));

-- ============================
-- RLS: LOGS TABLE
-- ============================

ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_view_logs" ON logs
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('superadmin', 'admin'));

-- ============================
-- RLS: SETTINGS TABLE
-- ============================

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin_manage_settings" ON settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'superadmin');
