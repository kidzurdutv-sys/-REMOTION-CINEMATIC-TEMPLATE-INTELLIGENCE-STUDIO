import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface TitleVisualProps {
  title: string;
  subtitle?: string;
  brandColors?: string[];
}

export const TitleVisual: React.FC<TitleVisualProps> = ({ title, subtitle, brandColors = ['#ffffff'] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const primaryColor = brandColors[0] || '#ffffff';

  const titleSpring = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 100 }
  });

  const subSpring = spring({
    fps,
    frame: frame - 15,
    config: { damping: 14, stiffness: 90 }
  });

  const titleY = interpolate(titleSpring, [0, 1], [100, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subY = interpolate(subSpring, [0, 1], [50, 0]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 0.7]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
      padding: '0 100px'
    }}>
      <h1 style={{
        fontSize: '140px',
        fontWeight: 900,
        margin: 0,
        transform: `translateY(${titleY}px) scale(${interpolate(frame, [0, 150], [1, 1.05])})`,
        opacity: titleOpacity,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        background: `linear-gradient(to right, #ffffff, ${primaryColor})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {title.toUpperCase()}
      </h1>
      {subtitle && (
        <p style={{
          fontSize: '40px',
          fontWeight: 400,
          marginTop: '30px',
          maxWidth: '1200px',
          transform: `translateY(${subY}px)`,
          opacity: subOpacity,
          color: 'rgba(255,255,255,0.8)'
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
