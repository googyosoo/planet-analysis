'use client';

import { useStore } from '@/lib/store';
import { Play, Pause, FastForward, Rewind, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TimePanel() {
    const { date, isPaused, togglePause, speed, setSpeed } = useStore();
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        // Format date string for hydration (avoid server mismatch)
        const d = new Date(date);
        setFormattedDate(d.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }));
    }, [date]);

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700 text-white shadow-2xl px-6 py-4 flex flex-col items-center gap-3 min-w-[320px]">

            {/* Date Display */}
            <div className="flex items-center gap-2 text-blue-200">
                <Clock size={16} className="text-blue-400" />
                <span className="font-mono text-lg font-bold tracking-widest">
                    {formattedDate || 'Loading...'}
                </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full">
                <button
                    onClick={togglePause}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-lg shadow-blue-900/50"
                >
                    {isPaused ? <Play fill="white" size={20} /> : <Pause fill="white" size={20} />}
                </button>

                <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
                        <span>Speed</span>
                        <span>{speed}x</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full accent-blue-500 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="text-[10px] text-gray-500">
                1 Sec = {Math.round(speed * 24)} Hours (Simulated)
            </div>

        </div>
    );
}
