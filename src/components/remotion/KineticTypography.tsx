import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface KineticTypographyProps {
  text: string;
  visualStyle: 'minimal' | 'bold' | 'cinematic' | 'tech';
  brandColors?: string[];
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text,
  visualStyle,
  brandColors = ['#ffffff']
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(/\s+/);
  const primaryColor = brandColors[0] || '#ffffff';

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: '100%',
      margin: '0 auto',
      gap: '20px',
      fontFamily: visualStyle === 'tech' ? 'monospace' : 'system-ui, sans-serif'
    }}>
      {words.map((word, i) => {
        // Deterministic stagger
        const delay = i * (visualStyle === 'cinematic' ? 6 : 3);

        const enterSpring = spring({
          fps,
          frame: frame - delay,
          config: {
            damping: 14,
            stiffness: 120,
            mass: 0.8
          }
        });

        const yOffset = interpolate(enterSpring, [0, 1], [50, 0]);
        const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

        let customStyle: React.CSSProperties = {
          color: 'white',
          fontSize: '72px',
          fontWeight: 600,
        };

        if (visualStyle === 'bold') {
           customStyle.fontWeight = 900;
           customStyle.fontSize = '84px';
           customStyle.WebkitTextStroke = `2px ${primaryColor}`;
           customStyle.color = 'transparent';
        } else if (visualStyle === 'cinematic') {
           customStyle.textShadow = `0 4px 20px rgba(0,0,0,0.5)`;
        } else if (visualStyle === 'tech') {
           customStyle.color = primaryColor;
        }

        return (
          <span
            key={`${i}-${word}`}
            style={{
              display: 'inline-block',
              transform: `translateY(${yOffset}px)`,
              opacity,
              lineHeight: 1.2,
              ...customStyle
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
