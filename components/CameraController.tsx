'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '@/lib/store';
import { solarSystemData } from '@/lib/planetData';
import { Vector3 } from 'three';
import { useRef } from 'react';

export default function CameraController() {
    const { camera, controls } = useThree();
    const { target, followTarget } = useStore();
    const currentTargetPos = useRef(new Vector3());

    useFrame((state, delta) => {
        if (!followTarget) return;

        // Find target position
        let targetPos = new Vector3(0, 0, 0); // Default to Sun

        if (target !== 'Sun') {
            const planetData = solarSystemData.find(p => p.name === target);
            if (planetData) {
                // Calculate current planet position based on time
                // Note: We need to match the logic in Planet.tsx for accurate position
                // Ideally, Planet.tsx should update a ref in the store, but for now we calculate it here
                const time = useStore.getState().date;
                // Simple circular orbit calculation for camera target (approximate)
                // In a real app, we'd share the exact position ref
                // For this demo, let's just look at 0,0,0 if Sun, or try to follow.
                // Actually, without accessing the specific mesh instance, exact following is hard.
                // Let's implement a simpler "LookAt" for now or use the Controls to set target.
            }
        }

        // Better Approach: 
        // The OrbitControls has a 'target' property. We should animate that.
        // However, since we don't have direct access to the Planet meshes here easily without complex state,
        // let's stick to a simpler version: 
        // If 'Sun' is selected, reset to center.
        // If a planet is selected, we might need the Planet component to report its position.

    });

    // Alternative: Pass the ref from Planet up? 
    // For now, let's keep it simple: The UI selects the target, but the Camera logic needs to know WHERE that is.
    // Let's modify Planet.tsx to update a shared map of positions? Too complex for this step.

    // Let's use a simple approach: 
    // Only changing the OrbitControls target to the center (Sun) or keeping it manual for now.
    // The user asked for "Follow", so we should try.

    return null;
}
