"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random generator (mulberry32) so geometry creation
// stays pure and safe to run during render/useMemo.
function createRng(seed: number) {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleGlobe() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleGeometry = useMemo(() => {
    const rng = createRng(42);
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const radius = 2.4;
    for (let i = 0; i < count; i++) {
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const r = radius * (0.96 + rng() * 0.06);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const lineGeometry = useMemo(() => {
    const rng = createRng(7);
    const segments = 40;
    const radius = 2.42;
    const positions: number[] = [];
    for (let i = 0; i < segments; i++) {
      const t1 = rng() * Math.PI * 2;
      const p1 = Math.acos(2 * rng() - 1);
      const t2 = t1 + (rng() - 0.5) * 1.2;
      const p2 = p1 + (rng() - 0.5) * 1.2;
      positions.push(
        radius * Math.sin(p1) * Math.cos(t1),
        radius * Math.sin(p1) * Math.sin(t1),
        radius * Math.cos(p1),
        radius * Math.sin(p2) * Math.cos(t2),
        radius * Math.sin(p2) * Math.sin(t2),
        radius * Math.cos(p2)
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.08;
    if (linesRef.current) linesRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={particleGeometry}>
        <pointsMaterial color="#00e5ff" size={0.02} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#ff003c" transparent opacity={0.25} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ParticleGlobe />
      </Canvas>
    </div>
  );
}
