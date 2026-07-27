import React from 'react';

/**
 * Small presentational SVG icons used across the login page.
 * Kept together so the markup in the card/button stays readable.
 */

export const GoogleIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }} aria-hidden="true">
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
);

export const CheckIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="checkIcon" aria-hidden="true">
    <path
      d="M20 6L9 17l-5-5"
      stroke="#fff"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AlertIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="#ED806D" strokeWidth={2} />
    <path d="M12 7.5v5" stroke="#ED806D" strokeWidth={2} strokeLinecap="round" />
    <circle cx="12" cy="16.2" r="1.1" fill="#ED806D" />
  </svg>
);

export const LockIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" stroke="#a89189" strokeWidth={1.8} />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#a89189" strokeWidth={1.8} />
  </svg>
);
