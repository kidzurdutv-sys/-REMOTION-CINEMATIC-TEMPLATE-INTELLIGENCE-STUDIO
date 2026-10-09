import { useState, useMemo } from 'react';
import { Player } from '@remotion/player';
import { analyzeScript } from './engine/scriptAnalysis';
import { GeneratedComposition } from './compositions/GeneratedComposition';
import type { Scene } from './schemas/sceneSchema';
import type { Tone } from './schemas/scriptSchema';
import { exportProject } from './services/exportService';
import { Play, Download, Wand2, FileText, LayoutDashboard } from 'lucide-react';

const SAMPLE_SCRIPT = `The ocean covers 71% of the Earth's surface. Yet, we have explored less than 5% of it.
This incredible expanse remains one of our planet's greatest mysteries.
Unlike the predictable landmasses, the deep ocean is a dynamic, high-pressure environment.
By 2050, it is estimated that there could be more plastic than fish in the ocean.
Protecting this vital resource is no longer an option, but a necessity.`;

function App() {
  const [script, setScript] = useState('');
  const [tone, setTone] = useState<Tone>('documentary');
  const [scenes, setScenes] = useState<Scene[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!script.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const generatedScenes = analyzeScript({
        id: '1',
        text: script,
        language: "en",
        tone: tone,
        brandColors: ['#3b82f6'] // Tailwind blue-500
      });
      setScenes(generatedScenes);
      setIsGenerating(false);
    }, 800);
  };

  const handleExport = async () => {
    if (!scenes) return;
    await exportProject(scenes);
  };

  const wordCount = useMemo(() => script.split(/\s+/).filter(w => w.length > 0).length, [script]);
  const totalDurationFrames = useMemo(() => scenes ? scenes[scenes.length - 1].endTime : 0, [scenes]);
  const fps = 30;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <header className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-blue-500" />
          <h1 className="text-xl font-semibold tracking-tight text-white">Remotion Cinematic Studio</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs font-medium text-neutral-400 bg-neutral-800/50 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            Engine Ready
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1600px] mx-auto w-full">
        {/* Left Column: Input */}
        <section className="flex flex-col space-y-4 lg:col-span-5 xl:col-span-4 h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-400" />
              Narrative Script
            </h2>
            <button
              onClick={() => setScript(SAMPLE_SCRIPT)}
              className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1 rounded-full"
            >
              Load Sample
            </button>
          </div>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="documentary">Documentary</option>
            <option value="dramatic">Dramatic</option>
            <option value="educational">Educational</option>
            <option value="promotional">Promotional</option>
          </select>

          <textarea
            className="flex-1 w-full min-h-[400px] bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-neutral-600 shadow-inner"
            placeholder="Paste your voiceover script here. The intelligence engine will analyze the narrative beats and design a cinematic sequence..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />

          <div className="flex justify-between items-center text-xs text-neutral-500 font-medium px-1">
            <span>{wordCount} words</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!script.trim() || isGenerating}
            className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all shadow-lg ${
              !script.trim() ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-900/20 hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Cinematic Template
              </>
            )}
          </button>
        </section>

        {/* Right Column: Preview & Output */}
        <section className="flex flex-col space-y-4 lg:col-span-7 xl:col-span-8">
           <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Play className="w-4 h-4 text-neutral-400" />
              Template Preview
            </h2>
            {scenes && (
              <button
                onClick={handleExport}
                className="flex items-center gap-2 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-4 py-2 rounded-lg transition-colors border border-neutral-700"
              >
                <Download className="w-4 h-4" />
                Export ZIP
              </button>
            )}
          </div>

          <div className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative">
            {scenes ? (
               <Player
                component={GeneratedComposition}
                inputProps={{ scenes }}
                durationInFrames={totalDurationFrames || 30}
                fps={fps}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                }}
                controls
                autoPlay
                loop
              />
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center text-neutral-600 gap-4">
                <LayoutDashboard className="w-12 h-12 text-neutral-800" />
                <p className="font-medium">Enter a script and generate to preview</p>
              </div>
            )}
          </div>

          {scenes && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                 <div className="bg-neutral-900/50 border border-neutral-800/50 p-4 rounded-xl">
                   <div className="text-xs text-neutral-500 mb-1">Total Scenes</div>
                   <div className="text-xl font-semibold text-neutral-200">{scenes.length}</div>
                 </div>
                 <div className="bg-neutral-900/50 border border-neutral-800/50 p-4 rounded-xl">
                   <div className="text-xs text-neutral-500 mb-1">Duration</div>
                   <div className="text-xl font-semibold text-neutral-200">{(totalDurationFrames / fps).toFixed(1)}s</div>
                 </div>
                 <div className="bg-neutral-900/50 border border-neutral-800/50 p-4 rounded-xl">
                   <div className="text-xs text-neutral-500 mb-1">Resolution</div>
                   <div className="text-xl font-semibold text-neutral-200">1920x1080</div>
                 </div>
                 <div className="bg-neutral-900/50 border border-neutral-800/50 p-4 rounded-xl">
                   <div className="text-xs text-neutral-500 mb-1">FPS</div>
                   <div className="text-xl font-semibold text-neutral-200">{fps}</div>
                 </div>
              </div>

              <div className="mt-8">
                <h3 className="text-md font-medium mb-4">Scene List</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {scenes.map((scene, i) => (
                    <div key={scene.id} className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
                      <div className="w-16 h-9 bg-neutral-800 rounded flex items-center justify-center text-xs text-neutral-500">
                        {scene.type}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Scene {i + 1}</div>
                        <div className="text-xs text-neutral-400 truncate max-w-md">{scene.text}</div>
                      </div>
                      <div className="text-xs text-neutral-500">
                        {((scene.durationFrames) / fps).toFixed(1)}s
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
