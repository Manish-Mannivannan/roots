import React from 'react';

/** Decorative root paths that draw in behind the layout (see loginAnimation.ts). */
const ROOT_PATHS = [
  'M180 -20 C 180 160 178 260 170 340 C 160 440 60 500 20 620 C -10 700 -25 800 -35 920',
  'M170 340 C 182 440 300 490 350 610 C 385 685 400 800 410 920',
  'M174 400 C 174 540 180 700 186 920',
  'M90 540 C 45 640 34 760 76 920',
  'M280 540 C 240 640 240 780 275 920',
  'M350 610 C 385 690 395 790 372 920',
];

/** Full-bleed ambient background: soft blobs plus the drawn-in root system. */
const LoginBackground: React.FC = () => (
  <>
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
        {ROOT_PATHS.map((d, i) => (
          <path key={i} className="rootPath" d={d} />
        ))}
      </g>
    </svg>
  </>
);

export default LoginBackground;
