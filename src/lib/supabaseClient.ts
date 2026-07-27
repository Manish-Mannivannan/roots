// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/auth/callback`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
  }

  return { error };
}

export async function ensureUserProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No authenticated user found:', userError?.message);
    return;
  }

  const { id, email, user_metadata } = user;

  const fullName =
    (user_metadata &&
      ((user_metadata.full_name as string) ||
        (user_metadata.name as string))) ||
    email ||
    'Unknown';

  const avatarUrl =
    (user_metadata && (user_metadata.avatar_url as string)) || null;

  const { error: upsertError } = await supabase
    .from('users')
    .upsert(
      {
        id, // must match auth.users.id for RLS
        email,
        full_name: fullName,
        avatar_url: avatarUrl,
      },
      { onConflict: 'id' }
    );

  if (upsertError) {
    console.error('Error upserting user profile:', upsertError.message);
  }
}
