import type { ScriptInput, Tone } from '../schemas/scriptSchema';
import type { Scene, SceneType, VisualStyle } from '../schemas/sceneSchema';
import { selectVisualParams } from './visualSelector';

const splitIntoSentences = (text: string): string[] => {
  return text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split(/[\n|]+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);
};

const determineSceneType = (text: string, index: number, isLast: boolean): SceneType => {
  const lowerText = text.toLowerCase();

  // Detect transitions
  if (lowerText.match(/\b(meanwhile|however|next|finally|therefore|so)\b/) && text.split(/\s+/).length < 15) {
    return 'transition';
  }

  // Detect statistical data for charts
  if (lowerText.match(/\b(percent|%|million|billion|increase|decrease|[0-9]+)\b/)) {
    return 'chart';
  }

  // Detect headlines / titles
  if (index === 0 || isLast || (text.length < 40 && !text.includes(','))) {
    return 'title';
  }

  return 'kineticText';
};

const determineVisualStyle = (tone: Tone): VisualStyle => {
  switch (tone) {
    case 'dramatic': return 'cinematic';
    // case 'tech': return 'tech'; // Not explicitly in Tone, but maybe mapping from something else? Let's fix this below
    case 'educational': return 'minimal';
    case 'promotional': return 'bold';
    case 'documentary': return 'cinematic';
    default: return 'minimal';
  }
};

export const analyzeScript = (input: ScriptInput, fps: number = 30): Scene[] => {
  const sentences = splitIntoSentences(input.text);
  const visualStyle = determineVisualStyle(input.tone);

  const scenes: Scene[] = [];
  let currentFrame = 0;

  sentences.forEach((text, index) => {
    const isLast = index === sentences.length - 1;
    const type = determineSceneType(text, index, isLast);

    // Calculate duration based on words, ~2.5 words per second
    const words = text.split(/\s+/).length;
    let durationSeconds = Math.max(words / 2.5, 2.5); // minimum 2.5s

    // Adjust duration for specific types
    if (type === 'transition') durationSeconds = 1.5;
    if (type === 'title') durationSeconds = Math.max(durationSeconds, 3);

    const durationFrames = Math.round(durationSeconds * fps);

    const visualParams = selectVisualParams(type, input.tone, index);

    scenes.push({
      id: `scene_${index}`,
      type,
      startTime: currentFrame,
      endTime: currentFrame + durationFrames,
      durationFrames,
      visualStyle,
      cameraMove: visualParams.cameraMove,
      text: text,
      content: {
        text,
        brandColors: input.brandColors || ['#ffffff'],
        ...visualParams.contentOverrides
      }
    });

    currentFrame += durationFrames;
  });

  return scenes;
};
