// app/auth/callback/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, ensureUserProfile } from '@/lib/supabaseClient';

const AuthCallbackPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // 1) Check if we actually have a session after OAuth redirect
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
      }

      if (!session) {
        // No session, go back to login
        router.replace('/login');
        return;
      }

      // 2) Ensure there is a row in public.profiles for this user
      await ensureUserProfile();

      // 3) Redirect to your main page (change to /dashboard etc. if needed)
      router.replace('/');
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-neutral-400">Signing you in…</p>
    </div>
  );
};

export default AuthCallbackPage;
