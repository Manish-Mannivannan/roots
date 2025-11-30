'use client';

import React from 'react';
import Image from 'next/image';
import { signInWithGoogle } from '@/lib/supabaseClient';

const LoginPage: React.FC = () => {
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <main className="flex min-h-screen flex-row items-center justify-center gap-20">
      <div className="w-1/3 p-4 min-h-96 flex flex-col justify-around items-center bg-offWhite rounded-xl">
        <div className="text-center">
          <h1 className="text-6xl bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
            Roots
          </h1>
          <br />
          <h2>Welcome to Roots. Login to see your lineage</h2>
        </div>

        <button
          className="btn text-lg border-palette3 bg-offWhite min-w-72 justify-around"
          onClick={handleGoogleSignIn}
        >
          Google
          <Image
            src="/UI/google-icon.png"
            alt="Google"
            className="bg-transparent"
            width={20}
            height={20}
          />
        </button>
      </div>

      <div className="w-1/3 p-4 min-h-96 flex flex-col justify-around items-center rounded-xl">
        <div
          className="radial-progress text-offWhite text-4xl"
          style={{ '--value': 60, '--size': '12rem' } as React.CSSProperties}
          role="progressbar"
        >
          60%
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
