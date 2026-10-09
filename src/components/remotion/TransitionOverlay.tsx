import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface TransitionOverlayProps {
  type?: 'fade' | 'wipe' | 'cut' | 'slide';
  direction?: 'in' | 'out';
}

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({
  type = 'fade',
  direction = 'in'
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const transitionDuration = Math.min(30, durationInFrames);

  // Transition IN happens at start, OUT happens at end
  const isOut = direction === 'out';
  const activeFrame = isOut ? Math.max(0, frame - (durationInFrames - transitionDuration)) : frame;

  const progress = Math.max(0, Math.min(activeFrame / transitionDuration, 1));
  const smoothProgress = interpolate(progress, [0, 1], [0, 1], {
    easing: (t) => t * (2 - t) // ease out
  });

  if (type === 'cut') return null;

  let style: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 9999,
    pointerEvents: 'none',
    backgroundColor: '#000000'
  };

  if (type === 'fade') {
    style.opacity = isOut ? smoothProgress : 1 - smoothProgress;
  } else if (type === 'wipe') {
    const p = isOut ? smoothProgress * 100 : (1 - smoothProgress) * 100;
    style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
  } else if (type === 'slide') {
    const y = isOut ? smoothProgress * 100 : (1 - smoothProgress) * -100;
    style.transform = `translateY(${y}%)`;
  }

  return <div style={style} />;
};
