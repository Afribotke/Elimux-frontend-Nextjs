import { supabase } from './supabaseClient';

export type Institution = {
  id: string;
  name: string;
  country: string;
  level: string;
  email: string;
  verified: boolean;
};

export type Program = {
  id: string;
  institution_id: string;
  name: string;
  level: string;
  duration: string;
  fees: string;
  mode: string;
};

export type Analytics = {
  views: number;
  applications: number;
  enquiries: number;
  conversion_rate: number;
  monthly: { month: string; views: number }[];
};

export type Settings = {
  institution_id: string;
  name: string;
  email: string;
  country: string;
  notifications_enabled: boolean;
};

/* ── Institution ─────────────────────────────────────── */
export async function fetchInstitution(id: string): Promise<Institution> {
  const { data, error } = await supabase
    .from('institutions')
    .select('id, name, country, level, email, verified')
    .eq('id', id)
    .single();

  if (error || !data) {
    // Fallback demo data so the UI renders before the table is populated.
    return {
      id,
      name: 'Demo University',
      country: 'Kenya',
      level: 'University',
      email: 'admin@demo.ac.ke',
      verified: true,
    };
  }
  return data as Institution;
}

/* ── Programs ────────────────────────────────────────── */
export async function fetchPrograms(institutionId: string): Promise<Program[]> {
  const { data, error } = await supabase
    .from('programs')
    .select('id, institution_id, name, level, duration, fees, mode')
    .eq('institution_id', institutionId);

  if (error || !data || data.length === 0) {
    return [
      {
        id: 'p1',
        institution_id: institutionId,
        name: 'Bachelor of Medicine',
        level: 'Degree',
        duration: '6 years',
        fees: 'KES 600,000/yr',
        mode: 'On campus',
      },
      {
        id: 'p2',
        institution_id: institutionId,
        name: 'BSc Computer Science',
        level: 'Degree',
        duration: '4 years',
        fees: 'KES 280,000/yr',
        mode: 'On campus',
      },
      {
        id: 'p3',
        institution_id: institutionId,
        name: 'Diploma in Business',
        level: 'Diploma',
        duration: '2 years',
        fees: 'KES 120,000/yr',
        mode: 'Hybrid',
      },
    ];
  }
  return data as Program[];
}

/* ── Analytics ───────────────────────────────────────── */
export async function fetchAnalytics(institutionId: string): Promise<Analytics> {
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('institution_id', institutionId)
    .single();

  if (error || !data) {
    return {
      views: 4820,
      applications: 312,
      enquiries: 158,
      conversion_rate: 6.5,
      monthly: [
        { month: 'Jan', views: 320 },
        { month: 'Feb', views: 410 },
        { month: 'Mar', views: 560 },
        { month: 'Apr', views: 720 },
        { month: 'May', views: 910 },
        { month: 'Jun', views: 1900 },
      ],
    };
  }
  return data as Analytics;
}

/* ── Settings ────────────────────────────────────────── */
export async function fetchSettings(institutionId: string): Promise<Settings> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('institution_id', institutionId)
    .single();

  if (error || !data) {
    return {
      institution_id: institutionId,
      name: 'Demo University',
      email: 'admin@demo.ac.ke',
      country: 'Kenya',
      notifications_enabled: true,
    };
  }
  return data as Settings;
}

export async function updateSettings(
  institutionId: string,
  updates: Partial<Settings>
): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase
    .from('settings')
    .update(updates)
    .eq('institution_id', institutionId);

  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true, message: 'Settings saved.' };
}
