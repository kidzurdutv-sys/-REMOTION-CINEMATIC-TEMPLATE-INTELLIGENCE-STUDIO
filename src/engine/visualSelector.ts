import type { SceneType, CameraMove } from '../schemas/sceneSchema';
import type { Tone } from '../schemas/scriptSchema';

export const selectVisualParams = (type: SceneType, tone: Tone, index: number): { cameraMove: CameraMove, contentOverrides: any } => {
  let cameraMove: CameraMove = 'static';
  let contentOverrides: any = {};

  if (type === 'title') {
    cameraMove = 'pushIn';
    contentOverrides.fontSize = tone === 'dramatic' ? '120px' : '96px';
  } else if (type === 'chart') {
    cameraMove = 'static';
    // Dummy chart data derivation based on index
    contentOverrides.chartData = [
      { label: 'A', value: 40 + (index * 5) % 40 },
      { label: 'B', value: 65 + (index * 3) % 20 },
      { label: 'C', value: 30 + (index * 7) % 50 },
    ];
  } else if (type === 'kineticText') {
    // Alternate pans
    cameraMove = index % 2 === 0 ? 'panLeft' : 'panRight';
  } else if (type === 'transition') {
    cameraMove = 'zoomOut';
    contentOverrides.transitionType = index % 2 === 0 ? 'fade' : 'wipe';
  }

  return {
    cameraMove,
    contentOverrides
  };
};
