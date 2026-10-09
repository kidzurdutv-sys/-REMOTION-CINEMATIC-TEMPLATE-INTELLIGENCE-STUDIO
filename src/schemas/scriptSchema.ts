import { z } from 'zod';

export const ToneEnum = z.enum(['dramatic', 'educational', 'promotional', 'documentary']);

export const ScriptInputSchema = z.object({
  id: z.string(),
  text: z.string(),
  tone: ToneEnum,
  targetDuration: z.number().optional(), // in seconds
  brandColors: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).optional(), // array of hex colors
  language: z.string().default('en'),
});

export type Tone = z.infer<typeof ToneEnum>;
export type ScriptInput = z.infer<typeof ScriptInputSchema>;

export type ScriptAnalysisResult = {
  script: ScriptInput;
  sections: any[]; // we will define this better in sceneSchema
};
