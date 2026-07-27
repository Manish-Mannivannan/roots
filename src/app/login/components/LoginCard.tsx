import React from 'react';
import Image from 'next/image';
import { LockIcon } from '../icons';
import type { GoogleSignIn } from '../useGoogleSignIn';
import GoogleSignInButton from './GoogleSignInButton';

type LoginCardProps = Pick<GoogleSignIn, 'status' | 'shakeToggle'> & {
  onSignIn: () => void;
};

const LoginCard: React.FC<LoginCardProps> = ({ status, shakeToggle, onSignIn }) => (
  <div className="card" tabIndex={-1}>
    <div className="brandRow">
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

    <h2 className="cardTitle fraunces">Welcome back</h2>
    <p className="cardSubtitle">Sign in to continue exploring your family story.</p>

    <GoogleSignInButton status={status} shakeToggle={shakeToggle} onClick={onSignIn} />

    <div className="privacyRow">
      <LockIcon />
      <span>Your family information stays private and secure.</span>
    </div>
  </div>
);

export default LoginCard;
