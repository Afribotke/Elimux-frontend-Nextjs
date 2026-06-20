# ElimuX Admin Deployment Checklist

## 1. Local sanity check
- npm install
- npm run lint
- npm run dev
- Visit: http://localhost:3000/admin

## 2. Env files
- .env.local present locally
- .env.example updated and committed

## 3. Supabase
- Tables created
- RLS enabled
- RBAC policies applied (supabase/rbac_policies.sql)
- Service role key copied to Vercel

## 4. Vercel
- Environment variables set
- Project connected to GitHub
- Push latest code: 
  - git add .
  - git commit -m "Prepare ElimuX admin for deployment"
  - git push

## 5. Post-deploy
- Open deployed URL
- Test /admin
- Test auth + RBAC
- Test API routes under /api/admin/*
