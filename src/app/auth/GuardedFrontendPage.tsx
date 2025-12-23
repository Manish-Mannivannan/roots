// src/components/auth/GuardedFrontendPage.tsx
'use client';

import React, { type CSSProperties } from 'react';
import FrontendLayout from '../components/frontendLayout';
import useCurrentUser from '../../lib/hooks/useCurrentUser';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '../types/interfaces';

type GuardedFrontendPageProps = {
  children: (ctx: { user: User; profile: UserProfile }) => React.ReactNode;
};

const GuardedFrontendPage: React.FC<GuardedFrontendPageProps> = ({
  children,
}) => {
  const { loading, user, profile, error } = useCurrentUser();

  // Loading
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
        <FrontendLayout>
          <div className="w-11/12 flex-auto rounded-lg overflow-clip GlassBG flex items-center justify-center">
            <div
              className="radial-progress text-offWhite text-2xl"
              style={{ '--value': 70, '--size': '8rem' } as CSSProperties}
              role="progressbar"
            >
              …
            </div>
          </div>
        </FrontendLayout>
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
        <FrontendLayout>
          <div className="w-11/12 flex-auto rounded-lg overflow-clip GlassBG flex items-center justify-center">
            <p className="text-red-400 text-sm">Error: {error}</p>
          </div>
        </FrontendLayout>
      </main>
    );
  }

  // Not logged in / no profile
  if (!user || !profile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
        <FrontendLayout>
          <div className="w-11/12 flex-auto rounded-lg overflow-clip GlassBG flex items-center justify-center">
            <p className="text-neutral-300 text-sm">
              You&apos;re not logged in. Please log in to view this page.
            </p>
          </div>
        </FrontendLayout>
      </main>
    );
  }

  // ✅ All good: render main layout + page content
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
      <FrontendLayout>
        <div className="w-11/12 flex-auto rounded-lg overflow-clip GlassBG">
          {children({ user, profile })}
        </div>
      </FrontendLayout>
    </main>
  );
};

export default GuardedFrontendPage;
