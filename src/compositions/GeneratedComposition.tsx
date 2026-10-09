import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import type { Scene } from '../schemas/sceneSchema';
import { CameraRig } from '../components/remotion/CameraRig';
import { BackgroundRenderer } from '../components/remotion/BackgroundRenderer';
import { KineticTypography } from '../components/remotion/KineticTypography';
import { TransitionOverlay } from '../components/remotion/TransitionOverlay';
import { ChartVisual } from '../visuals/ChartVisual';
import { TitleVisual } from '../visuals/TitleVisual';

export const GeneratedComposition: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
      {scenes.map((scene, index) => {
        const { startTime, durationFrames, type, visualStyle, cameraMove, content } = scene;

        let visualComponent = null;
        switch (type) {
          case 'chart':
            visualComponent = <ChartVisual data={(content.chartData as any[]) || []} brandColors={content.brandColors as string[]} />;
            break;
          case 'title':
            visualComponent = <TitleVisual title={(content.text as string) || ''} brandColors={content.brandColors as string[]} />;
            break;
          case 'transition':
            visualComponent = <KineticTypography text={(content.text as string) || ''} visualStyle={visualStyle} brandColors={content.brandColors as string[]} />;
            break;
          case 'kineticText':
          default:
             visualComponent = <KineticTypography text={(content.text as string) || ''} visualStyle={visualStyle} brandColors={content.brandColors as string[]} />;
             break;
        }

        // Determine background style based on visual style
        let bgStyle: 'grid' | 'gradient' | 'particles' | 'solid' = 'gradient';
        if (visualStyle === 'tech') bgStyle = 'grid';
        if (visualStyle === 'cinematic') bgStyle = 'particles';
        if (visualStyle === 'minimal') bgStyle = 'solid';

        return (
          <Sequence
            key={scene.id}
            from={startTime}
            durationInFrames={durationFrames}
            name={`Scene ${index + 1}: ${type}`}
          >
            <AbsoluteFill>
              <BackgroundRenderer style={bgStyle} brandColors={content.brandColors as string[]} />

              <CameraRig cameraMove={cameraMove}>
                {visualComponent}
              </CameraRig>

              {/* Add transitions out unless it's the last scene */}
              {index < scenes.length - 1 && (
                 <TransitionOverlay type={(content.transitionType as any) || 'fade'} direction="out" />
              )}
              {/* Add transitions in unless it's the first scene */}
              {index > 0 && (
                 <TransitionOverlay type={(scenes[index-1].content.transitionType as any) || 'fade'} direction="in" />
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
