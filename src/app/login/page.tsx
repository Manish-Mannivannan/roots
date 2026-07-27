'use client';

import React, { useRef } from 'react';
import { Fraunces } from 'next/font/google';
import LoginBackground from './components/LoginBackground';
import LoginCard from './components/LoginCard';
import LoginHero from './components/LoginHero';
import { useGoogleSignIn } from './useGoogleSignIn';
import { useLoginAnimation } from './loginAnimation';
import './login.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fraunces',
});

const LoginPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { status, shakeToggle, signIn } = useGoogleSignIn();

  useLoginAnimation(rootRef);

  return (
    <div ref={rootRef} className={`roots-login ${fraunces.variable}`}>
      <div className="stage">
        <LoginBackground />

        <div className="layout">
          <LoginCard status={status} shakeToggle={shakeToggle} onSignIn={signIn} />
          <LoginHero />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
