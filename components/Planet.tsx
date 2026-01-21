'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Vector3 } from 'three';
import { Text, Html } from '@react-three/drei';
import { PlanetData } from '@/lib/planetData';
import { useStore } from '@/lib/store';

interface PlanetProps {
    data: PlanetData;
}

export default function Planet({ data }: PlanetProps) {
    const groupRef = useRef<Group>(null);
    const planetRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const {
        speed,
        date, setDate,
        objectScale,
        showOrbits,
        showLabels,
        visibility,
        target,
        followTarget
    } = useStore();

    const isVisible = visibility.innerPlanets; // Simplification, should check data.type if we had it
    // But for now let's assume all are inner/outer based on distance?
    // Let's just use a simple check based on name for now or distance
    const isInner = data.distance < 30;
    const shouldRender = isInner ? visibility.innerPlanets : visibility.outerPlanets;

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Time based rotation
        // 1 speed = 1 day per tick? No, let's make it relative.
        // delta is seconds. speed is multiplier.
        const rotationAmount = data.orbitSpeed * speed * delta; // adjust multiplier as needed

        if (!useStore.getState().isPaused) {
            groupRef.current.rotation.y += rotationAmount;

            // Update global date (only one planet needs to do this, ideally the system, but here works for visual)
            // Let's NOT update date here to avoid race conditions. 
            // Date update should be in a central ticker (SolarSystem or Scene).
        }

        // Planet self-rotation
        if (planetRef.current) {
            planetRef.current.rotation.y += data.rotationSpeed * 5 * delta;
        }

        // Camera Following Logic (Local)
        // If this is the target, we can move the camera? 
        // Or update the controls target?
        if (followTarget && target === data.name && planetRef.current) {
            // specific logic to move camera focus
            const worldPos = new Vector3();
            planetRef.current.getWorldPosition(worldPos);
            state.camera.lookAt(worldPos);
            // state.camera.position.lerp(...) // Optional: follow physically
        }
    });

    if (!shouldRender) return null;

    return (
        <group ref={groupRef}>
            {/* Visual Orbit Line */}
            {showOrbits && (
                <mesh rotation-x={Math.PI / 2}>
                    <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 128]} />
                    <meshBasicMaterial color="#444444" side={2} transparent opacity={0.2} />
                </mesh>
            )}

            {/* The Planet Container at Distance */}
            <group position={[data.distance, 0, 0]}>
                <mesh
                    ref={planetRef}
                    scale={[objectScale, objectScale, objectScale]}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={(e) => {
                        e.stopPropagation();
                        useStore.getState().setTarget(data.name);
                    }}
                >
                    <sphereGeometry args={[data.radius, 32, 32]} />
                    <meshStandardMaterial
                        color={data.color}
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>

                {/* Ring for Saturn/Uranus */}
                {data.hasRing && (
                    <mesh
                        rotation-x={Math.PI / 2.5}
                        rotation-y={Math.PI / 6}
                        scale={[objectScale, objectScale, objectScale]}
                    >
                        <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 64]} />
                        <meshStandardMaterial
                            color={data.color}
                            side={2}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                )}

                {/* Label */}
                {showLabels && (
                    <Html position={[0, (data.radius * objectScale) + 1, 0]} center distanceFactor={15} style={{ pointerEvents: 'none', display: (hovered || followTarget) ? 'block' : 'block' }}>
                        <div className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity ${hovered || target === data.name ? 'bg-blue-600/80 text-white font-bold z-10' : 'bg-black/40 text-gray-300'}`}>
                            {data.name}
                        </div>
                    </Html>
                )}
            </group>
        </group>
    );
}
