'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Fraunces } from 'next/font/google';
import { signInWithGoogle } from '@/lib/supabaseClient';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fraunces',
});

type Status = 'idle' | 'loading' | 'success' | 'error';

const LoginPage: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [shakeToggle, setShakeToggle] = useState(false);

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';
  const showGoogleIcon = status === 'idle' || status === 'error';

  const btnLabel = isLoading
    ? 'Signing you in…'
    : isSuccess
    ? 'Welcome home'
    : isError
    ? 'Try again'
    : 'Sign in with Google';

  const handleSignIn = useCallback(async () => {
    if (isLoading || isSuccess) return;
    setStatus('loading');
    const { error } = await signInWithGoogle();
    if (error) {
      setShakeToggle((v) => !v);
      setStatus('error');
    } else {
      // Supabase redirects the browser away on success, so this mostly
      // exists as a fallback in case the redirect is ever delayed.
      setStatus('success');
    }
  }, [isLoading, isSuccess]);

  return (
    <div className={`roots-login ${fraunces.variable}`}>
      <div className="stage">
        <div className="blob blobA" aria-hidden="true" />
        <div className="blob blobB" aria-hidden="true" />
        <div className="blob blobC" aria-hidden="true" />

        <svg
          className="rootsSvg"
          viewBox="0 0 340 900"
          preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
        >
          <g fill="none" stroke="#8a3a24" strokeWidth={2.6} strokeLinecap="round">
            <path
              className="rootPath"
              style={{ animationDelay: '0.6s' }}
              d="M180 -20 C 180 160 178 260 170 340 C 160 440 60 500 20 620 C -10 700 -25 800 -35 920"
            />
            <path
              className="rootPath"
              style={{ animationDelay: '0.75s' }}
              d="M170 340 C 182 440 300 490 350 610 C 385 685 400 800 410 920"
            />
            <path
              className="rootPath"
              style={{ animationDelay: '0.9s' }}
              d="M174 400 C 174 540 180 700 186 920"
            />
            <path
              className="rootPath"
              style={{ animationDelay: '1.0s' }}
              d="M90 540 C 45 640 34 760 76 920"
            />
            <path
              className="rootPath"
              style={{ animationDelay: '1.1s' }}
              d="M280 540 C 240 640 240 780 275 920"
            />
            <path
              className="rootPath"
              style={{ animationDelay: '1.2s' }}
              d="M350 610 C 385 690 395 790 372 920"
            />
          </g>
        </svg>

        <div className="layout">
          <div className="card anim" style={{ animationDelay: '0.75s' }} tabIndex={-1}>
            <div className="brandRow anim" style={{ animationDelay: '1.0s' }}>
              <Image
                src="/icons/icon.png"
                alt=""
                aria-hidden="true"
                width={46}
                height={46}
                className="brandIcon"
              />
              <h1 className="wordmark fraunces">Roots</h1>
            </div>

            <h2 className="cardTitle fraunces anim" style={{ animationDelay: '1.12s' }}>
              Welcome back
            </h2>
            <p className="cardSubtitle anim" style={{ animationDelay: '1.24s' }}>
              Sign in to continue exploring your family story.
            </p>

            <button
              type="button"
              className={`gbtn anim ${
                isLoading ? 'is-loading' : isSuccess ? 'is-success' : isError ? 'is-error' : ''
              }`}
              style={{ animationDelay: '1.36s' }}
              onClick={handleSignIn}
              disabled={isLoading || isSuccess}
              aria-label="Sign in with Google"
            >
              {isLoading && <span className="spinner" />}
              {isSuccess && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="checkIcon">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="#fff"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {showGoogleIcon && (
                <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
              )}
              <span>{btnLabel}</span>
            </button>

            {isError && (
              <div style={{ animation: `${shakeToggle ? 'shakeB' : 'shakeA'} 0.45s ease` }}>
                <div role="alert" className="errorBanner">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="9" stroke="#ED806D" strokeWidth={2} />
                    <path d="M12 7.5v5" stroke="#ED806D" strokeWidth={2} strokeLinecap="round" />
                    <circle cx="12" cy="16.2" r="1.1" fill="#ED806D" />
                  </svg>
                  <span>We couldn&apos;t sign you in. Please try again.</span>
                </div>
              </div>
            )}

            <div className="privacyRow anim" style={{ animationDelay: '1.5s' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="#a89189" strokeWidth={1.8} />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#a89189" strokeWidth={1.8} />
              </svg>
              <span>Your family information stays private and secure.</span>
            </div>
          </div>

          <div className="hero">
            <div className="heroImgRow">
              <div className="heroGlow" aria-hidden="true" />
              <div className="logoWrap idle">
                <Image
                  src="/icons/squidNBG.png"
                  alt="The Roots logo, a warm clay sculpture whose limbs branch outward like the roots of a family tree"
                  width={853}
                  height={1280}
                  priority
                  className="heroImg anim"
                />
              </div>
            </div>
            <div className="heroCopy">
              <h2 className="fraunces anim" style={{ animationDelay: '1.2s' }}>
                Every story begins somewhere.
              </h2>
              <p className="anim" style={{ animationDelay: '1.36s' }}>
                Discover the people, places, and connections that shaped your family.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bgFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes logoIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes glowIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes idleFloat {
          0% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-5px) rotate(1deg);
          }
          100% {
            transform: translateY(0) rotate(-1deg);
          }
        }
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        @keyframes rootGrow {
          from {
            stroke-dashoffset: 900;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes sweep {
          0% {
            transform: translateX(-160%) skewX(-12deg);
          }
          100% {
            transform: translateX(320%) skewX(-12deg);
          }
        }
        @keyframes shakeA {
          10%,
          90% {
            transform: translateX(-1px);
          }
          20%,
          80% {
            transform: translateX(2px);
          }
          30%,
          50%,
          70% {
            transform: translateX(-5px);
          }
          40%,
          60% {
            transform: translateX(5px);
          }
        }
        @keyframes shakeB {
          10%,
          90% {
            transform: translateX(-1px);
          }
          20%,
          80% {
            transform: translateX(2px);
          }
          30%,
          50%,
          70% {
            transform: translateX(-5px);
          }
          40%,
          60% {
            transform: translateX(5px);
          }
        }
        @keyframes checkPop {
          0% {
            transform: scale(0.4);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .roots-login {
          font-family: var(--font-inter, Inter), system-ui, sans-serif;
          color: #332723;
          -webkit-font-smoothing: antialiased;
        }
        .roots-login .fraunces {
          font-family: var(--font-fraunces, Fraunces), serif;
        }
        .roots-login * {
          box-sizing: border-box;
        }

        .roots-login .stage {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          overflow: hidden;
          animation: bgFade 0.7s ease both;
          background: radial-gradient(1100px 900px at 10% 24%, rgba(244, 205, 131, 0.85), transparent 58%),
            radial-gradient(1150px 1000px at 92% 78%, rgba(237, 128, 109, 0.66), transparent 60%),
            radial-gradient(820px 700px at 74% 10%, rgba(246, 178, 148, 0.6), transparent 55%),
            linear-gradient(140deg, #fcebd2 0%, #f8d9c3 48%, #f4c3b0 100%);
        }
        .roots-login .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .roots-login .blobA {
          top: -120px;
          left: -100px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(244, 205, 131, 0.5), transparent 70%);
          filter: blur(46px);
        }
        .roots-login .blobB {
          bottom: -160px;
          right: -80px;
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, rgba(237, 128, 109, 0.34), transparent 70%);
          filter: blur(52px);
        }
        .roots-login .blobC {
          bottom: 8%;
          left: 16%;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(246, 178, 148, 0.3), transparent 70%);
          filter: blur(40px);
        }

        .roots-login .rootsSvg {
          position: absolute;
          top: 0;
          right: 318px;
          width: 36%;
          height: 100%;
          opacity: 0.09;
          pointer-events: none;
        }
        .roots-login .rootPath {
          stroke-dasharray: 1600;
          animation: rootGrow 2.2s ease both;
        }

        .roots-login .layout {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 72px;
          max-width: 1080px;
          width: 100%;
        }

        .roots-login .card {
          position: relative;
          flex-shrink: 0;
          width: 452px;
          padding: 56px 50px;
          border-radius: 26px;
          background: linear-gradient(180deg, rgba(255, 253, 251, 0.97), rgba(255, 249, 243, 0.95));
          border: 1px solid rgba(237, 128, 109, 0.14);
          box-shadow: 0 30px 70px -24px rgba(120, 58, 36, 0.32), 0 8px 22px rgba(120, 58, 36, 0.1);
          animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .roots-login .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 40px 90px -22px rgba(120, 58, 36, 0.38), 0 10px 26px rgba(120, 58, 36, 0.12);
        }

        .roots-login .brandRow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 26px;
          animation: fadeUp 0.6s ease both;
        }
        .roots-login .brandIcon {
          width: 46px;
          height: 46px;
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(237, 128, 109, 0.28));
        }
        .roots-login .wordmark {
          margin: 0;
          font-size: 40px;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1;
          background: linear-gradient(120deg, #f4cd83, #f6b294 45%, #ed806d);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .roots-login .cardTitle {
          margin: 0 0 12px 0;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #332723;
          animation: fadeUp 0.6s ease both;
        }
        .roots-login .cardSubtitle {
          margin: 0 0 34px 0;
          font-size: 16px;
          line-height: 1.55;
          color: #76635d;
          text-wrap: pretty;
          animation: fadeUp 0.6s ease both;
        }

        .roots-login .gbtn {
          position: relative;
          overflow: hidden;
          width: 100%;
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 22px;
          border-radius: 14px;
          border: 1.5px solid rgba(237, 128, 109, 0.35);
          background: #ffffff;
          color: #332723;
          font-family: inherit;
          font-size: 15.5px;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          box-shadow: 0 2px 8px rgba(120, 58, 36, 0.06);
          animation: fadeUp 0.6s ease both;
          transition: transform 0.18s ease, background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .roots-login .gbtn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 55%;
          background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          transform: translateX(-160%) skewX(-12deg);
          pointer-events: none;
        }
        .roots-login .gbtn:not(.is-loading):not(.is-success):hover::after {
          animation: sweep 0.85s ease;
        }
        .roots-login .gbtn:not(.is-loading):not(.is-success):hover {
          background: rgba(246, 178, 148, 0.1);
          transform: translateY(-1.5px);
          box-shadow: 0 8px 20px rgba(237, 128, 109, 0.18);
        }
        .roots-login .gbtn:not(.is-loading):not(.is-success):active {
          transform: scale(0.98);
          box-shadow: 0 2px 6px rgba(237, 128, 109, 0.12);
        }
        .roots-login .gbtn:focus-visible {
          outline: 3px solid rgba(237, 128, 109, 0.55);
          outline-offset: 3px;
        }
        .roots-login .gbtn.is-loading {
          background: rgba(246, 178, 148, 0.14) !important;
          cursor: default;
        }
        .roots-login .gbtn.is-success {
          background: linear-gradient(120deg, #f4cd83, #ed806d) !important;
          border-color: transparent !important;
          color: #fff !important;
          box-shadow: 0 0 0 6px rgba(237, 128, 109, 0.14), 0 12px 28px rgba(237, 128, 109, 0.38) !important;
        }
        .roots-login .gbtn.is-error {
          border-color: rgba(237, 128, 109, 0.65) !important;
        }

        .roots-login .spinner {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2.5px solid rgba(237, 128, 109, 0.28);
          border-top-color: #ed806d;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .roots-login .checkIcon {
          flex-shrink: 0;
          animation: checkPop 0.4s ease both;
        }

        .roots-login .errorBanner {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 14px;
          border-radius: 12px;
          background: rgba(237, 128, 109, 0.09);
          border: 1px solid rgba(237, 128, 109, 0.22);
          color: #a34b39;
          font-size: 13.5px;
          line-height: 1.4;
        }

        .roots-login .privacyRow {
          margin-top: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #76635d;
          font-size: 12.5px;
          animation: fadeUp 0.6s ease both;
        }

        .roots-login .hero {
          position: relative;
          flex: 1;
          min-width: 0;
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px 0;
        }
        .roots-login .heroImgRow {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .roots-login .heroGlow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(246, 178, 148, 0.5) 0%, rgba(244, 205, 131, 0.28) 42%, transparent 70%);
          filter: blur(12px);
          animation: glowIn 1.3s ease 0.5s both, glowPulse 7s ease-in-out 2.4s infinite;
        }
        .roots-login .logoWrap {
          position: relative;
          animation: idleFloat 7s ease-in-out 2.4s infinite;
        }
        .roots-login .heroImg {
          display: block;
          width: 100%;
          max-width: 400px;
          height: auto;
          filter: drop-shadow(0 30px 46px rgba(160, 80, 40, 0.28));
          animation: logoIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        }
        .roots-login .heroCopy {
          position: relative;
          text-align: center;
          max-width: 420px;
          margin-top: -8px;
        }
        .roots-login .heroCopy h2 {
          margin: 0 0 12px 0;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #332723;
          text-wrap: balance;
          animation: fadeUp 0.7s ease both;
        }
        .roots-login .heroCopy p {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: #76635d;
          text-wrap: pretty;
          animation: fadeUp 0.7s ease both;
        }

        @media (max-width: 1024px) {
          .roots-login .layout {
            gap: 34px !important;
          }
          .roots-login .card {
            width: 384px !important;
            padding: 46px 38px !important;
          }
          .roots-login .heroImg {
            max-width: 300px !important;
          }
          .roots-login .heroCopy h2 {
            font-size: 28px !important;
          }
        }
        @media (max-width: 720px) {
          .roots-login .stage {
            padding: 26px 18px !important;
          }
          .roots-login .layout {
            flex-direction: column-reverse !important;
            gap: 22px !important;
            max-width: 460px !important;
          }
          .roots-login .card {
            width: 100% !important;
            padding: 34px 24px !important;
          }
          .roots-login .heroImg {
            max-width: 168px !important;
          }
          .roots-login .heroGlow {
            width: 300px !important;
            height: 300px !important;
          }
          .roots-login .heroCopy {
            display: none !important;
          }
          .roots-login .wordmark {
            font-size: 44px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .roots-login .anim {
            animation: fadeUp 0.4s ease both !important;
          }
          .roots-login .idle {
            animation: none !important;
          }
          .roots-login .rootPath {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
          .roots-login .gbtn::after {
            display: none !important;
          }
          .roots-login .spinner {
            animation-duration: 0s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
