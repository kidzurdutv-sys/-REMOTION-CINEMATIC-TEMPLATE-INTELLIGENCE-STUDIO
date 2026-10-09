import { useState } from 'react';
// import { Player } from '@remotion/player';
// import { GeneratedComposition } from './compositions/GeneratedComposition';

function App() {
  const [script, setScript] = useState('');

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      <header className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
        <h1 className="text-xl font-bold tracking-tight text-white">Remotion Cinematic Studio</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Engine Ready
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Narrative Script</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">Load Sample</button>
          </div>

          <textarea
            className="flex-1 w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Paste your voiceover script here..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />

          <div className="flex justify-between items-center text-xs text-neutral-400">
            <span>{script.split(/\s+/).filter(w => w.length > 0).length} words</span>
            <span>~{Math.ceil(script.split(/\s+/).filter(w => w.length > 0).length / 150)} min</span>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
            Generate Cinematic Template
          </button>
        </section>

        <section className="flex flex-col space-y-4">
           <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Preview</h2>
          </div>

          <div className="aspect-video bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
            <p className="text-neutral-500">Generate a template to preview</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
