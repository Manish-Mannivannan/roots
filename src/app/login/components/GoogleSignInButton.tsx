import React from 'react';
import { cn } from '@/lib/utils';
import type { SignInStatus } from '../useGoogleSignIn';
import { AlertIcon, CheckIcon, GoogleIcon } from '../icons';

interface GoogleSignInButtonProps {
  status: SignInStatus;
  /** Toggles between two identical shake keyframes to re-trigger the animation. */
  shakeToggle: boolean;
  onClick: () => void;
}

const LABELS: Record<SignInStatus, string> = {
  idle: 'Sign in with Google',
  loading: 'Signing you in…',
  success: 'Welcome home',
  error: 'Try again',
};

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ status, shakeToggle, onClick }) => {
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';
  const showGoogleIcon = status === 'idle' || status === 'error';

  return (
    <>
      <button
        type="button"
        className={cn('gbtn', {
          'is-loading': isLoading,
          'is-success': isSuccess,
          'is-error': isError,
        })}
        onClick={onClick}
        disabled={isLoading || isSuccess}
        aria-label="Sign in with Google"
      >
        {isLoading && <span className="spinner" />}
        {isSuccess && <CheckIcon />}
        {showGoogleIcon && <GoogleIcon />}
        <span>{LABELS[status]}</span>
      </button>

      {isError && (
        <div style={{ animation: `${shakeToggle ? 'shakeB' : 'shakeA'} 0.45s ease` }}>
          <div role="alert" className="errorBanner">
            <AlertIcon />
            <span>We couldn&apos;t sign you in. Please try again.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleSignInButton;
