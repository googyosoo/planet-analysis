'use client';

import { useStore } from '@/lib/store';
import { solarSystemData } from '@/lib/planetData';
import { Eye, EyeOff, Settings, Crosshair } from 'lucide-react';
import { useState } from 'react';

export default function ControlsPanel() {
    const {
        target, setTarget,
        followTarget, toggleFollow,
        objectScale, setObjectScale,
        visibility, toggleVisibility,
        showOrbits, toggleOrbitVisibility,
        showLabels, toggleLabelVisibility
    } = useStore();

    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-4 right-4 bg-gray-900/80 text-white p-2 rounded-lg hover:bg-gray-800 transition backdrop-blur-md border border-gray-700"
            >
                <Settings size={24} />
            </button>
        );
    }

    return (
        <div className="absolute top-4 right-4 w-80 bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700 text-white overflow-hidden shadow-2xl">
            <div className="p-3 bg-gray-800/50 flex justify-between items-center border-b border-gray-700">
                <h2 className="font-semibold flex items-center gap-2">
                    <Settings size={16} /> Data & Controls
                </h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">

                {/* Object Scale */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Object Size Scale</span>
                        <span className="text-blue-400 font-mono">{objectScale}x</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        step="1"
                        value={objectScale}
                        onChange={(e) => setObjectScale(Number(e.target.value))}
                        className="w-full accent-blue-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Visibility Toggles */}
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Visibility</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => toggleVisibility('innerPlanets')}
                            className={`text-xs p-2 rounded border ${visibility.innerPlanets ? 'bg-blue-600/30 border-blue-500 text-blue-100' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                        >
                            Inner Planets
                        </button>
                        <button
                            onClick={() => toggleVisibility('outerPlanets')}
                            className={`text-xs p-2 rounded border ${visibility.outerPlanets ? 'bg-blue-600/30 border-blue-500 text-blue-100' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                        >
                            Outer Planets
                        </button>
                        <button
                            onClick={() => toggleOrbitVisibility()}
                            className={`text-xs p-2 rounded border ${showOrbits ? 'bg-blue-600/30 border-blue-500 text-blue-100' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                        >
                            Orbits
                        </button>
                        <button
                            onClick={() => toggleLabelVisibility()}
                            className={`text-xs p-2 rounded border ${showLabels ? 'bg-blue-600/30 border-blue-500 text-blue-100' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                        >
                            Labels
                        </button>
                    </div>
                </div>

                {/* Camera Control */}
                <div className="space-y-3 pt-2 border-t border-gray-700">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Camera</h3>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300 block">Focus Target</label>
                        <select
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="Sun">Sun (System Center)</option>
                            {solarSystemData.map(p => (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={toggleFollow}
                        className={`w-full flex items-center justify-center gap-2 p-2 rounded text-sm transition-colors ${followTarget ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        <Crosshair size={16} />
                        {followTarget ? 'Tracking Target' : 'Follow Target'}
                    </button>
                </div>

            </div>
        </div>
    );
}
