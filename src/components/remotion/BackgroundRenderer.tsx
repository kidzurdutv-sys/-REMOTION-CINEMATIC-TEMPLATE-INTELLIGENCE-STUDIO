import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface BackgroundRendererProps {
  style?: 'grid' | 'gradient' | 'particles' | 'solid';
  brandColors?: string[];
}

export const BackgroundRenderer: React.FC<BackgroundRendererProps> = ({
  style = 'gradient',
  brandColors = ['#1e3a8a']
}) => {
  const frame = useCurrentFrame();
  const primaryColor = brandColors[0] || '#1e3a8a';

  switch (style) {
    case 'grid': {
      const yOffset = frame % 100;
      return (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#050505',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          backgroundPosition: `0px ${yOffset}px`,
          zIndex: -1
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, transparent 20%, #050505 120%)'
          }} />
        </div>
      );
    }

    case 'gradient': {
      const rot = interpolate(frame, [0, 300], [0, 45]);
      return (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0a0a0a',
          overflow: 'hidden',
          zIndex: -1
        }}>
          <div style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            background: `radial-gradient(circle at center, ${primaryColor} 0%, transparent 40%)`,
            transform: `rotate(${rot}deg)`,
            opacity: 0.3
          }} />
          <div style={{
             position: 'absolute',
             inset: 0,
             backdropFilter: 'blur(60px)'
          }} />
        </div>
      );
    }

    case 'particles': {
       const scale = interpolate(frame, [0, 300], [1, 1.1]);
       return (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
          transform: `scale(${scale})`,
          zIndex: -1
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent, #000000)'
          }} />
        </div>
       );
    }

    case 'solid':
    default:
      return (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: -1
        }} />
      );
  }
};
