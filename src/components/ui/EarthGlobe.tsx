"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const SECONDS_PER_REV = 50; // slow, cinematic — within the 40–60s spec

/* Night-Earth surface: dark blue landmasses/oceans with glowing city lights.
   No atmospheric rim — clean edge, no colored border. */
const surfaceVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const surfaceFragment = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  varying vec2 vUv;
  void main() {
    vec3 terrain = texture2D(dayMap, vUv).rgb;
    // Darken + blue-shift the daytime map into a night surface
    vec3 base = terrain * vec3(0.11, 0.17, 0.28) * 1.2;
    // Warm city lights
    vec3 cities = texture2D(nightMap, vUv).rgb;
    vec3 col = base + cities * 1.55;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [dayMap, nightMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    "/images/earth/earth_day_4k.jpg",
    "/images/earth/earth_night_4k.jpg",
    "/images/earth/earth_clouds_1024.png",
  ]);

  const surfaceMat = useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    nightMap.colorSpace = THREE.SRGBColorSpace;
    [dayMap, nightMap, cloudsMap].forEach((t) => {
      t.anisotropy = 8;
    });
    return new THREE.ShaderMaterial({
      uniforms: {
        dayMap: { value: dayMap },
        nightMap: { value: nightMap },
      },
      vertexShader: surfaceVertex,
      fragmentShader: surfaceFragment,
    });
  }, [dayMap, nightMap, cloudsMap]);

  useFrame((_, delta) => {
    const spin = (delta * Math.PI * 2) / SECONDS_PER_REV;
    if (earthRef.current) earthRef.current.rotation.y += spin;
    if (cloudsRef.current) cloudsRef.current.rotation.y += spin * 1.2;
  });

  return (
    <group rotation={[0.32, 0, 0.12]}>
      {/* Night surface */}
      <mesh ref={earthRef} material={surfaceMat}>
        <sphereGeometry args={[2, 160, 160]} />
      </mesh>

      {/* Faint clouds */}
      <mesh ref={cloudsRef} scale={1.014}>
        <sphereGeometry args={[2, 96, 96]} />
        <meshBasicMaterial
          map={cloudsMap}
          transparent
          opacity={0.14}
          depthWrite={false}
          color={new THREE.Color(0.72, 0.75, 0.82)}
        />
      </mesh>
    </group>
  );
}

export default function EarthGlobe() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.6], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}
