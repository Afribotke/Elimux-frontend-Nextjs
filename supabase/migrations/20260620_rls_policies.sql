-- ============================================================
--  FILE 66 — RLS POLICIES FOR MULTI‑TENANT RBAC
--  Author: Koech + Copilot
--  Purpose: Secure institutions, staff, payments, enrollments
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 1. INSTITUTION ACCESS
-- ============================================================

-- Staff can only see their own institution
CREATE POLICY "institution_select" ON institutions
FOR SELECT
USING (
  id = auth.jwt() ->> 'institution_id'
);

-- Only owner/admin can update institution settings
CREATE POLICY "institution_update" ON institutions
FOR UPDATE
USING (
  auth.jwt() ->> 'role' IN ('owner', 'admin')
  AND id = auth.jwt() ->> 'institution_id'
);

-- Only owner can delete institution
CREATE POLICY "institution_delete" ON institutions
FOR DELETE
USING (
  auth.jwt() ->> 'role' = 'owner'
  AND id = auth.jwt() ->> 'institution_id'
);

-- ============================================================
-- 2. STAFF ACCESS
-- ============================================================

-- Staff can view all staff in their institution
CREATE POLICY "staff_select" ON staff
FOR SELECT
USING (
  institution_id = auth.jwt() ->> 'institution_id'
);

-- Admin+ can insert staff
CREATE POLICY "staff_insert" ON staff
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'role' IN ('owner', 'admin')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Admin+ can update staff roles
CREATE POLICY "staff_update" ON staff
FOR UPDATE
USING (
  auth.jwt() ->> 'role' IN ('owner', 'admin')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Only owner can remove staff
CREATE POLICY "staff_delete" ON staff
FOR DELETE
USING (
  auth.jwt() ->> 'role' = 'owner'
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- ============================================================
-- 3. STUDENTS ACCESS
-- ============================================================

-- Staff can view students in their institution
CREATE POLICY "students_select" ON students
FOR SELECT
USING (
  institution_id = auth.jwt() ->> 'institution_id'
);

-- Editor+ can add students
CREATE POLICY "students_insert" ON students
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'role' IN ('editor', 'manager', 'admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Manager+ can update students
CREATE POLICY "students_update" ON students
FOR UPDATE
USING (
  auth.jwt() ->> 'role' IN ('manager', 'admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Only admin+ can delete students
CREATE POLICY "students_delete" ON students
FOR DELETE
USING (
  auth.jwt() ->> 'role' IN ('admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- ============================================================
-- 4. ENROLLMENTS ACCESS
-- ============================================================

-- Staff can view enrollments in their institution
CREATE POLICY "enrollments_select" ON enrollments
FOR SELECT
USING (
  institution_id = auth.jwt() ->> 'institution_id'
);

-- Editor+ can create enrollments
CREATE POLICY "enrollments_insert" ON enrollments
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'role' IN ('editor', 'manager', 'admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Manager+ can update enrollments
CREATE POLICY "enrollments_update" ON enrollments
FOR UPDATE
USING (
  auth.jwt() ->> 'role' IN ('manager', 'admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Admin+ can delete enrollments
CREATE POLICY "enrollments_delete" ON enrollments
FOR DELETE
USING (
  auth.jwt() ->> 'role' IN ('admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- ============================================================
-- 5. PAYMENTS ACCESS
-- ============================================================

-- Staff can view payments in their institution
CREATE POLICY "payments_select" ON payments
FOR SELECT
USING (
  institution_id = auth.jwt() ->> 'institution_id'
);

-- Manager+ can create payments
CREATE POLICY "payments_insert" ON payments
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'role' IN ('manager', 'admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Manager+ can update payments
CREATE POLICY "payments_update" ON payments
FOR UPDATE
USING (
  auth.jwt() ->> 'role' IN ('manager', 'admin', 'owner')
  AND institution_id = auth.jwt() ->> 'institution_id'
);

-- Only owner can delete payments
CREATE POLICY "payments_delete" ON payments
FOR DELETE
USING (
  auth.jwt() ->> 'role' = 'owner'
  AND institution_id = auth.jwt() ->> 'institution_id'
);