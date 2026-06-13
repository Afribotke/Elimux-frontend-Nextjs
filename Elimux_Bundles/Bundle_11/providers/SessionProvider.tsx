'use client';

import { getSession } from '@/lib/auth/session';

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const token = getSession();
  return <>{children}</>;
};
