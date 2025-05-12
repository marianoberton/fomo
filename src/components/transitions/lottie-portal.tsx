'use client'

import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, ComponentProps } from 'react';
import { createPortal } from 'react-dom';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

// Use ComponentProps to get the correct props type
type LottieComponentProps = ComponentProps<typeof Lottie>;

interface LottiePortalProps {
  animationPath: string;
  className?: string;
  lottieProps?: Omit<LottieComponentProps, 'animationData' | 'lottieRef'>;
}

const LottiePortal = forwardRef<LottieRefCurrentProps | null, LottiePortalProps>(
  ({ animationPath, className, lottieProps }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const [animationData, setAnimationData] = useState<any | null>(null);
    const internalLottieRef = useRef<LottieRefCurrentProps | null>(null);

    // Expose the internal ref's current value via the forwarded ref
    useImperativeHandle(ref, (): LottieRefCurrentProps | null => internalLottieRef.current, []);

    useEffect(() => {
      setIsMounted(true);
      console.log('LottiePortal attempting to mount...');
      fetch(animationPath)
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => console.error('Error loading Lottie animation:', error));

      return () => setIsMounted(false);
    }, [animationPath]);

    if (!isMounted || !animationData) {
      return null;
    }

    if (typeof document === 'undefined' || !document.body) {
        console.log('LottiePortal: document or document.body not found.');
        return null;
    }

    console.log('LottiePortal: Rendering portal into document.body.');
    return createPortal(
      <div className={className}>
        <Lottie
          animationData={animationData}
          lottieRef={internalLottieRef}
          {...lottieProps}
          className="w-full h-full"
        />
      </div>,
      document.body
    );
  }
);

LottiePortal.displayName = 'LottiePortal';

export default LottiePortal; 