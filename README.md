# Remotion Cinematic Template Intelligence Studio

The **Remotion Cinematic Template Intelligence Studio** is a deterministic, AI-fallback, high-end motion graphics template generator. It takes a raw voiceover script, analyzes narrative beats, assigns visual styles and complex cinematic 2.5D camera rigs, and renders a structured, deterministic Remotion composition.

## Features
- **Intelligent Script Analysis**: Uses an NLP-lite parser to segment scenes, detect statistical data, headlines, and transitions.
- **Cinematic Camera Rig**: 2.5D coordinate transforms for push-in, pans, and zoom-out movements.
- **Kinetic Typography**: Word and character-level spring animations for minimal, bold, and cinematic styles.
- **Generative Backgrounds**: High-performance animated grid, gradient, and particle backgrounds synchronized to the Remotion frame clock.
- **Data Visualizations**: Procedurally animated charts.
- **Export Engine**: Packages the generated Remotion sequence into a standalone `.zip` project ready for local rendering.
- **Zero External APIs**: Operates fully on the client side using deterministic logic.

## Tech Stack
- **Framework**: React 19, TypeScript
- **Video Rendering Engine**: Remotion 4
- **Styling**: Tailwind CSS v4
- **Schemas**: Zod
- **Bundler**: Vite

## Setup Instructions
Ensure you have Node.js 18+ installed.

1. Install dependencies: \`npm install\`
2. Start the development server: \`npm run start\` or \`npm run build && npm run preview\`

## How to Use
1. Open the application.
2. **Paste a script** into the Narrative Script workspace or click "Load Sample".
3. **Select a Tone** (Documentary, Dramatic, Educational, Promotional).
4. Click **Generate Cinematic Template**. The intelligence engine will segment the script and spawn a Remotion preview automatically.
5. Watch the preview in the embedded player.
6. Click **Export ZIP** to download a standalone Remotion project containing the generated scenes and required dependencies.

## Architecture

src/
├── App.tsx                    // Main Single-Workspace UI and Player host
├── components/remotion/       // Reusable Remotion components
│   ├── CameraRig.tsx          // 2.5D Multi-plane camera logic
│   ├── KineticTypography.tsx  // Text animation engine
│   ├── BackgroundRenderer.tsx // Generative background canvas
│   └── TransitionOverlay.tsx  // Wipes and cuts
├── compositions/
│   └── GeneratedComposition.tsx// The generated Remotion Sequence assembler
├── engine/                    // The Intelligence Layer
│   ├── scriptAnalysis.ts      // NLP parser and narrative beat detection
│   └── visualSelector.ts      // Maps beats to visual/camera parameters
├── schemas/                   // Zod Validation Layer
│   ├── scriptSchema.ts
│   └── sceneSchema.ts
├── services/
│   └── exportService.ts       // JSZip + Vite Raw bundler for ZIP exports
└── visuals/                   // High-impact scene treatments
    ├── ChartVisual.tsx
    └── TitleVisual.tsx
