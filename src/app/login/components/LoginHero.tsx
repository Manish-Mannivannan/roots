import React from 'react';
import Image from 'next/image';

const LoginHero: React.FC = () => (
  <div className="hero">
    <div className="heroImgRow">
      <div className="heroGlow" aria-hidden="true" />
      <div className="logoWrap">
        <Image
          src="/icons/squidNBG.png"
          alt="The Roots logo, a warm clay sculpture whose limbs branch outward like the roots of a family tree"
          width={853}
          height={1280}
          priority
          className="heroImg"
        />
      </div>
    </div>
    <div className="heroCopy">
      <h2 className="fraunces heroHeading">Every story begins somewhere.</h2>
      <p className="heroText">
        Discover the people, places, and connections that shaped your family.
      </p>
    </div>
  </div>
);

export default LoginHero;
