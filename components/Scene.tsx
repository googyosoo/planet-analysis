'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './SolarSystem';
import Sun from './Sun';
import TimePanel from './TimePanel';
import ControlsPanel from './ControlsPanel';
import { Suspense, useRef } from 'react';
import { useStore } from '@/lib/store';

// System Ticker to update global time
function SystemTicker() {
    const { isPaused, speed, date, setDate } = useStore();

    useFrame((state, delta) => {
        if (!isPaused) {
            // 1 sec real time = 'speed' * 1 hour (3600000ms)
            // Adjust this multiplier for realistic feel. 
            // If speed is 1, let's say 1 second passes 6 hours?
            const timeToAdd = delta * speed * 3600000 * 24; // 1 sec = 24 hours at speed 1?
            setDate(date + timeToAdd);
        }
    });
    return null;
}

export default function Scene() {
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Canvas camera={{ position: [0, 40, 60], fov: 45 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[0, 0, 0]} intensity={3} decay={0} color="#fff" />

                    <Stars radius={300} depth={100} count={7000} factor={4} saturation={0} fade speed={0.5} />

                    <Sun />
                    <SolarSystem />
                    <SystemTicker />

                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={10}
                        maxDistance={400}
                    />
                </Suspense>
            </Canvas>

            {/* Overlay UI */}
            <TimePanel />
            <ControlsPanel />

            <div className="absolute bottom-4 left-4 text-white/30 text-xs pointer-events-none z-0">
                Solar System Simulator v0.2
            </div>
        </div>
    );
}
