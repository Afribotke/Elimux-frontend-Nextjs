# Supabase Config for ElimuX Admin

1. Tables required:
   - users
   - institutions
   - programs
   - countries
   - logs
   - settings

2. Enable RLS on all above tables.

3. Apply RBAC policies from:
   - supabase/rbac_policies.sql

4. Ensure JWT contains 'role' in user_metadata for:
   - superadmin
   - admin
   - editor
   - viewer
