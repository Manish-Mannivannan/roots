import { useLayoutEffect, useEffect, RefObject } from 'react';
import { gsap } from 'gsap';

/** useLayoutEffect on the client, useEffect on the server (avoids SSR warning). */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Ease that matches the original cubic-bezier(0.22, 1, 0.36, 1). */
const EASE = 'power3.out';

/**
 * Drives the login page's entrance choreography with a single GSAP timeline.
 *
 * Each `.from()` reads its target's rendered state as the destination and
 * animates in from the offset given here — so the whole sequence reads top to
 * bottom, and the numbers at the end of each line are the start times (in
 * seconds) that used to be scattered across the JSX as `animationDelay`.
 *
 * Ambient loops (logo float, glow pulse) and state micro-interactions
 * (spinner, shake, success check) stay in CSS — see `login.css`.
 *
 * @param scope Ref to the `.roots-login` root; all selectors are scoped to it.
 */
export function useLoginAnimation(scope: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Skip the choreography: show everything in its final state.
        gsap.set('.rootPath', { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE, duration: 0.8 } });

      // Hero visuals lead in first.
      tl.from('.heroImg', { autoAlpha: 0, scale: 0.92, duration: 1.0 }, 0.35)
        .from('.heroGlow', { autoAlpha: 0, scale: 0.7, duration: 1.3 }, 0.5)
        .fromTo(
          '.rootPath',
          { strokeDashoffset: 1600 },
          { strokeDashoffset: 0, duration: 2.2, stagger: 0.15 },
          0.6,
        )
        // The card and its contents cascade in.
        .from('.card', { autoAlpha: 0, y: 20 }, 0.75)
        .from('.brandRow', { autoAlpha: 0, y: 20, duration: 0.6 }, 1.0)
        .from('.cardTitle', { autoAlpha: 0, y: 20, duration: 0.6 }, 1.12)
        .from('.cardSubtitle', { autoAlpha: 0, y: 20, duration: 0.6 }, 1.24)
        .from('.gbtn', { autoAlpha: 0, y: 20, duration: 0.6 }, 1.36)
        .from('.privacyRow', { autoAlpha: 0, y: 20, duration: 0.6 }, 1.5)
        // Hero copy settles in alongside the card.
        .from('.heroHeading', { autoAlpha: 0, y: 20, duration: 0.7 }, 1.2)
        .from('.heroText', { autoAlpha: 0, y: 20, duration: 0.7 }, 1.36);
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
