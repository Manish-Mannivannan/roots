// src/hooks/useCurrentUser.ts
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '../../app/types/interfaces';

export type UseCurrentUserResult = {
  loading: boolean;
  user: User | null;
  profile: UserProfile | null;
  error: string | null;
};

export default function useCurrentUser(): UseCurrentUserResult {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUserAndProfile = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError) {
        setError(authError.message);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      if (!user) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(user);

      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (cancelled) return;

      if (profileError) {
        setError(profileError.message);
        setProfile(null);
      } else {
        setProfile(profileData as UserProfile);
      }

      setLoading(false);
    };

    fetchUserAndProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, user, profile, error };
}