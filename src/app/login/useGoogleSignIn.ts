import { useCallback, useState } from 'react';
import { signInWithGoogle } from '@/lib/supabaseClient';

export type SignInStatus = 'idle' | 'loading' | 'success' | 'error';

export interface GoogleSignIn {
  status: SignInStatus;
  /** Flips on every failure so the error banner can re-trigger its shake. */
  shakeToggle: boolean;
  signIn: () => Promise<void>;
}

/**
 * Owns the Google sign-in state machine: idle → loading → success | error.
 * On success Supabase redirects the browser away, so `success` is mostly a
 * fallback for a delayed redirect.
 */
export function useGoogleSignIn(): GoogleSignIn {
  const [status, setStatus] = useState<SignInStatus>('idle');
  const [shakeToggle, setShakeToggle] = useState(false);

  const signIn = useCallback(async () => {
    if (status === 'loading' || status === 'success') return;

    setStatus('loading');
    const { error } = await signInWithGoogle();

    if (error) {
      setShakeToggle((v) => !v);
      setStatus('error');
    } else {
      setStatus('success');
    }
  }, [status]);

  return { status, shakeToggle, signIn };
}
