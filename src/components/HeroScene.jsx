import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingKnot = ({ mouseRef }) => {
    const meshRef = useRef(null);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Map cursor [-0.5, 0.5] → rotation angles
        const targetX = mouseRef.current.ny * Math.PI * 0.5;  // tilt up/down
        const targetY = mouseRef.current.nx * Math.PI * 0.7;  // spin left/right

        // Smooth lerp towards cursor-driven rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            targetX,
            delta * 3
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            targetY + state.clock.elapsedTime * 0.18, // base slow spin + cursor
            delta * 3
        );

        // Subtle float — Y only, no XY drift
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.09;
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[0.78, 0.24, 300, 64, 2, 3]} />
            <MeshDistortMaterial
                color="#C5A059"
                metalness={0.92}
                roughness={0.06}
                distort={0.05}
                speed={1.2}
                envMapIntensity={3.5}
            />
        </mesh>
    );
};

const HeroScene = () => {
    const mouseRef = useRef({ nx: 0, ny: 0 });

    useEffect(() => {
        const onMove = (e) => {
            mouseRef.current.nx = (e.clientX / window.innerWidth) - 0.5;
            mouseRef.current.ny = (e.clientY / window.innerHeight) - 0.5;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div className="w-full h-full" style={{ pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.35} />
                <directionalLight position={[6, 6, 4]} intensity={1.5} color="#fffaf4" />
                <pointLight position={[-3, -2, 3]} intensity={2.5} color="#C5A059" distance={12} decay={2} />
                <pointLight position={[4, 4, -3]} intensity={0.8} color="#e8d9b8" distance={10} decay={2} />
                <Environment preset="city" />
                <FloatingKnot mouseRef={mouseRef} />
            </Canvas>
        </div>
    );
};

export default HeroScene;
