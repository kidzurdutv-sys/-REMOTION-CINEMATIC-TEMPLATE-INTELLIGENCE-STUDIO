import { z } from 'zod';

export const SceneTypeEnum = z.enum(['title', 'kineticText', 'chart', 'image', 'transition']);
export const VisualStyleEnum = z.enum(['minimal', 'bold', 'cinematic', 'tech']);
export const CameraMoveEnum = z.enum(['static', 'pushIn', 'panLeft', 'panRight', 'zoomOut']);

export const SceneSchema = z.object({
  id: z.string(),
  type: SceneTypeEnum,
  startTime: z.number(), // in frames or seconds, let's say frames
  endTime: z.number(), // in frames
  durationFrames: z.number(), // derived
  content: z.record(z.string(), z.any()), // polymorphic based on type
  visualStyle: VisualStyleEnum,
  cameraMove: CameraMoveEnum,
  text: z.string().optional(),
});

export type SceneType = z.infer<typeof SceneTypeEnum>;
export type VisualStyle = z.infer<typeof VisualStyleEnum>;
export type CameraMove = z.infer<typeof CameraMoveEnum>;
export type Scene = z.infer<typeof SceneSchema>;

export type CompositionPlan = {
  id: string;
  scenes: Scene[];
  totalDurationFrames: number;
  fps: number;
  width: number;
  height: number;
};
