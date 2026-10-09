import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import type { CameraMove } from '../../schemas/sceneSchema';

interface CameraRigProps {
  children: React.ReactNode;
  cameraMove: CameraMove;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  cameraMove
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(frame / durationInFrames, 1);
  const perspective = 1200;

  let translateZ = 0;
  let translateX = 0;
  let translateY = 0;
  let rotateY = 0;
  let scale = 1;

  const smoothProgress = interpolate(progress, [0, 1], [0, 1], {
    easing: (t) => t * t * (3 - 2 * t)
  });

  switch (cameraMove) {
    case 'pushIn':
      translateZ = interpolate(smoothProgress, [0, 1], [0, 300]);
      break;
    case 'zoomOut':
      scale = interpolate(smoothProgress, [0, 1], [1.2, 1]);
      break;
    case 'panLeft':
      translateX = interpolate(smoothProgress, [0, 1], [100, -100]);
      rotateY = interpolate(smoothProgress, [0, 1], [3, -3]);
      break;
    case 'panRight':
      translateX = interpolate(smoothProgress, [0, 1], [-100, 100]);
      rotateY = interpolate(smoothProgress, [0, 1], [-3, 3]);
      break;
    case 'static':
    default:
      break;
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      transformStyle: 'preserve-3d',
      perspective: `${perspective}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        transformStyle: 'preserve-3d',
        transform: `translateZ(${translateZ}px) translateX(${translateX}px) translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`
      }}>
        {children}
      </div>
    </div>
  );
};
