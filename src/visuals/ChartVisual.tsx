import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface ChartVisualProps {
  data: { label: string, value: number }[];
  brandColors?: string[];
}

export const ChartVisual: React.FC<ChartVisualProps> = ({ data, brandColors = ['#3B82F6'] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const primaryColor = brandColors[0] || '#3B82F6';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        height: '400px',
        gap: '60px',
        borderBottom: '2px solid rgba(255,255,255,0.2)',
        paddingBottom: '20px'
      }}>
        {data.map((item, i) => {
          const delay = i * 10;
          const barSpring = spring({
            fps,
            frame: frame - delay - 10,
            config: {
              damping: 12,
              stiffness: 100,
            }
          });

          const height = interpolate(barSpring, [0, 1], [0, item.value * 3]);
          const opacity = interpolate(barSpring, [0, 1], [0, 1]);
          const isHighlight = i === data.length - 1;

          return (
            <div key={i} style={{
              width: '100px',
              height: `${height}px`,
              backgroundColor: isHighlight ? primaryColor : 'rgba(255,255,255,0.6)',
              opacity,
              borderRadius: '8px 8px 0 0',
              position: 'relative',
              boxShadow: isHighlight ? `0 0 30px ${primaryColor}80` : 'none'
            }}>
              {frame > delay + 15 && (
                <div style={{
                  position: 'absolute',
                  top: '-60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: isHighlight ? primaryColor : 'white',
                  opacity: interpolate(frame - delay - 15, [0, 10], [0, 1])
                }}>
                  {Math.round(interpolate(barSpring, [0,1], [0, item.value]))}
                </div>
              )}
              {frame > delay + 20 && (
                <div style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.8)',
                  opacity: interpolate(frame - delay - 20, [0, 10], [0, 1])
                }}>
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
