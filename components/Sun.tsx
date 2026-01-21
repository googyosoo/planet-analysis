'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export default function Sun() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2.5, 32, 32]} />
            <meshStandardMaterial
                emissive="#FFD700"
                emissiveIntensity={1}
                color="#FDB813"
                roughness={0.4}
            />
            <pointLight intensity={1.5} distance={100} decay={0} color="#FFFAED" />
        </mesh>
    );
}
